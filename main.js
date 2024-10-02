'use strict';

const addCarForm = document.querySelector('#addCar');
const searchCarForm = document.querySelector('#searchCar');

const cars = [];

class Car {
    // initialize a car
    constructor(license, maker, model, owner, price, color) {
        this.license = license;
        this.maker = maker;
        this.model = model;
        this.owner = owner;
        this.price = parseFloat(price);
        this.color = color;
    }
}

// add car to the list and table
const addCar = (e) => {
    e.preventDefault();

    const license = document.querySelector('#license').value.trim();
    const maker = document.querySelector('#maker').value.trim();
    const model = document.querySelector('#model').value.trim();
    const owner = document.querySelector('#owner').value.trim();
    const price = document.querySelector('#price').value.trim();
    const color = document.querySelector('#color').value;

    // create a car instance
    const newCar = new Car(license, maker, model, owner, price, color);

    // clear the form fields after submitting
    addCarForm.reset();

    cars.push(newCar)
    displayTable();
}

// constructs a table
const displayTable = () => {
    const table = document.querySelector('#carsTable');

    table.innerHTML = table.rows[0].innerHTML;

    cars.forEach(car => {
        // insert row at last position
        const row = table.insertRow(-1);

        Object.values(car).forEach(text => {
            const cell = row.insertCell(-1);
            cell.textContent = text;
        })
    })
}

// searches for the car based on plate
const searchCar = (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('#search').value;
    const foundCar = cars.find(car => car.license.toLowerCase() === searchInput.toLowerCase());

    const searchResult = document.querySelector('#searchResult');
    if (foundCar) {
        searchResult.innerHTML = `
          <p>Maker: ${foundCar.maker}</p>
          <p>Model: ${foundCar.model}</p>
          <p>Owner: ${foundCar.owner}</p>
          <p>Price: ${foundCar.price.toFixed(2)}€</p>
        `;
    } else {
        searchResult.innerHTML = '<p>No car found with the given license plate.</p>';
    }
}

addCarForm.addEventListener('submit', addCar);
searchCarForm.addEventListener('submit', searchCar);
