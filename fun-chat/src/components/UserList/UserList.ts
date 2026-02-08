import { ElementBuilder } from '@utils';

interface User {
  name: string;
  online: boolean;
  unread: number;
}

export default class UserList extends ElementBuilder {
  constructor(users: User[] = []) {
    super({ classes: ['user-list'] });
    this.render(users);
  }

  public updateUsers(users: User[]): void {
    this.removeContent();
    this.render(users);
  }

  private render(users: User[]): void {
    users.forEach((user) => {
      const userItem = new ElementBuilder({ classes: ['user-item'] });

      const statusDot = new ElementBuilder({
        classes: ['online-status', user.online ? 'online' : 'offline'],
      });

      const nameSpan = new ElementBuilder({
        tag: 'span',
        content: user.name,
        classes: ['user-name'],
      });

      userItem.addChild(statusDot, nameSpan);

      if (user.unread > 0) {
        const unreadBadge = new ElementBuilder({
          classes: ['unread-count'],
          content: user.unread.toString(),
        });
        userItem.addChild(unreadBadge);
      }

      this.addChild(userItem);
    });
  }
}
