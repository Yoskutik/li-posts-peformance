import { CARDS_PER_PAGE, create } from '../utils';
import styles from './index.module.scss';

export default () => create('div', {}, Array.from({ length: CARDS_PER_PAGE }, (_, i) => (
  create('article', { class: styles[`article${i}`] }, [
    create('header', {}, [
      create('h2', {}, 'Heading'),
      String(i),
    ]),
  ])
)));
