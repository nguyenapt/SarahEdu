import { EducationTemplatePage } from './app.po';

describe('Education App', function() {
  let page: EducationTemplatePage;

  beforeEach(() => {
    page = new EducationTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
