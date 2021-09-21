'use strict';

let citiesSection = document.getElementById('citiesSection');
let citiesTable = document.createElement('table');

function City(name, minimumCustomer, maximumCustomer, averageCookiePerSale) {
  this.name = name;
  this.minimumCustomer = minimumCustomer;
  this.maximumCustomer = maximumCustomer;
  this.averageCookiePerSale = averageCookiePerSale;
  this.cookieSales = [];
}

City.prototype.totalCookieSales = [];

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
  let numHours = this.hours.length;
  let total = 0;
  for (let i = 0; i < numHours; i++) {
    if (i !== numHours - 1) {
      let cookieCount = Math.floor(this.generateRandomCustomerCount() * this.averageCookiePerSale);
      this.cookieSales.push(cookieCount);
      total += cookieCount;
    } else {
      this.cookieSales.push(total);
    }
  }
  this.totalCookieSales.push(this.cookieSales);
  return this.cookieSales;
};

City.prototype.renderTableRows = function (parentEl) {
  let currentRow = document.createElement('tr');
  let cookieSales = this.simulateCookieSales();
  let nameLabel = document.createElement('td');
  nameLabel.innerText = this.name;
  currentRow.appendChild(nameLabel);
  for (let i = 0; i < this.hours.length; i++) {
    let currentTableData = document.createElement('td');
    currentTableData.innerText = cookieSales[i];
    currentRow.appendChild(currentTableData);
  }
  parentEl.appendChild(currentRow);
};

let seattle = new City('Seatte', 23, 65, 6.3);
let tokyo = new City('Tokyo', 3, 24, 1.2);
let dubai = new City('Dubai', 11, 38, 3.7);
let paris = new City('Paris', 20, 38, 2.3);
let lima = new City('Lima', 2, 16, 4.6);

// Render table header
let renderHoursHeader = function (parentEl) {
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
renderHoursHeader(citiesTable);

// Render table city data
let cityList = [
  seattle,
  tokyo,
  dubai,
  paris,
  lima,
];
for (let i = 0; i < cityList.length; i++) {
  cityList[i].renderTableRows(citiesTable);
}

// Render table Footer
let footer = document.createElement('tr');
let totalLabel = document.createElement('td');
totalLabel.innerText = 'Totals';
footer.appendChild(totalLabel);
for (let i = 0; i < City.prototype.hours.length; i++) {
  let currentFooterData = document.createElement('td');
  let total = 0;
  for (let j = 0; j < City.prototype.totalCookieSales.length; j++) {
    total += City.prototype.totalCookieSales[j][i];
  }
  currentFooterData.innerText = total;
  footer.appendChild(currentFooterData);
}
citiesTable.appendChild(footer);

// Append to Page
citiesSection.appendChild(citiesTable);

