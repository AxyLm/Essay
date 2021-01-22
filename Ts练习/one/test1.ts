

let username = "Hello ";

class Student { //类
    fullName: string;
    constructor(public firstName: string, public lastName: string) {
        this.fullName = firstName + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(str: Person) {
    return username + str.firstName + str.lastName
};

let str = new Student("jack", "user")//{ firstName: "1", lastName: "2" }

let flag: boolean = true
let array: number[] = [1, 2, 3, 4, 5]
let list: Array<number> = [1, 2, 3, 4, 5]
let string: string = "string"
let x: [string, number];

document.body.innerHTML = greeter(str)