export default {
    NODE_ENV: "production",
    Cors: {
        "origin": [/\.soulfree\.cn$/],
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    },
    SERVER:{
        PORT:8033
    },
    KODBOX: {
        URL:"http://cloud.soulfree.cn"
    }
}