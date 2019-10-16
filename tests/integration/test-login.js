require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');

describe('Local login integration test', async function () {
  let driver

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build()
  });

  it('Case 1: Login', async function() {
    await driver.get('http://localhost:8080/auth/login')

    await driver.wait(until.elementLocated(By.className('auth-form__btn')), 10000)

    // ToDo - Enter a pin and password
    //await driver.findElement(By.id('phone_number')).sendKeys('71234567890')
    //await driver.findElement(By.id('pin_number')).sendKeys('mkoDHJ493')

    await driver.findElement(By.className('auth-form__btn')).click()
    await driver.sleep(3000)

    let pageHeader = await driver.findElement(By.tagName('h1')).then(async (el) => {
      return await el.getAttribute("innerText")
    }).catch(async () => {
      return ''
    })

    assert.equal(pageHeader, 'Информационная панель')
  })

  it('Case 2: News', async function() {
    await driver.findElement(By.partialLinkText('Новости')).click();
    await driver.sleep(1000);

    let pageHeader = await driver.findElement(By.tagName('h1')).then(async (el) => {
      return await el.getAttribute("innerText")
    }).catch(async () => {
      return ''
    })

    assert.equal(pageHeader, 'Новости')
  })

  it('Case 3: Logout', async function() {
    await driver.findElement(By.id('sidebar-logout')).click();
    await driver.sleep(1000);

    let pageHeader = await driver.findElement(By.tagName('h1')).then(async (el) => {
      return await el.getAttribute("innerText")
    }).catch(async () => {
      return ''
    })

    assert.equal(pageHeader, '');
  });

  after(() => driver && driver.quit());
})