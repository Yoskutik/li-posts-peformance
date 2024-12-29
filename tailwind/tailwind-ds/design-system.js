import { create } from './utils';

const createComponent = (name, baseClassName) => (attrs = {}, children) => create(name, {
  ...attrs,
  class: `${attrs.class || ''} ${baseClassName}`.trim()
}, children);

export const heading = {
  h1: createComponent('h1', 'text-3xl font-bold text-gray-900'),
  h2: createComponent('h2', 'text-2xl font-semibold text-gray-800'),
  h3: createComponent('h3', 'text-xl font-medium text-gray-700'),
};

export const paragraph = createComponent('p', 'text-base text-gray-700');

export const button = createComponent('button', 'bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer  active:relative active:top-[1px]');

export const link = createComponent('a', 'text-blue-500 hover:text-blue-700 underline cursor-pointer active:relative active:top-[1px]');

export const divider = createComponent('hr', 'my-2 border-gray-300');

export const input = ({ className, label, ...rest }) => (
  create('label', { class: `block text-sm font-medium text-gray-700 ${className || ''}`.trim() }, [
    create('span', { class: 'text-gray-700' }, label),
    create('input', { ...rest, class: 'mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' }),
  ])
);

export const checkbox = ({ className, label, ...rest }) => (
  create('label', { class: `flex items-center cursor-pointer ${className || ''}`.trim() }, [
    create('input', { class: 'h-4 w-4 text-blue-500 border-gray-300 mr-1', ...rest, type: 'checkbox' }),
    create('span', { class: 'text-gray-700' }, label)
  ])
);

export const radio = ({ className, label, ...rest }) => (
  create('label', { class: `flex items-center cursor-pointer ${className || ''}`.trim() }, [
    create('input', { class: 'h-4 w-4 text-blue-500 border-gray-300 mr-1', ...rest, type: 'radio' }),
    create('span', { class: 'text-gray-700' }, label)
  ])
);

export const card = ({ className, title, body }) => (
  create('section', { class: `max-w-sm rounded-lg border border-gray-200 shadow-md p-4 ${className || ''}`.trim() }, [
    heading.h3({}, title),
    divider(),
    paragraph({}, body),
    divider(),
    create('footer', { class: 'flex justify-between' }, [
      link({}, 'More link'),
      button({}, 'Read More'),
    ]),
  ])
)
