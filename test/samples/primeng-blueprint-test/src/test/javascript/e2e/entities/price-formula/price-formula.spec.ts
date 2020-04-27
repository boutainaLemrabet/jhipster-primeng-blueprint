import { browser } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PriceFormulaComponentsPage, PriceFormulaDeleteDialog, PriceFormulaUpdatePage } from './price-formula.page-object';

const expect = chai.expect;

describe('PriceFormula e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let priceFormulaComponentsPage: PriceFormulaComponentsPage;
  let priceFormulaUpdatePage: PriceFormulaUpdatePage;
  let priceFormulaDeleteDialog: PriceFormulaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
  });

  it('should load PriceFormulas', async () => {
    await navBarPage.goToEntity('price-formula');
    priceFormulaComponentsPage = new PriceFormulaComponentsPage();
    expect(await priceFormulaComponentsPage.getTitle()).to.eq('primengtestApp.priceFormula.home.title');
  });

  it('should load create PriceFormula page', async () => {
    await priceFormulaComponentsPage.clickOnCreateButton();
    priceFormulaUpdatePage = new PriceFormulaUpdatePage();
    expect(await priceFormulaUpdatePage.getPageTitle()).to.eq('primengtestApp.priceFormula.home.createOrEditLabel');
    await priceFormulaUpdatePage.cancel();
  });

  it('should create and save PriceFormulas', async () => {
    const nbButtonsBeforeCreate = await priceFormulaComponentsPage.countDeleteButtons();

    await priceFormulaComponentsPage.clickOnCreateButton();
    await priceFormulaUpdatePage.setMaxInput('9999999');
    await priceFormulaUpdatePage.setFormulaInput('formula');
    expect(await priceFormulaUpdatePage.getMaxInput()).to.eq('9999999', 'Expected max value to be equals to 9999999');
    expect(await priceFormulaUpdatePage.getFormulaInput()).to.eq('formula', 'Expected Formula value to be equals to formula');

    await priceFormulaUpdatePage.save();
    expect(await priceFormulaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await priceFormulaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PriceFormula', async () => {
    const nbButtonsBeforeDelete = await priceFormulaComponentsPage.countDeleteButtons();
    await priceFormulaComponentsPage.clickOnLastDeleteButton();

    priceFormulaDeleteDialog = new PriceFormulaDeleteDialog();
    await priceFormulaDeleteDialog.clickOnConfirmButton();

    expect(await priceFormulaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
