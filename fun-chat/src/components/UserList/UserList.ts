import { ElementBuilder, eventEmitter } from '@utils';
import type { User } from '@types';

export default class UserList extends ElementBuilder {
  constructor(users: User[] = []) {
    super({ classes: ['user-list'] });
    this.render(users);
  }

  public updateUsers(users: User[]): void {
    this.clear();
    this.render(users);
  }

  private render(users: User[]): void {
    users.forEach((user) => {
      const userItem = new ElementBuilder({
        classes: ['user-item'],
        events: [
          {
            type: 'click',
            handler: () => {
              eventEmitter.emit('user-selected', user);
            },
          },
        ],
      });

      const statusDot = new ElementBuilder({
        classes: ['online-status', user.isLogined ? 'online' : 'offline'],
      });

      const nameSpan = new ElementBuilder({
        tag: 'span',
        content: user.login || 'Anonymous',
        classes: ['user-name'],
      });

      userItem.addChild(statusDot, nameSpan);
      this.addChild(userItem);
    });
  }
}
