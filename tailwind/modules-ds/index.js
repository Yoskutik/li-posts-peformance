import { create } from './utils';
import home from './home';
import './tailwind.scss';

const body = document.createElement('main');
body.append(home());

document.getElementById('root').innerHTML = '';
document.getElementById('root').append(
  create('div', {}, [
    body,
  ]),
);