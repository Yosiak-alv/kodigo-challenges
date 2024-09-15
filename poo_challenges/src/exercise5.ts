abstract class Person {
    public name: string;
    public lastName: string;
    public address: string;
    public phone: string;
    public age: number;
    
    constructor(name: string, lastName: string, address: string, phone: string, age: number) {
        this.name = name;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.age = age;
    }
  
    public isAdult(): void {
        if (this.age >= 18) {
            console.log(`${this.name} is an adult.`);
        } else {
            console.log(`${this.name} is not an adult.`);
        }
    }

    abstract displayPersonalDetails(): void;
}

class Employee extends Person {
    public salary: number;

    constructor(name: string, lastName: string, address: string, phone: string, age: number, salary: number) {
        super(name, lastName, address, phone, age);
        this.salary = salary;
    }

    public loadSalary(amount: number): void {
        this.salary = amount;
    }

  
    public printSalary(): void {
        console.log(`Salary: $${this.salary.toFixed(2)}`);
    }

    public displayPersonalDetails(): void {
        console.log(`Name: ${this.name} ${this.lastName}`);
        console.log(`Address: ${this.address}`);
        console.log(`Phone: ${this.phone}`);
        console.log(`Age: ${this.age}`);
    }
}

const employee = new Employee("Josias", "Alvarenga", "AV L-C 36B", "1234567890", 22, 50000);

employee.displayPersonalDetails();
employee.isAdult();
employee.printSalary();
  