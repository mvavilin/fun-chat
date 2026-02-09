import { wsClient } from '@/wsClient';
import { authState } from '@state';
import { UserList } from '@components';
import { ElementBuilder, InputBuilder } from '@utils';
import { Notification } from '@components/ui';
import { NOTIFICATION, WS_MESSAGES, SERVER_EVENTS } from '@constants';
import type { User } from '@types';

export default class Sidebar extends ElementBuilder {
  private userList: UserList = new UserList([]);
  private allUsers: User[] = [];
  private searchInput: InputBuilder = new InputBuilder({
    classes: ['search-input'],
    attributes: { type: 'text', placeholder: 'Search users...', id: 'user-search' },
  });

  constructor() {
    super({ tag: 'aside', classes: ['sidebar'] });

    this.searchInput.addEvent({ type: 'input', handler: () => this.filterUsers() });
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

      this.allUsers = [...filteredActiveUsers, ...inactiveUsers];

      this.filterUsers();
    } catch {
      new Notification(WS_MESSAGES.UPDATE_USERS_FAILED, NOTIFICATION.TYPE.ERROR);
    }
  }

  private filterUsers(): void {
    const searchQuery = this.searchInput.value.trim().toLowerCase();

    let filteredUsers = this.allUsers;

    if (searchQuery) {
      filteredUsers = this.allUsers.filter((user) =>
        user.login ? user.login.toLowerCase().includes(searchQuery) : false
      );
    }

    this.userList.updateUsers(filteredUsers);
  }

  private render(): void {
    this.addChild(this.searchInput, this.userList);
  }
}
