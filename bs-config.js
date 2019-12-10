var proxy = require('http-proxy-middleware');

// var argv = process.argv[2];

// var target = argv == '212' ? 'http://192.168.100.212:8050/' : 'http://192.168.100.213:8050/';

// http://192.168.100.130:8080/jasframework-demo

var apiProxy = proxy(function (pathname, req) {
    if (pathname.match('^/jasproxy/jasmvvm')) return false;
    return pathname.match('^/jasproxy');
}, {
    target: 'http://192.168.100.45:8081/',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        // '^/jasproxy': '/jasframework-platform',
        '^/jasproxy': '/jasframework-demo',
    }
});

var apiProxyToRisk = proxy(function (pathname, req) {
    if (pathname.match('^/jasproxy/jasmvvm')) return false;
    return pathname.match('^/jasproxy');
}, {
    target: 'http://192.168.100.45:38080/',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/jasproxy': '/risk',
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
var iframeProxy2 = proxy(function (pathname, req) {
    return pathname.match('^/jasframework/jasframework');
}, {
    target: 'http://localhost:3030/',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/jasframework/jasframework': '/jasframework',
    }
});
var iframeProxy3 = proxy(function (pathname, req) {
    return pathname.match('^/jasframework/jasmvvm');
}, {
    target: 'http://localhost:3030/',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/jasframework/jasmvvm': '/jasmvvm',
    }
});
var iframeProxy4 = proxy(function (pathname, req) {
    return pathname.match('^/jasframework/jasdoc');
}, {
    target: 'http://localhost:3030/',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/jasframework/jasdoc': '/jasdoc',
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
            // apiProxyToRisk,
            iframeProxy2,
            iframeProxy3,
            iframeProxy4,
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