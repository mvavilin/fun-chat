import '@styles/index.scss';

import Router from '@/router';
import { ElementBuilder } from '@utils';

document.addEventListener('DOMContentLoaded', () => {
  const app = new ElementBuilder({ id: 'app' });
  document.body.appendChild(app.getElement());

  const router = new Router(app.id);
  router.init();
});
