import { ElementBuilder, ButtonBuilder } from '@utils';
import { authState } from '@state';
import { closeApp } from '@ws/auth';

export default class Header extends ElementBuilder {
  private container = new ElementBuilder({ classes: ['container'] });
  private appTitle = new ElementBuilder({ tag: 'h1', content: 'Fun Chat', classes: ['app-title'] });
  private userInfo = new ElementBuilder({ classes: ['user-info'] });
  private userName = new ElementBuilder({
    tag: 'p',
    content: authState.login,
    classes: ['user-name'],
  });
  private logoutBtn = new ButtonBuilder({
    content: 'Logout',
    classes: ['secondary', 'small'],
    events: [
      {
        type: 'click',
        handler: async () => await closeApp(this.logoutBtn),
      },
    ],
  });

  constructor() {
    super({
      tag: 'header',
      classes: ['header'],
    });

    this.render();
  }

  private render(): void {
    this.userInfo.addChild(this.userName, this.logoutBtn);
    this.container.addChild(this.appTitle, this.userInfo);
    this.addChild(this.container);
  }
}
