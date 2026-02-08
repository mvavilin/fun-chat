import { ElementBuilder } from '@utils';

export default class Footer extends ElementBuilder {
  private container = new ElementBuilder({ classes: ['container'] });
  private schoolInfo = new ElementBuilder({ classes: ['school-info'] });
  private schoolLogo = new ElementBuilder({
    classes: ['school-logo'],
  });
  private schoolName = new ElementBuilder({
    tag: 'a',
    content: 'RS School',
    classes: ['school-name', 'link'],
    attributes: {
      href: 'https://rs.school/',
      target: '_blank',
    },
  });
  private authorInfo = new ElementBuilder({ classes: ['author-info'] });
  private authorName = new ElementBuilder({
    tag: 'span',
    content: `© Mikhail Vavilin ${new Date().getFullYear()}`,
    classes: ['author-name'],
  });
  private githubLink = new ElementBuilder({
    tag: 'a',
    content: 'GitHub',
    classes: ['link'],
    attributes: {
      href: 'https://github.com/mvavilin',
      target: '_blank',
    },
  });

  constructor() {
    super({ tag: 'footer', classes: ['footer'] });

    this.render();
  }

  private render(): void {
    this.schoolInfo.addChild(this.schoolLogo, this.schoolName);
    this.authorInfo.addChild(this.authorName, this.githubLink);
    this.container.addChild(this.schoolInfo, this.authorInfo);
    this.addChild(this.container);
  }
}
