import { ElementBuilder, InputBuilder } from '@utils';
import { UserList } from '@components';

export default class Sidebar extends ElementBuilder {
  private searchContainer = new ElementBuilder({ classes: ['search-input'] });
  private searchInput = new InputBuilder({
    tag: 'input',
    classes: ['input'],
    attributes: {
      type: 'text',
      placeholder: 'Search users...',
      id: 'user-search',
      name: 'search',
    },
  });
  private userList: UserList;

  constructor() {
    super({ tag: 'aside', classes: ['sidebar'] });

    // TODO: remove after testing
    const users = [
      { name: 'Alice', online: true, unread: 3 },
      { name: 'Bob', online: false, unread: 0 },
      { name: 'Charlie', online: true, unread: 1 },
      { name: 'Diana', online: false, unread: 0 },
      { name: 'Alice', online: true, unread: 3 },
      { name: 'Bob', online: false, unread: 0 },
      { name: 'Charlie', online: true, unread: 1 },
      { name: 'Diana', online: false, unread: 0 },
      { name: 'Alice', online: true, unread: 3 },
      { name: 'Bob', online: false, unread: 0 },
      { name: 'Charlie', online: true, unread: 1 },
      { name: 'Diana', online: false, unread: 0 },
    ];

    this.userList = new UserList(users);
    this.render();
  }

  private render(): void {
    this.searchContainer.addChild(this.searchInput);
    this.addChild(this.searchContainer, this.userList);
  }

  public updateUserList(users: Array<{ name: string; online: boolean; unread: number }>): void {
    this.userList.updateUsers(users);
  }
}
