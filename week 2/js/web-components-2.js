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

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(`
  .card {display: flex; flex-direction: column; border: 1px solid black; border-radius: 8px; padding: 20px; box-shadow: 0 0 1px 0 rgba(29, 35, 46, 0.30), 0 4px 14px 0 rgba(29, 35, 46, 0.10); margin: 10px}
  .card ::slotted(h3), .card h3 {font-size: 18px; line-height: 28px; margin: 0}
  .card .body {margin-top: 8px}
  .card footer {display: flex; justify-content: flex-end; border-top: 1px solid grey; padding-top: 20px; margin-top: auto}
  .card .button{border-radius: 4px;padding: 6px 12px;font-weight: 600;border: 0}
  .card .button-secondary{background-color: rgba(44, 51, 67, 0.05);color: rgb(13, 115, 255)}
  .card .button-primary{background-color: rgb(13, 115, 255);margin-left: 8px;color: white}
`);

class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const card = create('article', { class: 'card' });
    const title = create('h3', { class: 'h3' }, create('slot', { name: 'title' }));
    const description = create('p', {}, create('slot', { name: 'description' }));

    card.append(
      create('header', {}, title),

      create('div', { class: 'body' }, [
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
        description,
      ]),

      create('footer', {}, [
        create('button', { class: 'button button-secondary' }, 'Compare'),
        create('button', { class: 'button button-primary' }, 'Buy'),
      ]),
    );

    this.shadowRoot.append(card);
    this.shadowRoot.adoptedStyleSheets = [stylesheet];
  }
}

customElements.define('card-component', CardComponent);

document.body.prepend(
  create(
    'main',
    { style: 'display: grid; grid-template-columns: repeat(auto-fill, 300px); font-size: 14px; line-height: 20px' },
    Array.from({ length: 20_000 }).map((_, i) => (
      create('card-component', {}, [
        create('h3', { slot: 'title' }, `Card title ${i + 1}`),
        create('p', { slot: 'description' }, 'Diam cupiditat laboris feugait duo obcaecat gubergren nonummy sea aliquid fugiat eum euismod dignissim lobortis quis tation lobortis.'),
      ])
    )),
  ),
);
