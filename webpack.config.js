const path = require('path');  //path モジュールの読み込み

module.exports = {
  entry: './src/index.js',
	output: {  // output プロパティ
    path: path.resolve(__dirname, 'dist'), //出力ファイルのディレクトリの絶対パス
    filename: '[name].js',  //ファイル名.bundle.js
  },
  devServer: {
    //ルートディレクトリの指定
    contentBase: path.join(__dirname, 'dist/html'),
    open: true,
    // ルートディレクトリのファイルを監視
    watchContentBase: true
  },
  mode: 'development',
  // watch: true
  watchOptions: {
    ignored: /node_modules/  //正規表現で指定（node_modules を除外 ）
  },
  devtool: 'source-map', //source-map タイプのソースマップを出力,
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
    }
  },
  // ローダーの設定
  module: {
    rules: [
      {
        // ESLint のローダー
        test: /\.js$/,
        //babel-loader で変換する前にコード検証する
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              //自動修正をする場合は以下のコメントを外す
              //fix: true,
            },
          },
        ],
      },
      {
        // ローダーの処理対象ファイル（拡張子 .js のファイルを対象）
        test: /\.js$/,
        // ローダーの処理対象から外すディレクトリ
        exclude: /node_modules/,
        // 処理対象のファイルに対する処理を指定
        use: [
          {
            // 利用するローダーを指定
            loader: 'babel-loader',
            // ローダー（babel-loader）のオプションを指定
            options: {
              // プリセットを指定
              presets: [
                // targets を指定していないので、一律に ES5 の構文に変換
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  },
  mode: 'development', // 追加
  devtool: 'source-map' // 追加
};