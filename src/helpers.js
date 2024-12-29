const params = new URLSearchParams(location.search);

const endUpRun = (statedAt) => {
  const diff = new Date().getTime() - statedAt.getTime();

  const match = location.href.match(/:\d+\/(.+)\.html/);

  fetch('/execution', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      sessionId: params.get('sessionId'),
      browser: params.get('browser'),
      feature: match[1],
      duration: diff,
    }),
  }).then(() => {
    window.close();
  });
};

export const run = (n, cb) => {
  const now = new Date();
  for (let i = 0; i < n; i++) {
    cb(i);
  }

  endUpRun(now);
};

export const runAsync = (n, cb) => {
  const now = new Date();
  Promise
    .all(Array(n).fill(null).map((_, i) => cb(i)))
    .then(() => endUpRun(now));
};
