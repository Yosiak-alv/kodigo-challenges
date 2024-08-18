const form = document.getElementById('form');
const results = document.getElementById('results');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const morningAges = [
        parseInt(document.getElementById('morning1').value),
        parseInt(document.getElementById('morning2').value),
        parseInt(document.getElementById('morning3').value),
        parseInt(document.getElementById('morning4').value),
        parseInt(document.getElementById('morning5').value)
    ];

    const afternoonAges = [
        parseInt(document.getElementById('afternoon1').value),
        parseInt(document.getElementById('afternoon2').value),
        parseInt(document.getElementById('afternoon3').value),
        parseInt(document.getElementById('afternoon4').value),
        parseInt(document.getElementById('afternoon5').value),
        parseInt(document.getElementById('afternoon6').value)
    ];

    const nightAges = [
        parseInt(document.getElementById('night1').value),
        parseInt(document.getElementById('night2').value),
        parseInt(document.getElementById('night3').value),
        parseInt(document.getElementById('night4').value),
        parseInt(document.getElementById('night5').value),
        parseInt(document.getElementById('night6').value),
        parseInt(document.getElementById('night7').value),
        parseInt(document.getElementById('night8').value),
        parseInt(document.getElementById('night9').value),
        parseInt(document.getElementById('night10').value),
        parseInt(document.getElementById('night11').value)
    ];

    const averageMorning = calculateAverage(morningAges);
    const averageAfternoon = calculateAverage(afternoonAges);
    const averageNight = calculateAverage(nightAges);

    let maxTitle = 'Morning';
    let maxAverage = averageMorning;

    if ( averageAfternoon > maxAverage) {
        maxTitle = 'Afternoon';
        maxAverage = promedioTarde;
    }

    if (averageNight > maxAverage) {
        maxTitle = 'Night';
        maxAverage = promedioNoche;
    }

    results.textContent = `
        Average morning shift: ${averageMorning.toFixed(2)} years,
        Afternoon shift average: ${averageAfternoon.toFixed(2)} years,
        Night shift average: ${averageNight.toFixed(2)} years.
        The shift with the highest average age is: ${maxTitle} with ${maxAverage.toFixed(2)} years.
    `;
});

function calculateAverage(ages) {
    const sum = ages.reduce((a, b) => a + b, 0);
    return sum / ages.length;
}