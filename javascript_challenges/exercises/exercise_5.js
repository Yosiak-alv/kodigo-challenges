const form = document.getElementById('form');
const carSelect = document.getElementById('cars');
const price = document.getElementById('price');
const error_car = document.getElementById('error_car');
const error_price = document.getElementById('error_price');

const cars = [
    {
        id: 1,
        brand: 'Ford',
        model: 'Fiesta',
        discount: 0.05
    },
    {
        id: 2,
        brand: 'Ford',
        model: 'Focus',
        discount: 0.1
    },
    {
        id: 3,
        brand: 'Ford',
        model: 'Escape',
        discount: 0.2
    }
];

cars.forEach(car => {
    const option = document.createElement('option');
    option.text = `${car.brand}, ${car.model}`;
    option.value = car.id;
    carSelect.appendChild(option);
});

form.addEventListener('submit', function(event){
    event.preventDefault();
    
    const formData = {
        car: carSelect.value,
        price: price.value
    };

    const errors = validateForm(formData);

    error_car.textContent = '';
    error_price.textContent = '';

    if (Object.keys(errors).length > 0) {
        if (errors.cars) {
            error_car.textContent = errors.cars;
            error_car.style.color = 'hsl(0, 100%, 63%)';
            error_car.style.display = 'block';
        }
        if (errors.price) {
            error_price.textContent = errors.price;
            error_price.style.color = 'hsl(0, 100%, 63%)';
            error_price.style.display = 'block';
        }
    } else {
        const selectedCar = cars.find(car => car.id === parseInt(formData.car));
        alert(
            `Brand: ${selectedCar.brand}\n` +
            `Model: ${selectedCar.model}\n` +
            `Price: $${parseFloat(formData.price).toFixed(2)}\n` +
            `Discount: $${parseFloat(formData.price * selectedCar.discount).toFixed(2)}\n` +
            `Final Price: $${parseFloat(formData.price - (formData.price * selectedCar.discount)).toFixed(2)}`
        );
    }
});

function validateForm(data) {
    const errors = {};
    if (!data.car || !cars.find(car => car.id == parseInt(data.car))) {
        errors.cars = 'Please select a valid car option';
    }

    const priceValue = parseFloat(data.price);
    if (isNaN(priceValue)) {
        errors.price = 'Price is required';
    } else if (priceValue < 1000) {
        errors.price = 'Price must be at least $1000';
    }
    return errors;
}