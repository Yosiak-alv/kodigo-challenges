class Calculator {
    sum(a: number, b: number): number {
        return a + b;
    }
  
    subtract(a: number, b: number): number {
        return a - b;
    }
  
    multiply(a: number, b: number): number {
        return a * b;
    }
  
    divide(a: number, b: number): number | string {
        if (b === 0) {
            throw new Error("You can't divide by zero");
        }
        return a / b;
    }
  
    power(a: number, b: number): number {
        return Math.pow(a, b);
    }
  
    factorial(n: number): number {
        if (n < 0) {
            throw new Error("You can't calculate the factorial of a negative number");
        }
        if (n === 0 || n === 1) {
            return 1;
        }
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}

const calculator = new Calculator();
console.log(calculator.sum(2, 3)); // 5
console.log(calculator.subtract(5, 2)); // 3
console.log(calculator.multiply(5, 2)); // 10
console.log(calculator.divide(10, 2)); // 5
console.log(calculator.power(2, 3)); // 8
console.log(calculator.factorial(5)); // 120