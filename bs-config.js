var proxy = require('http-proxy-middleware');

// var argv = process.argv[2];

// var target = argv == '212' ? 'http://192.168.100.212:8050/' : 'http://192.168.100.213:8050/';

// http://192.168.100.130:8080/jasframework-demo

var apiProxy = proxy(function (pathname, req) {
    if (pathname.match('^/jasproxy/jasmvvm')) return false;
    return pathname.match('^/jasproxy');
}, {
    target: 'http://192.168.100.130:8888/',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/jasproxy': '/jasframework-platform',
    }
});
var iframeProxy = proxy(function (pathname, req) {
    return pathname.match('^/jasproxy/jasmvvm');
}, {
    target: 'http://localhost:3030/',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/jasproxy/jasmvvm': '/jasmvvm',
    }
});

module.exports = {
    port: 3030,
    startPath: "/jasmvvm/pages/page-login/login.html",
    server: {
        baseDir: "./",
        // index: "index.html",
        middleware: [
            apiProxy,
            iframeProxy
        ]
    },
    ghostMode: {
        clicks: false,
        forms: false,
        scroll: false
    },
    codeSync: true,
    // proxy: {
    //     target: "localhost:3030",
    //     // middleware: iframeProxy
    // }
}