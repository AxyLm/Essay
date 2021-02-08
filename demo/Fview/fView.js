// var initDom = document.querySelectorAll("#fileView > li");
// domEvent(initDom, "click", function (e) {
//     let flag = this.className.indexOf('fv_select')
//     this.classList.toggle("fv_select", flag); // change style to select
// })

// domEvent(document, "", function (e) {

// })

// function domEvent(dom, event, callback) {
//     console.log(dom, typeof dom)
//     if (typeof dom == "object") {
//         for (let index = 0; index < dom.length; index++) {
//             const element = dom[index];
//             element.addEventListener(event, callback)
//         }
//     } else {
//         dom.addEventListener(event, callback)
//     }
// }

function Fview(dom) {
    this.initDom = document.querySelector(dom);
    this.option = null
    this.initIemplate = `
    <li class="fv_item">1</li>
    <li class="fv_item">2</li>
    <li class="fv_item">3</li>
    <li class="fv_item">4</li>
    <li class="fv_item">5</li>
    <li class="fv_item">6</li>
    <li class="fv_item">7</li>
    <li class="fv_item">8</li>
    <li class="fv_item">9</li>
    <li class="fv_item">10</li>`
    // this.div = document.createElement("div");
}
Fview.prototype = {
    init: function (opt) {
        const option = opt;

        if (option.mode = 0) {
            
        } else {
            // this.initDom = document.createElement("ul")
            this.initDom.innerHtml = (this.initIemplate)
        }
        new dragView("selectView")
    },
    createMoveView() {
        
    },
    changeMode(mode) {

    },
    bindEvent: function (dom, event, callback) {
        console.log(dom, typeof dom)
        if (typeof dom == "object") {
            for (let index = 0; index < dom.length; index++) {
                const element = dom[index];
                element.addEventListener(event, callback)
            }
        } else {
            dom.addEventListener(event, callback)
        }

    },
    uploadOption: function () {

    }
}



function dragView(className) {
    this.selectView = null
    this.event = null
    this.className = className
    document.addEventListener("mousedown",function (e) {
        this.selectView = document.createElement("div")
        this.selectView.className = this.className
        this.selectView.style.top = e.offsetY + "px"
        this.selectView.style.left = e.offsetX + "px"
        document.body.appendChild(this.selectView)
        this.event = e
        document.addEventListener("mousemove", this.move.bind(this))
        document.addEventListener("mouseup", this.mUp.bind(this))
    }.bind(this))
    this.move = function (e) {
        let width = e.pageX - this.event.offsetX
        let height = e.pageY - this.event.offsetY
        if (width > 0) {
            this.selectView.style.width = width + "px"
            this.selectView.style.left = this.event.offsetX+ "px"
        } else {
            this.selectView.style.left = e.pageX + "px"
            this.selectView.style.width = Math.abs(width)  + "px"
        }
        if (height > 0) {
            this.selectView.style.height = height + "px"
            this.selectView.style.top = this.event.offsetY+ "px"
        } else {
            this.selectView.style.top = e.pageY + "px"
            this.selectView.style.height = Math.abs(height)  + "px"
        }
    }
    this.mUp = function () {
       this.destroyed()
    }
    this.destroyed = function () {
        this.selectView.remove()
        document.removeEventListener("mousemove", move)
        setTimeout( () => {
            document.removeEventListener("mouseup",this.mUp)
        },1)
    }
}
// {
//     init: function () {
//         document.addEventListener("mousedown", this.down)
//     },
//     mUp:function(e) {
//         selectView.remove()
//         document.removeEventListener("mousemove",this.move)
//         let removeTimeout = setTimeout(function () {
//             document.removeEventListener("mouseup",this.mUp)
//             clearTimeout(removeTimeout)
//         },1)
//     },
//     move: function (e) {
//         console.log(e)
//         let width = e.pageX - this.event.offsetX
//         let height = e.pageY - this.event.offsetY
//         if (width > 0) {
//             selectView.style.width = width + "px"
//             selectView.style.left = this.event.offsetX+ "px"
//         } else {
//             selectView.style.left = e.pageX + "px"
//             selectView.style.width = Math.abs(width)  + "px"
//         }
//         if (height > 0) {
//             selectView.style.height = height + "px"
//             selectView.style.top = this.event.offsetY+ "px"
//         } else {
//             selectView.style.top = e.pageY + "px"
//             selectView.style.height = Math.abs(height)  + "px"
//         }
//     },
//     down: function (e) {
//         this.selectView = document.createElement("div")
//         this.selectView.className = this.className
//         this.selectView.style.top = e.offsetY + "px"
//         this.selectView.style.left = e.offsetX + "px"
//         document.body.appendChild(this.selectView)
//         this.event = e
//         console.log(this.move,1)
//         document.addEventListener("mousemove", )
//         document.addEventListener("mouseup", mUp)
//     },
// }