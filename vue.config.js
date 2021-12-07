const localTarget = 'http://192.168.2.215:8080';

module.exports = {
    devServer: {
        host: '',
        port: 8080,
        open: true,
        hotOnly: false,

        proxy: {
            '/api': {
                target: localTarget,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/',
                }
            }
        }
        
    }
}