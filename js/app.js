'use strict';

let times = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
];

let seattle = {
  name: 'Seattle',
  minimumCustomer: 23,
  maximumCustomer: 65,
  averageCookiePerSale: 6.3,
  getRandomCustomerCount: function () {
    return Math.floor(Math.random() * (1 + this.maximumCustomer - this.minimumCustomer) + this.minimumCustomer);
  },
  getSimulatedCookieSales: function () {
    let cookieSales = [];
    let numHours = times.length - 1;
    for (let i = 0; i < numHours; i++) {
      let cookieCount = Math.floor(this.getRandomCustomerCount() * this.averageCookiePerSale);
      cookieSales.push(cookieCount);
    }
    return cookieSales;
  },
};

let tokyo = {
  name: 'Tokyo',
  minimumCustomer: 3,
  maximumCustomer: 24,
  averageCookiePerSale: 1.2,
  getRandomCustomerCount: function () {
    return Math.floor(Math.random() * (1 + this.maximumCustomer - this.minimumCustomer) + this.minimumCustomer);
  },
  getSimulatedCookieSales: function () {
    let cookieSales = [];
    let numHours = times.length - 1;
    for (let i = 0; i < numHours; i++) {
      let cookieCount = Math.floor(this.getRandomCustomerCount() * this.averageCookiePerSale);
      cookieSales.push(cookieCount);
    }
    return cookieSales;
  },
};

let dubai = {
  name: 'Dubai',
  minimumCustomer: 11,
  maximumCustomer: 38,
  averageCookiePerSale: 3.7,
  getRandomCustomerCount: function () {
    return Math.floor(Math.random() * (1 + this.maximumCustomer - this.minimumCustomer) + this.minimumCustomer);
  },
  getSimulatedCookieSales: function () {
    let cookieSales = [];
    let numHours = times.length - 1;
    for (let i = 0; i < numHours; i++) {
      let cookieCount = Math.floor(this.getRandomCustomerCount() * this.averageCookiePerSale);
      cookieSales.push(cookieCount);
    }
    return cookieSales;
  },
};

let paris = {
  name: 'Paris',
  minimumCustomer: 20,
  maximumCustomer: 38,
  averageCookiePerSale: 2.3,
  getRandomCustomerCount: function () {
    return Math.floor(Math.random() * (1 + this.maximumCustomer - this.minimumCustomer) + this.minimumCustomer);
  },
  getSimulatedCookieSales: function () {
    let cookieSales = [];
    let numHours = times.length - 1;
    for (let i = 0; i < numHours; i++) {
      let cookieCount = Math.floor(this.getRandomCustomerCount() * this.averageCookiePerSale);
      cookieSales.push(cookieCount);
    }
    return cookieSales;
  },
};

let lima = {
  name: 'Lima',
  minimumCustomer: 2,
  maximumCustomer: 16,
  averageCookiePerSale: 4.6,
  getRandomCustomerCount: function () {
    return Math.floor(Math.random() * (1 + this.maximumCustomer - this.minimumCustomer) + this.minimumCustomer);
  },
  getSimulatedCookieSales: function () {
    let cookieSales = [];
    let numHours = times.length - 1;
    for (let i = 0; i < numHours; i++) {
      let cookieCount = Math.floor(this.getRandomCustomerCount() * this.averageCookiePerSale);
      cookieSales.push(cookieCount);
    }
    return cookieSales;
  },
};


let getFakeSalesUL = function (city) {
  let cookieUL = document.createElement('ul');
  let total = 0;
  for (let i = 0; i < times.length; i++) {
    let listItemLI = document.createElement('li');
    let cookieCount = Math.floor(city.getRandomCustomerCount() * city.averageCookiePerSale);
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
  let cityH1 = document.createElement('h1');
  cityH1.innerText = city.name;
  let cityUL = getFakeSalesUL(city);
  citiesArticle.appendChild(cityH1);
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

let mainEL = document.querySelector('main');
for (let i = 0; i < cityList.length; i++) {

  mainEL.appendChild(getCityArticleWithHeader(cityList[i]));
}
