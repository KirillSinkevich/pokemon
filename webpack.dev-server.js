import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'
import webpackConfig from './webpack.config'
import { port, host } from './config/main'
const options = { contentBase: './dist', hot: true, host: 'localhost',
    proxy: {
      path: '/us/api/',
        target: 'https://www.pokemon.com',
        changeOrigin: true,
        logLevel: 'debug'
    }}
webpackDevServer.addDevServerEntrypoints(webpackConfig, options)
const compiler = webpack(webpackConfig)
const server = new webpackDevServer(compiler, options)
server.listen(port, host, () => console.log(`webpack dev server listening on ${host}:${port}`))