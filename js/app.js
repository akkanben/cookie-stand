'use strict';

let citiesSection = document.getElementById('citiesSection');
let citiesTable = document.createElement('table');
let tosserSection = document.getElementById('tosserSection');
let tosserTable = document.createElement('table');

// City prototype function
function City(name, minimumCustomer, maximumCustomer, averageCookiePerSale) {
  this.name = name;
  this.minimumCustomer = minimumCustomer;
  this.maximumCustomer = maximumCustomer;
  this.averageCookiePerSale = averageCookiePerSale;
  this.cookieSales = [];
  this.cookieTotal = 0;
  this.tosserCount = [];
}

City.prototype.totalCookieSales = [];
City.prototype.totalTossersNeeded = [];
City.prototype.cityCollection = [];

City.prototype.updateCollection = function (city) {
  // find the city is in cityCollection update its values
};

// String data for each column header.
City.prototype.hours = [
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
  for (let i = 0; i < this.hours.length; i++) {
    // Don't iterate on the last (totals) index
    if (i < this.hours.length - 1) {
      let customerCount = Math.floor(this.generateRandomCustomerCount());
      let cookieCount = Math.floor(customerCount * this.averageCookiePerSale);
      this.cookieSales[i] = cookieCount;
      // Add current cookieSales to the totals index
      this.cookieTotal += cookieCount;
    }
  }
  // Add the totals to the end of the cookieSales array.
  this.cookieSales.push(this.cookieTotal);
};

City.prototype.renderRow = function (parentEl) {
  let currentRow = document.createElement('tr');
  let nameLabel = document.createElement('td');
  nameLabel.innerText = this.name;
  currentRow.appendChild(nameLabel);
  for (let i = 0; i < this.hours.length; i++) {
    let currentTableData = document.createElement('td');
    currentTableData.innerText = this.cookieSales[i];
    currentRow.appendChild(currentTableData);
  }
  parentEl.appendChild(currentRow);
};

City.prototype.calculateTotals = function () {
  for (let i = 0; i < this.hours.length; i++) {
    let num = this.cookieSales[i];
    if (City.prototype.totalCookieSales[i] === undefined) {
      City.prototype.totalCookieSales[i] = 0;
    }
    City.prototype.totalCookieSales[i] += num;
  }
};

// Render table header
City.prototype.renderHoursHeader = function (parentEl) {
  let tableHeader = document.createElement('tr');
  let filler = document.createElement('th');
  tableHeader.appendChild(filler);
  for (let i = 0; i < City.prototype.hours.length; i++) {
    let headerData = document.createElement('th');
    headerData.innerText = City.prototype.hours[i];
    tableHeader.appendChild(headerData);
  }
  parentEl.appendChild(tableHeader);
};

City.prototype.renderTotalsFooter = function (parentEl) {
  let footer = document.createElement('tr');
  footer.id = 'totals';
  let totalLabel = document.createElement('td');
  totalLabel.innerText = 'Totals';
  footer.appendChild(totalLabel);
  for (let i = 0; i < City.prototype.totalCookieSales.length; i++) {
    let currentFooterData = document.createElement('td');
    currentFooterData.innerText = City.prototype.totalCookieSales[i];
    footer.appendChild(currentFooterData);
  }
  citiesTable.appendChild(footer);
};


City.prototype.updateAllTotals = function () {
  City.prototype.totalCookieSales = [];
  for (let i = 0; i < City.prototype.cityCollection.length; i++) {
    City.prototype.cityCollection[i].calculateTotals();
  }
};

City.prototype.removeTableFooter = function () {
  let tableFooterEl = document.getElementById('totals');
  tableFooterEl.remove();
};

City.prototype.renderNewCity = function (parentEl) {
  City.prototype.removeTableFooter();
  this.simulateCookieSales();
  City.prototype.cityCollection.push(this);
  this.renderRow(citiesTable);
  City.prototype.updateAllTotals();
  City.prototype.renderTotalsFooter(parentEl);
};

// Generate the Cities
let seattle = new City('Seatte', 23, 65, 6.3);
let tokyo = new City('Tokyo', 3, 24, 1.2);
let dubai = new City('Dubai', 11, 38, 3.7);
let paris = new City('Paris', 20, 38, 2.3);
let lima = new City('Lima', 2, 16, 4.6);

// Render table city data
let cityList = [
  seattle,
  tokyo,
  dubai,
  paris,
  lima,
];

City.prototype.renderHoursHeader(citiesTable);
for (let i = 0; i < cityList.length; i++) {
  cityList[i].simulateCookieSales();
  cityList[i].calculateTotals();
  City.prototype.cityCollection.push(cityList[i]);
  cityList[i].renderRow(citiesTable);
}
City.prototype.renderTotalsFooter(citiesTable);

// Append to Page
citiesSection.appendChild(citiesTable);
tosserSection.appendChild(tosserTable);


