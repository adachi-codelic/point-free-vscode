import { parse } from 'acorn'
import { AstPath, Doc, doc } from 'prettier'

export const languages = [
  {
    extensions: ['.ts'],
    name: 'TypeScript',
    parsers: ['ts-parser']
  }
]

export const parsers = {
  'ts-parser': {
    parse: (text: string) => {
      return parse(text, { ecmaVersion: 2020, sourceType: 'module' })
    },
    astFormat: 'ts-ast'
  }
}

function printTS(
  path: AstPath,
  options: Record<string, any>,
  print: (path: AstPath) => Doc
) {
  const node = path.node
  if (node.type === 'Program') {
    return path.call(print, 'body')
  }
  if (Array.isArray(node)) {
    return path.map(print)
  }

  if (node.type == 'ArrowFunctionExpression') {
    return path.call(printPointFree(options))
  }
  // アロー関数式でpoint-free-styleを適用する実装
  if (node.type == 'ExpressionStatement') {
    return path.call(print, 'expression')
  }
  // methodの関数呼び出し式の部分でpoint-free-styleを適用する実装
  // (calleeの式).(メソッド呼び出し式)の両方の式にapply
  if (node.type === 'CallExpression') {
    return `${path.call(print, 'callee')}(${path.call(print, 'arguments')})`
  }
  if (node.type === 'MemberExpression') {
    return `${path.call(print, 'object')}.${path.call(print, 'property')}`
  }
  if (node.expression) {
    return path.call(print, 'expression')
  }
  if (node) {
    return options.originalText.slice(node.start, node.end)
  }
}

function printPointFree(options: Record<string, any>): (path: AstPath) => Doc {
  return (path: AstPath) => {
    const node = path.node
    const params = node.params.map((param) => {
      return param.name
    })
    // 関数のbodyが関数呼び出し式でないときは、point-freeは関係ない
    if (node.body.type !== 'CallExpression') {
      return options.originalText.slice(node.start, node.end)
    }
    // 以降、bodyが関数呼び出し式である
    const args = node.body.arguments.map((arg) => {
      return arg?.name
    })

    if (params.length !== args.length) {
      return options.originalText.slice(node.start, node.end)
    } else {
      if (
        params.reduce((acc, param, index) => {
          return acc && param === args[index]
        }, true)
      ) {
        // point free
        return node.body.callee.name
      } else {
        return options.originalText.slice(node.start, node.end)
      }
    }
  }
}

export const printers = {
  'ts-ast': {
    print: printTS
  }
}
