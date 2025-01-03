import { run } from '../../src/helpers';

const obj = Array(7_500).fill(null)
  .map((_, i) => i)
  .reduce((acc, it) => {
    acc['a' + it] = it;
    return acc;
  }, {});

const obj2 = { ...obj };
Object.keys(obj2).forEach(key => {
  obj2[key] += 10;
});

run(
  125,
  function (i) {
    window.__testValue = {
      a0: i,
      a100: i + 100,
      a250: i + 250,
      ...obj,
      a500: i + 500,
      a2000: i + 2000,
      ...obj2,
      a10000: i + 10_000,
      a20000: i + 20_000,
    };
  },
);
