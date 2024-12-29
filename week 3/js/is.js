import styles from './is.module.scss';

const create = (name, params, children) => {
  const element = document.createElement(name);

  Object.entries(params).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (children) {
    element.append(...(Array.isArray(children) ? children.filter(Boolean) : [children]));
  }

  return element;
};

document.body.prepend(
  create('main', { class: styles.main }, Array.from({ length: 20_000 }).map((_, i) => (
    create('article', { class: styles.article }, [
      create('header', {}, create('h3', { class: styles.h3 }, `Card title ${i + 1}`)),

      create('div', { class: styles.body }, [
        create(
          'table',
          {},
          create(
            'tbody',
            {},
            Array.from({ length: 5 }).map((_, i) => (
              create('tr', {}, [
                create('th', {}, `Field ${i + 1}`),
                create('td', {}, `Description ${i + 1}`),
              ])
            )),
          ),
        ),
        create('p', {}, 'Diam cupiditat laboris feugait duo obcaecat gubergren nonummy sea aliquid fugiat eum euismod dignissim lobortis quis tation lobortis.'),
      ]),

      create('footer', { class: styles.footer }, [
        create('button', { class: `${styles.button} ${styles.buttonSecondary}` }, 'Compare'),
        create('button', { class: `${styles.button} ${styles.buttonPrimary}` }, 'Buy'),
      ]),
    ])
  ))),
);

document.body.querySelectorAll('script').forEach(it => it.remove());
