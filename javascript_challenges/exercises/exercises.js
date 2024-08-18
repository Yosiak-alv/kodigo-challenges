const CATEGORY_TYPE = require('../enums/CategoryType');
const roundNumber = require('../utils/formatNumber');
// Exercise 1:
const isOlderAge = (age) => age >= 18 ? console.log("Is of legal age") : console.log("Not of legal age");
console.log("\n");
console.log("Exercise 1:");
isOlderAge(18); 
isOlderAge(17); 


//Exercise 2:
const calculateGrade = (student) => {
    const final_grade = (student.exam_grade * 0.2) + (student.assistance_grade * 0.1) + (student.homeworks_grade * 0.4) + (student.investigation_grade * 0.3);
    return {
            id: student.id,
            name: student.name,
            final_grade: final_grade
        };
}
console.log("\n");
console.log("Exercise 2:");
console.log(calculateGrade({ id: 1, name: "Juan", exam_grade: 7, assistance_grade: 5, homeworks_grade: 9, investigation_grade: 5 }));

//Exercise 3:
const calculateBonus = (name, salary, category) => {
    switch (category) {
        case CATEGORY_TYPE.A:
            return {
                name: name,
                category: category,
                salary: salary,
                bonus: roundNumber(salary * 0.15),
                salary_with_bonus: roundNumber(salary + salary * 0.15)
            }
        case CATEGORY_TYPE.B:
            return {
                name: name,
                category: category,
                salary: salary,
                bonus:  roundNumber(salary * 0.30),
                salary_with_bonus: roundNumber(alary + salary * 0.30)
            }
        case CATEGORY_TYPE.C:
            return {
                name: name,
                category: category,
                salary: salary,
                bonus: roundNumber(salary * 0.1),
                salary_with_bonus: roundNumber(salary + salary * 0.1)
            }
        case CATEGORY_TYPE.D:
            return {
                name: name,
                category: category,
                salary: salary,
                bonus: roundNumber(salary * 0.2),
                salary_with_bonus: roundNumber(salary + salary * 0.2)
            }
        default:
            return "Category not found";
    }
}
console.log("\n");
console.log("Exercise 3:");
console.log(calculateBonus("Juan", 855.89, CATEGORY_TYPE.A));

//Exercise 4:
const isGreaterThan = (a, b) => a > b ? console.log(a) : console.log(b);
console.log("\n");
console.log("Exercise 4:");
isGreaterThan(5, 2);
isGreaterThan(600, 100);

//Exercise 6:
const calculateDiscount = (origin, destiny, price) => {
    let discount = 0;
    let final_price = 0;
    if (origin.toLowerCase() === "palma") {
        switch (destiny.toLowerCase()) {
            case "la costa del sol":
                discount = roundNumber(price * 0.05);
                final_price = price - discount;
                break;
            case "panchimalco":
                discount = roundNumber(price * 0.1);
                final_price = price - discount;
                break;
            case "puerto el triunfo":
                discount = roundNumber(price * 0.15);
                final_price = price - discount;
                break;
            default:
                discount = 0; 
                final_price = price;
        }
    }
    return {
        origin: origin,
        destiny: destiny,
        price: price,
        discount: discount,
        final_price: final_price
    };
}
console.log("\n");
console.log("Exercise 6:");
console.log(calculateDiscount("Palma", "La Costa del Sol", 855.89));
console.log(calculateDiscount("Palma", "Panchimalco", 855.89));
console.log(calculateDiscount("Palma", "Puerto el Triunfo", 855.89));
console.log(calculateDiscount("Palma", "San Salvador", 855.89));

//Exercise 7:
const listOperations = (list) => {
    const negatives = list.filter(value => value < 0).length;
    const positives = list.filter(value => value > 0).length;
    const multipliesOf15 = list.filter(value => value % 15 === 0 && value !== 0).length;
    const accumulatedPairs = list
        .filter(value => value % 2 === 0) 
        .reduce((result, value) => result + value, 0); 
    
    return {
        negatives: negatives,
        positives: positives,
        multipliesOf15: multipliesOf15,
        accumulatedPairs: accumulatedPairs
    };
}
console.log("\n");
console.log("Exercise 7:");
console.log(listOperations([12, -15, 30, 5, -20, 45, 16, 1, 60, -3]));

//Exercise 8:
const multiplyTable = (number) => {
    if (!isNaN(number)) {
        console.log(`Multiplication table of ${number}`);
        for (let i = 1; i <= 10; i++) {
            console.log(`${number} x ${i} = ${number * i}`);
        }
    } else {
        console.log("The value entered is not a number");
    }
}
console.log("\n");
console.log("Exercise 8:");
multiplyTable(9);

//Exercise 9:
const calculateTemperature = (temperature) => {
    let fahrenheit = roundNumber((temperature * (9/5)) + 32);
    if(fahrenheit >= 14 && fahrenheit < 32) {
        return console.log("Low temperature: ", fahrenheit + "°F");
    }
    else if(fahrenheit >= 32 && fahrenheit < 68) {
        return console.log("Normal temperature: ", fahrenheit + "°F");
    }
    else if(fahrenheit >= 68 && fahrenheit < 96) {
        return console.log("High temperature: ", fahrenheit + "°F");
    }
    else {
        return console.log("Unknown temperature");
    }
}
console.log("\n");
console.log("Exercise 9:");
calculateTemperature("20");