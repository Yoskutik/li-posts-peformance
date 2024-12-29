export const CARDS_PER_PAGE = 5000;

export const create = (name, params, children) => {
  const element = document.createElement(name);

  Object.entries(params).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (children) {
    element.append(...(Array.isArray(children) ? children.filter(Boolean) : [children]));
  }

  return element;
};
