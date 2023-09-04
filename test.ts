import * as prettier from 'prettier'
const format = (code: any) => {
  const res = prettier.format(code, {
    parser: 'ts-parser',
    plugins: ['./src/index.js'],
  })
  return res
}
console.log(await format(`(x) => parseInt(x);`))
