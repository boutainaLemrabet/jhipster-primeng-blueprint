import { browser } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  TaskCommentComponentsPage,
  /* TaskCommentDeleteDialog, */
  TaskCommentUpdatePage
} from './task-comment.page-object';

const expect = chai.expect;

describe('TaskComment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taskCommentComponentsPage: TaskCommentComponentsPage;
  let taskCommentUpdatePage: TaskCommentUpdatePage;
  /* let taskCommentDeleteDialog: TaskCommentDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
  });

  it('should load TaskComments', async () => {
    await navBarPage.goToEntity('task-comment');
    taskCommentComponentsPage = new TaskCommentComponentsPage();
    expect(await taskCommentComponentsPage.getTitle()).to.eq('primengtestApp.taskComment.home.title');
  });

  it('should load create TaskComment page', async () => {
    await taskCommentComponentsPage.clickOnCreateButton();
    taskCommentUpdatePage = new TaskCommentUpdatePage();
    expect(await taskCommentUpdatePage.getPageTitle()).to.eq('primengtestApp.taskComment.home.createOrEditLabel');
    await taskCommentUpdatePage.cancel();
  });

  /* it('should create and save TaskComments', async () => {
        const nbButtonsBeforeCreate = await taskCommentComponentsPage.countDeleteButtons();

        await taskCommentComponentsPage.clickOnCreateButton();
        await taskCommentUpdatePage.setValueInput('value');
        await taskCommentUpdatePage.taskSelectLastOption();
        expect(await taskCommentUpdatePage.getValueInput()).to.eq('value', 'Expected Value value to be equals to value');

        await taskCommentUpdatePage.save();
        expect(await taskCommentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await taskCommentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last TaskComment', async () => {
        const nbButtonsBeforeDelete = await taskCommentComponentsPage.countDeleteButtons();
        await taskCommentComponentsPage.clickOnLastDeleteButton();

        taskCommentDeleteDialog = new TaskCommentDeleteDialog();
        await taskCommentDeleteDialog.clickOnConfirmButton();

        expect(await taskCommentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
