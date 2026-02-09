import { wsClient } from '@/wsClient';
import { authState } from '@state';
import { UserList } from '@components';
import { ElementBuilder } from '@utils';
import { Notification } from '@components/ui';
import { NOTIFICATION, WS_MESSAGES, SERVER_EVENTS } from '@constants';

export default class Sidebar extends ElementBuilder {
  private userList: UserList = new UserList([]);

  constructor() {
    super({ tag: 'aside', classes: ['sidebar'] });

    this.init();
  }

  private async init(): Promise<void> {
    wsClient.subscribe(SERVER_EVENTS.USER_LOGIN, () => this.updateList());

    wsClient.subscribe(SERVER_EVENTS.USER_EXTERNAL_LOGIN, () => this.updateList());
    wsClient.subscribe(SERVER_EVENTS.USER_EXTERNAL_LOGOUT, () => this.updateList());

    this.render();
  }

  public async updateList(): Promise<void> {
    try {
      const activeUsers = await wsClient.getActiveUsers();
      const inactiveUsers = await wsClient.getInactiveUsers();
      const filteredActiveUsers = activeUsers.filter((user) => user.login !== authState.user.login);

      this.userList.updateUsers([...filteredActiveUsers, ...inactiveUsers]);
    } catch {
      new Notification(WS_MESSAGES.UPDATE_USERS_FAILED, NOTIFICATION.TYPE.ERROR);
    }
  }

  private render(): void {
    this.addChild(this.userList);
  }
}
