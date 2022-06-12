

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev; 


module.exports = {
   devtool: isDev ? 'source-map' : '',
   entry: {
      filename: './app.js',
   },
   output: {
      filename: 'bundle.js',
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
               }
            }
         }
      ]
   }
};