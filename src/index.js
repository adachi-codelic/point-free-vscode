import ts from 'typescript'
import { parse } from 'acorn'
export const languages = [
  {
    extensions: ['.ts'],
    name: 'TypeScript',
    parsers: ['ts-parser']
  }
]

export const parsers = {
  'ts-parser': {
    parse: (text) => {
      return parse(text, { ecmaVersion: 2020, sourceType: 'module' })
    },
    astFormat: 'ts-ast'
  }
}

function searchArrowFunction(node) {
  if (ts.isArrowFunction(node)) {
    // obtain type information of note(this is arrow functioin) from checker
    const type = checker.getTypeAtLocation(node)
    // console.log(type)
  }
  if (node.kind === ts.SyntaxKind.ArrowFunction) {
    return node
  } else {
    return ts.forEachChild(node, searchArrowFunction)
  }
}

function printTS(path, options, print) {
  const node = path.getValue()
  // console.log(node)
  if (node.type === 'Program') {
    return path.call(print, 'body')
  }
  if (Array.isArray(node)) {
    console.log('array mode')
    return path.map(print)
  }
  if (node.type == 'ExpressionStatement') {
    return path.call(print, 'expression')
  }

  if (node.type == 'ArrowFunctionExpression') {
    console.log('arrow', node)
    return path.call(print, 'expression')
  }
  if (node.expression) {
    console.log('expr', node)
    return path.call(print, 'expression')
  }
  if (node) {
    return ''
  }
}

export const printers = {
  'ts-ast': {
    print: printTS
  }
}

// module.exports = {
//   languages,
//   parsers,
//   printers
// }
