import prettier from 'prettier'
const format = (code) => {
  const res = prettier.format(code, {
    parser: 'ts-parser',
    plugins: ['./src/index.js']
  })
  return res
}
console.log(await format("['1', '2'].map(parseInt);"))
