import { parse } from 'acorn';
import { doc } from 'prettier';
const { join, line, hardline, softline, ifBreak, indent, group } = doc.builders;
export const languages = [
    {
        extensions: ['.ts'],
        name: 'TypeScript',
        parsers: ['ts-parser']
    }
];
export const parsers = {
    'ts-parser': {
        parse: (text) => {
            return parse(text, { ecmaVersion: 2020, sourceType: 'module' });
        },
        astFormat: 'ts-ast'
    }
};
function printTS(path, options, print) {
    const node = path.node;
    if (node.type === 'Program') {
        return path.call(print, 'body');
    }
    if (Array.isArray(node)) {
        return path.map(print);
    }
    if (node.type == 'ArrowFunctionExpression') {
        return printPointFree(path, options, print);
    }
    if (node.type == 'ExpressionStatement') {
        return path.call(print, 'expression');
    }
    // methodの関数呼び出し式の部分のみ実装
    if (node.type === 'CallExpression') {
        console.log(path.call(print, 'callee'));
        return `${path.call(print, 'callee')}(${path.call(print, 'arguments')})`;
    }
    if (node.type === 'MemberExpression') {
        return `${path.call(print, 'object')}.${path.call(print, 'property')}`;
    }
    if (node.expression) {
        return path.call(print, 'expression');
    }
    if (node) {
        return options.originalText.slice(node.start, node.end);
    }
}
function printPointFree(path, options, print) {
    const node = path.node;
    const params = node.params.map((param) => {
        return param.name;
    });
    const args = node.body.arguments.map((arg) => {
        return arg?.name;
    });
    if (params.length !== args.length) {
        return options.originalText.slice(node.start, node.end);
    }
    else {
        if (params.reduce((acc, param, index) => {
            return acc && param === args[index];
        }, true)) {
            // point free
            return node.body.callee.name;
        }
    }
}
export const printers = {
    'ts-ast': {
        print: printTS
    }
};
//# sourceMappingURL=index.js.map