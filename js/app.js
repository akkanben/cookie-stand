'use strict';



// City constructor function
function City(name, minimumCustomer, maximumCustomer, averageCookiePerSale) {
  this.name = name;
  this.minimumCustomer = minimumCustomer;
  this.maximumCustomer = maximumCustomer;
  this.averageCookiePerSale = averageCookiePerSale;
  this.cookieSales = [];
  this.cookieTotal = 0;
  this.tosserCount = [];
}

City.totalCookieSales = [];
//City.prototype.totalTossersNeeded = [];
City.cityCollection = [];

// String data for each column header.
City.hours = [
  '6:00 am ',
  '7:00 am ',
  '8:00 am ',
  '9:00 am ',
  '10:00 am',
  '11:00 am',
  '12:00 pm',
  '1:00 pm ',
  '2:00 pm ',
  '3:00 pm ',
  '4:00 pm ',
  '5:00 pm ',
  '6:00 pm ',
  '7:00 pm ',
  'Daily Total'
];

City.prototype.generateRandomCustomerCount = function () {
  let randomCount = Math.random() * (1 + this.maximumCustomer - this.minimumCustomer) + this.minimumCustomer;
  return Math.floor(randomCount);
};

City.prototype.simulateCookieSales = function () {
  this.cookieTotal = 0;
  for (let i = 0; i < City.hours.length; i++) {
    // Don't iterate on the last (totals) index
    if (i < City.hours.length - 1) {
      let customerCount = Math.floor(this.generateRandomCustomerCount());
      let cookieCount = Math.floor(customerCount * this.averageCookiePerSale);
      this.cookieSales[i] = cookieCount;
      // Add current cookieSales to the totals index
      this.cookieTotal += cookieCount;
    }
  }
  // Add the totals to the end of the cookieSales array.
  this.cookieSales[City.hours.length - 1] = this.cookieTotal;
};

// Adds cities cookieSales to totalCookieSales
City.prototype.calculateTotals = function () {
  for (let i = 0; i < City.hours.length; i++) {
    let num = this.cookieSales[i];
    if (City.totalCookieSales[i] === undefined) {
      City.totalCookieSales[i] = 0;
    }
    City.totalCookieSales[i] += num;
  }
};

// Render table header
City.renderHoursHeader = function (parentEl) {
  let tableHeader = document.createElement('tr');
  let filler = document.createElement('th');
  tableHeader.appendChild(filler);
  for (let i = 0; i < City.hours.length; i++) {
    let headerData = document.createElement('th');
    headerData.innerText = City.hours[i];
    tableHeader.appendChild(headerData);
  }
  parentEl.appendChild(tableHeader);
};

// Render single row
City.prototype.renderRow = function (parentEl) {
  let currentRow = document.createElement('tr');
  let nameLabel = document.createElement('td');
  nameLabel.innerText = this.name;
  currentRow.appendChild(nameLabel);
  for (let i = 0; i < City.hours.length; i++) {
    let currentTableData = document.createElement('td');
    currentTableData.innerText = this.cookieSales[i];
    currentRow.appendChild(currentTableData);
  }
  parentEl.appendChild(currentRow);
};

City.renderTotalsFooter = function (parentEl) {
  let footer = document.createElement('tr');
  footer.id = 'totals';
  let totalLabel = document.createElement('td');
  totalLabel.innerText = 'Totals';
  footer.appendChild(totalLabel);
  for (let i = 0; i < City.totalCookieSales.length; i++) {
    let currentFooterData = document.createElement('td');
    currentFooterData.innerText = City.totalCookieSales[i];
    footer.appendChild(currentFooterData);
  }
  parentEl.appendChild(footer);
};


City.updateAllTotals = function () {
  City.totalCookieSales = [];
  for (let i = 0; i < City.cityCollection.length; i++) {
    City.cityCollection[i].calculateTotals();
  }
};

City.removeTableFooter = function () {
  let tableFooterEl = document.getElementById('totals');
  tableFooterEl.remove();
};


// Used for clearing and redrawing the table from the current cityCollection
City.drawTable = function (parentEl) {
  parentEl.textContent = '';
  City.renderHoursHeader(citiesTable);
  for (let i = 0; i < City.cityCollection.length; i++) {
    let current = City.cityCollection[i];
    current.renderRow(citiesTable);
  }
  City.renderTotalsFooter(citiesTable);
  citiesSection.appendChild(citiesTable);
};



// Iterates all the current city objects and returns the index of the matching name
// Returns -1 if not found.
City.getIndexOf = function (match) {
  for (let i = 0; i < City.cityCollection.length; i++) {
    let current = City.cityCollection[i].name;
    if (match === current) {
      return i;
    }
  }
  return -1;
};

// Generate the Default Cities
let seattle = new City('Seattle', 23, 65, 6.3);
let tokyo = new City('Tokyo', 3, 24, 1.2);
let dubai = new City('Dubai', 11, 38, 3.7);
let paris = new City('Paris', 20, 38, 2.3);
let lima = new City('Lima', 2, 16, 4.6);

let defaultCities = [
  seattle,
  tokyo,
  dubai,
  paris,
  lima,
];

// Simulate Sales and add all to the cityCollection
for (let i = 0; i < defaultCities.length; i++) {
  defaultCities[i].simulateCookieSales();
  defaultCities[i].calculateTotals();
  City.cityCollection.push(defaultCities[i]);
}

// Selects sales.html elements and draws initial table
let citiesSection = document.getElementById('citiesSection');
let citiesTable = document.createElement('table');
City.drawTable(citiesTable);

// Form Listeners
let formEl = document.querySelector('form');
formEl.addEventListener('submit', function (e) {
  e.preventDefault();
  let cityName = e.target.cityName.value;
  let min = e.target.minCustomer.value;
  let max = e.target.maxCustomer.value;
  let average = e.target.averageCookie.value;
  // getIndexOf returns -1 if not found
  let alreadyAddedIndex = City.getIndexOf(cityName);
  if (alreadyAddedIndex >= 0) {
    City.cityCollection[alreadyAddedIndex].minimumCustomer = min;
    City.cityCollection[alreadyAddedIndex].maximumCustomer = max;
    City.cityCollection[alreadyAddedIndex].average = average;
    City.cityCollection[alreadyAddedIndex].simulateCookieSales();
    City.cityCollection[alreadyAddedIndex].calculateTotals();
    City.updateAllTotals();
  } else {
    let newCity = new City(cityName, min, max, average);
    newCity.simulateCookieSales();
    newCity.calculateTotals();
    City.cityCollection.push(newCity);
    City.updateAllTotals();
  }
  City.drawTable(citiesTable);
});





