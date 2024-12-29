import { run } from '../../src/helpers';

const args = Array(100_000).fill(null).map(() => (
  Array(14).fill(null).map((_, i) => i)
));

const fns = Array(100_000).fill(null).map(() => (
  function(a0,  a1,  a2, a3,  a4,  a5, a6,  a7,  a8, a9,  a10, a11, a12, a13, a14) {
    window.__testValue = a0 + a5 + a10 + a14;
  }
));

run('' +
  10_000_000,
  function (i) {
    fns[i % fns.length](i, ...args[i % args.length]);
  },
);
