// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Intern extends Employee {

    constructor(name, email, school){
        super(name, email, id)
        this.school = school
    }

    getGithub() {
        return this.school
    }

    getRole() {
        return "Intern"
    }

}

module.exports = Intern