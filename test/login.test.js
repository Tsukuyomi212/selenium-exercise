const { Builder, By } = require('selenium-webdriver');
const expect = require('chai').expect;
const users = require('../users');
const endpoints = require('../endpoints');

describe('login test', function () {
  let driver;
  beforeEach(function () {
    driver = new Builder().forBrowser('firefox').build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('successfully logs in a user', async function () {
    await driver.get(endpoints.login);
    await driver.findElement(By.name('email')).sendKeys(users.customer.email);
    await driver.findElement(By.name('password')).sendKeys(users.customer.password);
    await driver
      .findElement(By.xpath('/html/body/div[1]/div/div[2]/div[2]/div/form/div[3]/button'))
      .click();

    const expectedUrl = endpoints.userDashboard;
    const actualUrl = await driver.getCurrentUrl();

    expect(actualUrl).to.equal(expectedUrl);
  });

  it('successfully logs in an admin', async function () {
    await driver.get(endpoints.admin);
    await driver.findElement(By.name('email')).sendKeys(users.admin.email);
    await driver.findElement(By.name('password')).sendKeys(users.admin.password);
    await driver.findElement(By.xpath('/html/body/div[1]/form[1]/button')).click();

    const adminMessage = await driver
      .findElement(By.xpath('//*[@id="mainHeader"]/strong'))
      .getText();

    expect(adminMessage).to.equal('Hi Admin!');
  });
});
