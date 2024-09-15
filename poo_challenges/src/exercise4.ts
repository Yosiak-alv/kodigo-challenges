class Account {
    public name: string;
    public balance: number;
    public accountType: string;
    public accountNumber: string;
  
    constructor(name: string, balance: number, accountType: string, accountNumber: string) {
        this.name = name;
        this.balance = balance;
        this.accountType = accountType;
        this.accountNumber = accountNumber;
    }
  
    public deposit(amount: number): void {
        if (amount < 5.00) {
            console.log("The deposit amount must be greater than $5.00");
        } else {
            this.balance += amount;
            console.log(`Successfully deposited: $${amount.toFixed(2)}. New balance: $${this.balance.toFixed(2)}`);
        }
    }
  
    public withdraw(amount: number): void {
        if (amount < 5.00) {
            console.log("The withdrawal amount must be greater than $5.00");
        } else if (amount > this.balance) {
            console.log("The withdrawal amount exceeds the available balance.");
        } else {
            this.balance -= amount;
            console.log(`Successfully withdrew: $${amount.toFixed(2)}. Remaining balance: $${this.balance.toFixed(2)}`);
        }
    }
  
    public displayAccountDetails(): void {
        console.log(`Account Holder: ${this.name}`);
        console.log(`Account Type: ${this.accountType}`);
        console.log(`Account Number: ${this.accountNumber}`);
    }
}
  
const myAccount = new Account("Josias", 100.00, "Ahorro", "1234567890");

myAccount.displayAccountDetails();
myAccount.deposit(1);
myAccount.deposit(50);      
myAccount.withdraw(30);
myAccount.withdraw(1);
  