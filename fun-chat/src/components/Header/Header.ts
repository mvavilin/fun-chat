import { ElementBuilder, ButtonBuilder } from '@utils';
import { authState } from '@state';
import { closeApp } from '@ws/auth';
import type { User } from '@types';

export default class Header extends ElementBuilder {
  private container = new ElementBuilder({ classes: ['container'] });
  private appTitle = new ElementBuilder({ tag: 'h1', content: 'Fun Chat', classes: ['app-title'] });
  private userInfo = new ElementBuilder({ classes: ['user-info'] });
  private userName = new ElementBuilder({
    tag: 'p',
    classes: ['user-name'],
  });
  private logoutButton = new ButtonBuilder({
    content: 'Logout',
    classes: ['secondary', 'small'],
    events: [
      {
        type: 'click',
        handler: async () => await closeApp(this.logoutButton),
      },
    ],
  });

  constructor() {
    super({ tag: 'header', classes: ['header'] });

    authState.subscribe((user) => {
      this.render(user);
    });

    this.render(authState.user);
  }

  private render(user: User): void {
    this.userInfo.clear();

    if (user.isLogined && user.login) {
      this.userName.content = user.login;
      this.userInfo.addChild(this.userName, this.logoutButton);
    }

    this.container.clear();
    this.container.addChild(this.appTitle, this.userInfo);

    this.clear();
    this.addChild(this.container);
  }
}
