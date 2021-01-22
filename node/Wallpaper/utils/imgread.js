const fs = require("fs")
const dirs = "C:/Users/thelm/AppData/Local/Packages/Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy/LocalState/Assets"
const outDir = "C:/Users/thelm/Pictures"
var list = fs.readdirSync(dirs)


function outFile(list, index) {
    let file = fs.readFileSync(dirs + "/" + list[index])
    fs.writeFile(outDir + "/" + list[index] + ".jpg", file, (err) => {
        if (err) {
            console.log(err)
        } else if (list[index + 1]) {
            outFile(list, index + 1)
        } else {
            console.log("The end")
        }
    });

}
function outImg() {
    outFile(list, 0)
}
