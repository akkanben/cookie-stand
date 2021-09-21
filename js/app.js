'use strict';

let times = [
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
];

function City(name, minimumCustomer, maximumCustomer, averageCookiePerSale) {
  this.name = name;
  this.minimumCustomer = minimumCustomer;
  this.maximumCustomer = maximumCustomer;
  this.averageCookiePerSale = averageCookiePerSale;
}

City.prototype.generateRandomCustomerCount = function () {
  let randomCount = Math.random() * (1 + this.maximumCustomer - this.minimumCustomer) + this.minimumCustomer;
  return Math.floor(randomCount);
};

City.prototype.simulateCookieSales = function () {
  let cookieSales = [];
  let numHours = times.length;
  for (let i = 0; i < numHours; i++) {
    let cookieCount = Math.floor(this.getRandomCustomerCount() * this.averageCookiePerSale);
    cookieSales.push(cookieCount);
  }
  return cookieSales;
};

let seattle = new City('Seatte', 23, 65, 6.3);
let tokyo = new City('Tokyo', 3, 24, 1.2);
let dubai = new City('Dubai', 11, 38, 3.7);
let paris = new City('Paris', 20, 38, 2.3);
let lima = new City('Lima', 2, 16, 4.6);

let getFakeSalesUL = function (city) {
  let cookieUL = document.createElement('ul');
  let total = 0;
  for (let i = 0; i < times.length; i++) {
    let listItemLI = document.createElement('li');
    let cookieCount = Math.floor(city.generateRandomCustomerCount() * city.averageCookiePerSale);
    total += cookieCount;
    listItemLI.innerText = times[i] + ': ' + cookieCount + ' cookies.';
    cookieUL.appendChild(listItemLI);
    if (i === times.length - 1) {
      let totalLI = document.createElement('li');
      totalLI.innerText = 'Total: ' + total;
      cookieUL.appendChild(totalLI);
    }
  }
  return cookieUL;
};

let getCityArticleWithHeader = function (city) {
  let citiesArticle = document.createElement('article');
  let cityH2 = document.createElement('h2');
  cityH2.innerText = city.name;
  let cityUL = getFakeSalesUL(city);
  citiesArticle.appendChild(cityH2);
  citiesArticle.appendChild(cityUL);
  return citiesArticle;
};

let cityList = [
  seattle,
  tokyo,
  dubai,
  paris,
  lima,
];

let citiesSection = document.getElementById('citiesSection');

for (let i = 0; i < cityList.length; i++) {
  citiesSection.appendChild(getCityArticleWithHeader(cityList[i]));
}
