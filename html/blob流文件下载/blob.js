function blobDownload(data, filename) {
    var fileName = filename || (new Date()).getTime()
    var blob = new Blob([data])
    // ie 10+
    var navigator = window.navigator
    var userAgent = window.navigator.userAgent
    if (navigator.msSaveBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName)
        return
    }


    var link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)

    link.download = fileName
    if (userAgent.indexOf('Firefox') >= 0) {
        // Firefox 45+
        document.body.appendChild(link)
        link.style.display = 'none'
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
    } else {
        link.click()
    }
}
