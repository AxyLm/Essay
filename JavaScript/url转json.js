/**
 * @param {string} url
 * @return {object} json
 */
function urlToJson(url) {
    if( url.indexOf("?") > -1 ){
        var queryUrl = url.split("?")[1]
        var queryData = new Object
        for (var i = 0; i < queryUrl.split("&").length; i++) {
            try {
                var item = queryUrl.split("&")[i]
                queryData[ item.split("=")[0] ] = decodeURI(item.split("=")[1])
            } catch (error) {
                break;
            }
        }
        return queryData
    }else{
        return {}
    }
}