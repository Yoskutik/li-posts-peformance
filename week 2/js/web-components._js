import styles from './styles.module.scss';

const create = (name, params, children) => {
  const element = document.createElement(name);

  Object.entries(params).forEach(([key, value]) => {
    element[key] = value;
  });

  element.append(...(Array.isArray(children) ? children : [children]));

  return element;
};

document.body.prepend(
  create(
    'main',
    {
      // style: 'display: grid; grid-template-columns: repeat(auto-fill, 300px); font-size: 14px; line-height: 20px',
      className: styles.main,
    },
    Array.from({ length: 20_000 }).map((_, i) => (
      create(
        'article',
        {
          // style: 'display: flex; flex-direction: column; border: 1px solid black; border-radius: 8px; padding: 20px; box-shadow: 0 0 1px 0 rgba(29, 35, 46, 0.30), 0 4px 14px 0 rgba(29, 35, 46, 0.10); margin: 10px',
          className: styles.article,
        },
        [
          create(
            'header',
            {},
            create(
              'h3',
              {
                // style: "font-size: 18px; line-height: 28px; margin: 0"
                className: styles.h3
              },
              `Card title ${i + 1}`),
          ),

          create(
            'div',
            {
              // style: "margin-top: 8px",
              className: styles.body,
            },
            [
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
            ],
          ),

          create(
            'footer',
            {
              // style: 'display: flex; justify-content: flex-end; border-top: 1px solid grey; padding-top: 20px; margin-top: auto',
              className: styles.footer,
            },
            [
              create(
                'button',
                {
                  // style: 'color: rgb(13, 115, 255); background-color: rgba(44, 51, 67, 0.05); border-radius: 4px; padding: 6px 12px; font-weight: 600; border: 0',
                  className: `${styles.button} ${styles.buttonSecondary}`,
                },
                'Compare',
              ),
              create(
                'button',
                {
                  // style: 'margin-left: 8px; color: white; background-color: rgb(13, 115, 255); border-radius: 4px; padding: 6px 12px; font-weight: 600; border: 0',
                  className: `${styles.button} ${styles.buttonPrimary}`,
                },
                'Compare',
              ),
            ],
          ),
        ],
      )
    )),
  ),
);

document.querySelectorAll('body script').forEach(it => it.remove());
