import { run } from '../../src/helpers';

const AMOUNT = 10_000;

const level0Classes = Array(AMOUNT).fill(null).map((_, i) => (
  class {
    constructor() {
      window.__testValue = 'class0' + i;
    }

    method0() {
      window.__testValue = 'method0' + i;
    }
  }
));

const level1Classes = Array(AMOUNT).fill(null).map((_, i) => (
  class extends level0Classes[i] {
    constructor() {
      super();
      window.__testValue = 'class1' + i;
    }
  }
));

const level2Classes = Array(AMOUNT).fill(null).map((_, i) => (
  class extends level1Classes[i] {
    constructor() {
      super();
      window.__testValue = 'class2' + i;
    }

    method2() {
      window.__testValue = 'method2' + i;
      this.method0();
    }
  }
));

run(
  2_000_000,
  function (i) {
    new level2Classes[i % level2Classes.length]().method2();
  },
);
