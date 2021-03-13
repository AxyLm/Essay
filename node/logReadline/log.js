const log4js = require('log4js');
const path = require('path');

const config = {
    "appenders": {
        "console": {
            "type":"console",
            "category":"console"
        },
        "dataFile":{
            "type": "dateFile",
            "filename": "./logs/spiderLog",
            "pattern":"-yyyy-MM-dd-hh-mm-ss.log",
        }
    },
    "categories": {
        "default": {
            "appenders": [
                "dataFile"
            ],
            "level": "debug"
        }
    }
}

log4js.configure(config);

module.exports = log4js.getLogger()

