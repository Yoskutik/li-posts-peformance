import { create, CARDS_PER_PAGE } from '../utils';
import { button, card, checkbox, divider, input, radio } from '../design-system';

export default () => create('div', {}, Array.from({ length: CARDS_PER_PAGE }, (_, i) => (
  create('div', { class: 'flex border border-solid p-4' }, [
    card({
      title: 'Title',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis exercitation lobortis soluta eros labore nonumy labore aliquam diam eiusmod.',
      className: 'w-60',
    }),

    create('form', { class: 'flex flex-col ml-4 w-52' }, [
      input({ label: 'Field 1' }),
      input({ label: 'Field 2', className: 'mt-2' }),
      input({ label: 'Field 3', className: 'mt-2' }),
      checkbox({ label: 'Checkbox', className: 'mt-2 ml-auto' }),
      create('div', { class: 'mt-2 pl-2' }, [
        radio({ label: 'Radio 1', value: '1', name: 'radio' }),
        radio({ label: 'Radio 2', value: '2', name: 'radio' }),
      ]),
      divider({ class: 'w-full' }),
      create('footer', { class: 'flex justify-end' }, [
        button({ type: 'reset' }, 'Reset'),
        button({ type: 'submit', class: 'ml-2' }, 'Submit'),
      ]),
    ]),
  ])
)));
