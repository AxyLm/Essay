class Player{
    #cats = 0
    constructor(num=100){
        this.dog = 0
        this.cat = 0
        this.fox = 0
        this.AllNum = num
    }
    pay(num = 0){
        this.AllNum = this.AllNum - num
        console.log(this.AllNum)
    }
    play(){
        console.log('play')
    }
    buyDog(){
        this.dog++
        this.pay(1)
    }
    buyCat(){
        this.cat++
        this.pay(1)

    }
    buyFox(){
        this.fox++
        this.pay(1)
    }
    print(){
        console.log(this,this.dog,this.#cats)

    }
}