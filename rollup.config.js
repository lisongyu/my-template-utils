  // rollup.config.js
  const path = require('path');
  const pluginsCommon = require('./pluginsCommon')
  const inputPath = path.resolve(__dirname, './src/main.ts');
  const outputUmdPath = path.resolve(__dirname, './dist/utils.min.js')
  export default [ {
  input: [inputPath],
    output: [
        {
            file: outputUmdPath,
            name: 'utils',
            format: 'umd'
        }
    ],
    plugins: pluginsCommon
}];
