const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,'dist'), // 打包文件的输出路径
        filename:'bundle.js'// 打包文件名
    },
    module:{
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react','stage-0'],
                        }
                    },
                ]
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(eot|svg|ttf|woff)\??.*$/, // 匹配一次 问号及后面内容
                use:[
                    {
                        loader:"url-loader",
                        options: {
                            limit:10000
                        }
                    }
                ]
            }

        ]
    },
    resolve:{
        extensions:['.js',".jsx"]
    },
    plugins:[  //要让webpack知道这就是我们的html入口文件  插件自动将bundle文件引入html入口中
        new HtmlWebpackPlugin({
            template:"./public/index.html",//指定模板路径
            filename:"index.html",//指定文件名

        })
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port:4000,
        host:"0.0.0.0",
        inline:true
    },


};