import { create } from './utils';
import styles from './design-system.module.scss';

const createComponent = (name, baseClassName) => (attrs = {}, children) => create(name, {
  ...attrs,
  class: `${attrs.class || ''} ${baseClassName}`.trim()
}, children);

export const heading = {
  h1: createComponent('h1', styles.h1),
  h2: createComponent('h2', styles.h2),
  h3: createComponent('h3', styles.h3),
};

export const paragraph = createComponent('p', styles.p);

export const button = createComponent('button', styles.button);

export const link = createComponent('a', styles.a);

export const divider = createComponent('hr', styles.hr);

export const input = ({ className, label, ...rest }) => (
  create('label', { class: `${styles.inputWrapper} ${className || ''}`.trim() }, [
    create('span', { class: styles.inputLabel }, label),
    create('input', { ...rest, class: styles.inputInput }),
  ])
);

export const checkbox = ({ className, label, ...rest }) => (
  create('label', { class: `${styles.checkboxWrapper} ${className || ''}`.trim() }, [
    create('input', { class: styles.checkboxCheckbox, ...rest, type: 'checkbox' }),
    create('span', { class: styles.inputLabel }, label)
  ])
);

export const radio = ({ className, label, ...rest }) => (
  create('label', { class: `${styles.checkboxWrapper} ${className || ''}`.trim() }, [
    create('input', { class: styles.checkboxCheckbox, ...rest, type: 'radio' }),
    create('span', { class: styles.inputLabel }, label)
  ])
);

export const card = ({ className, title, body }) => (
  create('section', { class: `${styles.card} ${className || ''}`.trim() }, [
    heading.h3({}, title),
    divider(),
    paragraph({}, body),
    divider(),
    create('footer', { class: styles.cardFooter }, [
      link({}, 'More link'),
      button({}, 'Read More'),
    ]),
  ])
)
