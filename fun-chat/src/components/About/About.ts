import { ElementBuilder } from '@utils';

export default class About extends ElementBuilder {
  private container: ElementBuilder = new ElementBuilder({ classes: ['container'] });
  private contentWrapper: ElementBuilder = new ElementBuilder({
    classes: ['page-content-wrapper'],
  });
  private title: ElementBuilder = new ElementBuilder({
    tag: 'h1',
    content: 'Welcome to Fun Chat!',
    classes: ['h1', 'page-title'],
  });
  private description: ElementBuilder = new ElementBuilder({
    tag: 'p',
    content: 'A real-time chat application built with TypeScript and WebSockets.',
    classes: ['text'],
  });
  private photo: ElementBuilder = new ElementBuilder({
    tag: 'img',
    attributes: {
      src: 'https://sun9-59.userapi.com/s/v1/ig2/KUriR2ug24BFVpgCsqf9WjKS98i-dnzka0Ep9HP5FzIZvGp8vGOmZ_muyKsV1QqEcaV-xFYq-Vw6j1Bbaq9O3Vyt.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,880x880&from=bu&cs=880x0',
      alt: 'Mikhail Alekseevich',
      loading: 'lazy',
    },
    classes: ['author-photo'],
  });
  private authorLink: ElementBuilder = new ElementBuilder({
    tag: 'a',
    content: 'Mikhail Alekseevich',
    attributes: { href: 'https://vk.com/novanight', target: '_blank', rel: 'noopener noreferrer' },
    classes: ['author-link'],
  });
  private authorText: ElementBuilder = new ElementBuilder({
    tag: 'p',
    classes: ['text', 'author-text'],
  });
  private loginLink: ElementBuilder = new ElementBuilder({
    tag: 'a',
    content: 'Log in here',
    attributes: { href: '/#/login', 'data-navigation': 'login' },
    classes: ['login-link', 'text'],
  });
  private instruction: ElementBuilder = new ElementBuilder({
    tag: 'p',
    classes: ['text', 'instruction'],
  });
  private contentBox: ElementBuilder = new ElementBuilder({ classes: ['about-box'] });

  constructor() {
    super({ tag: 'main', classes: ['about-content'] });

    this.render();
  }

  private render(): void {
    this.authorText.addChild(
      new ElementBuilder({ tag: 'span', content: 'Author: ' }),
      this.authorLink
    );

    this.instruction.addChild(
      this.loginLink,
      new ElementBuilder({ tag: 'span', content: ' to start messaging.' })
    );

    this.contentBox.addChild(
      this.title,
      this.description,
      this.photo,
      this.authorText,
      this.instruction
    );

    this.contentWrapper.addChild(this.contentBox);
    this.container.addChild(this.contentWrapper);
    this.addChild(this.container);
  }
}
