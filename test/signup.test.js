const { Builder, By } = require('selenium-webdriver');
const expect = require('chai').expect;

const endpoints = require('../endpoints');

describe('User signup', function () {
  let driver;
  beforeEach(function () {
    driver = new Builder().forBrowser('firefox').build();
    const cookiesImposter = driver.findElement(By.className('cookies_bg'));
    if (cookiesImposter) {
      driver.findElement(By.xpath('//*[@id="cookie_stop"]')).click();
    }
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('successfully signs up a user', async function () {
    await driver.get(endpoints.signup);
    await driver.findElement(By.name('first_name')).sendKeys('Jane');
    await driver.findElement(By.name('last_name')).sendKeys('Doe');
    await driver.findElement(By.name('phone')).sendKeys('+2124521234');
    await driver.findElement(By.name('email')).sendKeys('jane@phptravels.com');
    await driver.findElement(By.name('password')).sendKeys('janepassword');
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div[2]/div/form/div[6]/div/div/span/span[1]/span'),
      )
      .click();
    await driver.findElement(By.xpath('/html/body/span/span/span[2]/ul/li[2]')).click();

    await driver
      .findElement(By.xpath('/html/body/div[1]/div/div[2]/div[2]/div/form/div[7]/button'))
      .click();

    const expectedUrl = endpoints.loginAfterSignup;
    const actualUrl = await driver.getCurrentUrl();

    expect(actualUrl).to.equal(expectedUrl);
  });
});
