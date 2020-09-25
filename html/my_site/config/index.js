'use strict'
const path = require('path')

module.exports = {
    port: '8080',
    pages:[
        {
            path:'index.html',
            chunk:'index',
            title:'首页'
        },
        {
            path:'src/about.html',
            chunk:'about',
            title:'关于'
        },
        {
            path:'src/me.html',
            chunk:'me',
            title:'我的'
        },
    ]
}