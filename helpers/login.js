const { By } = require('selenium-webdriver');
const users = require('../users');
const endpoints = require('../endpoints');

async function loginCustomer(driver) {
  await driver.get(endpoints.login);
  await driver.findElement(By.name('email')).sendKeys(users.customer.email);
  await driver.findElement(By.name('password')).sendKeys(users.customer.password);
  await driver
    .findElement(By.xpath('/html/body/div[1]/div/div[2]/div[2]/div/form/div[3]/button'))
    .click();
}

async function loginAdmin(driver) {
  await driver.get(endpoints.admin);
  await driver.findElement(By.name('email')).sendKeys(users.admin.email);
  await driver.findElement(By.name('password')).sendKeys(users.admin.password);
  await driver.findElement(By.xpath('/html/body/div[1]/form[1]/button')).click();
}

module.exports = { customer: loginCustomer, admin: loginAdmin };
