import { create } from './utils';
import home from './home';
import './tailwind.scss';

const body = document.createElement('main');
body.append(home());

const homePageBtn = create('button', {}, 'Home');
homePageBtn.addEventListener('click', () => {
  body.innerHTML = '';
  body.append(home());
});

const getLazyPage1 = () => import('./lazy-page-1');
const lazyPage1Btn = create('button', {}, 'Lazy 1');
lazyPage1Btn.addEventListener('click', async () => {
  const page = await getLazyPage1();
  body.innerHTML = '';
  body.append(page.default());
});

const getLazyPage2 = () => import('./lazy-page-2');
const lazyPage2Btn = create('button', {}, 'Lazy 2');
lazyPage2Btn.addEventListener('click', async () => {
  const page = await getLazyPage2();
  body.innerHTML = '';
  body.append(page.default());
});

document.getElementById('root').innerHTML = '';
document.getElementById('root').append(
  create('div', {}, [
    create('header', {}, [
      homePageBtn,
      lazyPage1Btn,
      lazyPage2Btn,
    ]),

    body,
  ]),
);
