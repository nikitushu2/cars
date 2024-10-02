"use strict";

const addCarForm = document.querySelector("#addCar");
const searchCarForm = document.querySelector("#searchCar");

const cars = [];

class Car {
    // intialize a car
    constructor(license, maker, model, owner, price, color, year) {
        this.license = license;
        this.maker = maker;
        this.model = model;
        this.owner = owner;
        this.price = parseFloat(price);
        this.color = color;
        this.year = parseInt(year);
    }

    // calculate the age for the discount
    getCarAge() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.year;
    }

    // calculate the price
    getDiscountedPrice() {
        return this.getCarAge() > 10 ? this.price * 0.85 : this.price;
    }

    isEligibleForDiscount() {
        return this.getCarAge() > 10;
    }

}

// add car to the list and display it in the table
const addCar = (e) => {
    e.preventDefault();

    try {
        const license = document.querySelector("#license").value.trim();
        const maker = document.querySelector("#maker").value.trim();
        const model = document.querySelector("#model").value.trim();
        const owner = document.querySelector("#owner").value.trim();
        const price = parseFloat(document.querySelector("#price").value.trim());
        const color = document.querySelector("#color").value.trim();
        const year = parseInt(document.querySelector("#year").value.trim());
        // get a current year
        const currentYear = new Date().getFullYear();

        if (!license || !maker || !model || !owner || isNaN(price) || !color || isNaN(year)) {
            throw new Error("All fields are required and must be valid.");
        }

        if (price <= 0) {
            throw new Error("Price must be a positive number.");
        }

        if (year < 1886 || year > currentYear) {
            throw new Error(`Year must be between 1886 and ${currentYear}.`);
        }

        const newCar = new Car(license, maker, model, owner, price, color, year);
        addCarForm.reset();
        cars.push(newCar);
        displayTable();

    } catch (error) {
        alert(error.message);
    }
};

// create a table
const displayTable = () => {
    const table = document.querySelector("#carsTable");

    table.innerHTML = table.rows[0].innerHTML;

    cars.forEach((car) => {
        const row = table.insertRow(-1);

        const { license, maker, model, owner, year, color, price } = car;

        const carDetails = [license, maker, model, owner, year, color];

        carDetails.forEach(detail => {
            row.insertCell(-1).textContent = detail ?? 'N/A';
        });

        row.insertCell(-1).textContent = `${price.toFixed(2)}€`;

        const discountedPrice = car.isEligibleForDiscount()
            ? `$${car.getDiscountedPrice().toFixed(2)}`
            : "No Discount";
        row.insertCell(-1).textContent = discountedPrice;
    });
};

// search for a car
const searchCar = (e) => {
    e.preventDefault();
    const searchInput = document.querySelector("#search").value.trim();
    const foundCar = cars.find((car) => car.license.toLowerCase() === searchInput.toLowerCase());

    const searchResult = document.querySelector("#searchResult");

    if (foundCar) {
        const originalPrice = foundCar.price.toFixed(2);
        const discountedPrice = foundCar.isEligibleForDiscount()
            ? `$${foundCar.getDiscountedPrice().toFixed(2)}`
            : "No Discount";

        searchResult.innerHTML = `
            <p>Maker: ${foundCar.maker}</p>
            <p>Model: ${foundCar.model}</p>
            <p>Owner: ${foundCar.owner}</p>
            <p>Year: ${foundCar.year}</p>
            <p>Original Price: $${originalPrice}</p>
            <p>Discounted Price: ${discountedPrice}</p>
            <p>Color: ${foundCar.color}</p>
        `;
    } else {
        searchResult.innerHTML = "<p>No car found with the given license plate.</p>";
    }
};

addCarForm.addEventListener("submit", addCar);
searchCarForm.addEventListener("submit", searchCar);
