var username = "Hello ";
var Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
    }
    return Student;
}());
function greeter(str) {
    return username + str.firstName + str.lastName;
}
;
var str = new Student("jack", "user"); //{ firstName: "1", lastName: "2" }
document.body.innerHTML = greeter(str);
