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
      // const filename = "_.ts";
      // const code = text;

      // const sourceFile = ts.createSourceFile(
      //     filename, code, {languageVersion: ts.ScriptTarget.Latest}
      // );

      // const defaultCompilerHost = ts.createCompilerHost({});

      // const customCompilerHost = {
      //     getSourceFile: (name, languageVersion) => {
      //         console.log(`getSourceFile ${name}`);

      //         if (name === filename) {
      //             return sourceFile;
      //         } else {
      //             return defaultCompilerHost.getSourceFile(
      //                 name, languageVersion
      //             );
      //         }
      //     },
      //     writeFile: (filename, data) => {},
      //     getDefaultLibFileName: () => "lib.d.ts",
      //     useCaseSensitiveFileNames: () => false,
      //     getCanonicalFileName: filename => filename,
      //     getCurrentDirectory: () => "",
      //     getNewLine: () => "\n",
      //     getDirectories: () => [],
      //     fileExists: () => true,
      //     readFile: () => ""
      // };

      // const program = ts.createProgram(
      //     ["_.ts"], {}, customCompilerHost
      // );

      // const sourceCode = text;
      // const sourceFile = ts.createSourceFile("_.ts", sourceCode);


      // checker = ts.createProgram('_.ts').getTypeChecker();
      
      
      return ts.createSourceFile('_.ts', text, ts.ScriptTarget.ESNext, true);
      // // const program = ts.createProgram('_.ts')
      // // const program = ts.createProgram(file, options, compilerHost);
      // // const sourceFile = program.getSourceFile('_.ts')
      // return sourceFile
      // return parse(text, { ecmaVersion: 2020, sourceType: 'module' })
    },
    astFormat: 'ts-ast'
  }
}

export async function importLibFiles() {
  return await import("../libFiles/typescript/index");
}

const input = {fileName: "_.ts", text: "const test: number = 1 + 2;"}

function createSourceFile(filename, code) {
  return ts.createSourceFile(
    filename, code, {languageVersion: ts.ScriptTarget.Latest}
  );

}

const defaultCompilerHost = ts.createCompilerHost({
  getDefaultLibFileName: () => "libFiles/typescript/lib.d.ts",
});

// const compilerHost = {
//   getSourceFile: (name, languageVersion) => {
//     // console.log(`getSourceFile ${name}`);

//     if (name) {
//         return sourceFile;
//     } else {
//         return defaultCompilerHost.getSourceFile(
//             name, languageVersion
//         );
//     }
//   },
//   writeFile: (filename, data) => {},
//   getDefaultLibFileName: () => "libFiles/typescript/lib.d.ts",
//   useCaseSensitiveFileNames: () => false,
//   getCanonicalFileName: filename => filename,
//   getCurrentDirectory: () => "",
//   getNewLine: () => "\n",
//   getDirectories: () => [],
//   fileExists: () => true,
//   readFile: () => ""
// };


const options = { strict: true, target: ts.ScriptTarget.ESNext, allowJs: true, module: ts.ScriptKind.TS, allowArbitraryExtensions: true };
const libs = await importLibFiles()
function getLibSourceFiles(libFiles) {
  return Object.keys(libFiles)
    .map(key => libFiles[key])
    .map(lib => ({fileName: lib.fileName, text: lib.text}))
}

const program = ts.createProgram(
    [...getLibSourceFiles(libs)].map(x => x.fileName), options, defaultCompilerHost
);
console.log(ts.getPreEmitDiagnostics(program))
// console.log(program.getTypeChecker().getTypeAtLocation(sourceFile.statements[0]))

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
  return ""
  const node = path.getValue()
  const arrowFunction = searchArrowFunction(node)
  // console.log(arrowFunction)
  return node.text
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
