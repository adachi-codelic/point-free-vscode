import { parse } from 'acorn'
// import parser from '@typescript-eslint/parser'
import * as ts from 'typescript'

export const languages = [
  {
    extensions: ['.ts'],
    name: 'TypeScript',
    parsers: ['ts-parser']
  }
]

export const parsers = {
  'ts-parser': {
    parse: (text) => parse(text, { ecmaVersion: 2020 }),
    // parse: (text) => parser.parse(text),
    astFormat: 'ts-ast'
  }
}

function printTS(path, options, print) {
  const node = path.getValue()
  // console.log(node.body[0].expression.callee)
  console.log(node)
  console.log(ts.isCallExpression(node.body[0].expression))
  // if (Array.isArray(node)) {
  //   return path.map(print)
  // }

  // switch (node.type) {
  //   default:
  //     return ''
  // }
  return path.map(print)
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
