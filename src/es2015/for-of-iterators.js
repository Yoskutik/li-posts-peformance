import { run } from '../helpers';

const arr = Array(1000).fill(0);

run(
  200_000,
  function () {
    for (var val of arr) {
      window.__testValue = val;
    }
  },
);
