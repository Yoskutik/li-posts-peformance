import { create, CARDS_PER_PAGE } from '../utils';
import { button, card, checkbox, divider, input, radio } from '../design-system';
import styles from './index.module.scss';

export default () => create('div', {}, Array.from({ length: CARDS_PER_PAGE }, (_, i) => (
  create('div', { class: styles[`block${i}`] }, [
    card({
      title: 'Title',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis exercitation lobortis soluta eros labore nonumy labore aliquam diam eiusmod.',
      className: styles[`card${i}`],
    }),

    create('form', { class: styles[`form${i}`] }, [
      input({ label: 'Field 1' }),
      input({ label: 'Field 2', className: styles[`row${i}`] }),
      input({ label: 'Field 3', className: styles[`row${i}`] }),
      checkbox({ label: 'Checkbox', className: styles[`checkbox${i}`] }),
      create('div', { class: styles[`radios${i}`] }, [
        radio({ label: 'Radio 1', value: '1', name: 'radio' }),
        radio({ label: 'Radio 2', value: '2', name: 'radio' }),
      ]),
      divider({ class: styles[`hr${i}`] }),
      create('footer', { class: styles[`footer${i}`] }, [
        button({ type: 'reset' }, 'Reset'),
        button({ type: 'submit', class: styles[`submit${i}`] }, 'Submit'),
      ]),
    ]),
  ])
)));
