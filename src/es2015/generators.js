import { run } from '../helpers';

function* createGenerator() {
  var i = 0;
  while (true) yield i++;
}

const generator = createGenerator();

run(
  40_000_000,
  function () {
    window.__testValue = generator.next().value;
  },
);
