import { ElementBuilder, ButtonBuilder, navigateTo } from '@utils';
import { authState } from '@state';
import { closeApp } from '@ws/auth';
import type { User } from '@types';
import { HASHES } from '@constants';

export default class Header extends ElementBuilder {
  private container = new ElementBuilder({ classes: ['container'] });
  private appTitle = new ElementBuilder({ tag: 'h1', content: 'Fun Chat', classes: ['app-title'] });
  private userInfo = new ElementBuilder({ classes: ['user-info'] });
  private userName = new ElementBuilder({ tag: 'p', classes: ['user-name'] });

  private logoutButton = new ButtonBuilder({
    content: 'Logout',
    classes: ['secondary', 'small'],
    events: [{ type: 'click', handler: async () => await closeApp(this.logoutButton) }],
  });

  private navButton = new ButtonBuilder({ content: '', classes: ['small'] });

  constructor() {
    super({ tag: 'header', classes: ['header'] });
    authState.subscribe((user) => this.render(user));
    window.addEventListener('hashchange', () => this.render(authState.user));
    this.render(authState.user);
  }

  private render(user: User): void {
    this.userInfo.clear();

    if (user.isLogined && user.login) {
      this.userName.content = user.login;

      const currentHash = window.location.hash;
      if (currentHash === HASHES.ABOUT) {
        this.navButton.content = 'Main';
        this.navButton.addEvent({
          type: 'click',
          handler: () => navigateTo(HASHES.MAIN),
        });
      } else {
        this.navButton.content = 'About';
        this.navButton.addEvent({
          type: 'click',
          handler: () => navigateTo(HASHES.ABOUT),
        });
      }

      this.userInfo.addChild(this.userName, this.navButton, this.logoutButton);
    } else {
      this.navButton.content = 'Login';
      this.navButton.addEvent({
        type: 'click',
        handler: () => navigateTo(HASHES.LOGIN),
      });

      this.userInfo.addChild(this.navButton);
    }

    this.container.clear();
    this.container.addChild(this.appTitle, this.userInfo);

    this.clear();
    this.addChild(this.container);
  }
}
