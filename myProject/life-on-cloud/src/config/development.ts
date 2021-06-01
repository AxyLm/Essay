export default {
    NODE_ENV: "development",
    Cors: {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    },
    SERVER:{
        PORT:8033
    },
    KODBOX: {
        URL:"http://cloud.soulfree.cn"
    },
    MONGODB: {
        CONNECT:"mongodb://localhost:27017/lifeOnClouds"
    }
}