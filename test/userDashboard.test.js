const { Builder, By } = require('selenium-webdriver');
const expect = require('chai').expect;
const endpoints = require('../endpoints');
const login = require('../helpers/login');

describe('User dashboard', function () {
  let driver;
  this.beforeAll(async function () {
    driver = new Builder().forBrowser('firefox').build();
    await login.customer(driver);
  });

  this.afterAll(async function () {
    await driver.quit();
  });

  it('should show navbar containing links to home, hotels, flights, etc.', async function () {
    const navbar = await driver.findElement(
      By.xpath('/html/body/header/div[2]/div/div/div/div/div[2]/nav'),
    );
    expect(navbar).to.exist;
    const hotelsLink = await driver.findElement(By.linkText('Hotels'));
    expect(hotelsLink).to.exist;
    const flightsLink = await driver.findElement(By.linkText('Flights'));
    expect(flightsLink).to.exist;
    const toursLink = await driver.findElement(By.linkText('Tours'));
    expect(toursLink).to.exist;
  });

  it('should show sidebar', async function () {
    const sidebar = await driver.findElement(By.className('sidebar-menu'));
    expect(sidebar).to.exist;
  });

  it('should have working link to users profile', async function () {
    const profileUrl = await driver.findElement(By.linkText('My Profile'));
    expect(profileUrl).to.exist;
    await profileUrl.click();

    const expectedUrl = endpoints.userProfile;
    const actualUrl = await driver.getCurrentUrl();

    expect(actualUrl).to.equal(expectedUrl);
  });

  it('should be able to logout a user', async function () {
    const logoutUrl = await driver.findElement(By.linkText('Logout'));
    expect(logoutUrl).to.exist;
    await logoutUrl.click();

    const expectedUrl = endpoints.login;
    const actualUrl = await driver.getCurrentUrl();

    expect(actualUrl).to.equal(expectedUrl);
  });

  it('should show users wallet balance', async function () {
    const walletBalance = driver.findElement(By.xpath("//*[contains(text()='Wallet Balance')]"));
    expect(walletBalance).to.exist;
  });
});
