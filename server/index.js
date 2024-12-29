const {execSync, exec} = require('child_process');
const {SingleBar} = require('cli-progress');
const express = require('express');
const fse = require('fs-extra');
const glob = require('glob');
const os = require('os');

const commands = require('./commands.json')[process.platform];
const {logger} = require('./logger');
const {args} = require('./arguments');

const ip = Object.values(os.networkInterfaces())
  .flat()
  .filter((details) => details.family === 'IPv4' && !details.internal)[0].address;

const browsers = Object.keys(commands.start);
const sessionId = `${Math.random()}${Date.now()}`;

const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms));

let data = {};
let files = glob.sync(`./${args.dir}/build/*.html`)
  .map(it => it.replace(/(.+build)/, ''))
  .sort((a, b) => a.localeCompare(b));

if (args.update_method) {
  data = fse.readJsonSync(`${args.dir}/build/results.json`);

  Object.keys(data).forEach(feature => {
    Object.keys(data[feature]).forEach(browsers => {
      args.update_method.forEach(method => {
        data[feature][browsers][method] = [];
      });
    });
  });

  files = files.filter(file => args.update_method.some(method => file.includes(method)));
}

if (args.update_feature) {
  data = fse.readJsonSync(`${args.dir}/results/results.json`);

  args.update_feature.forEach(feature => {
    Object.keys(data[feature]).forEach(browser => {
      Object.keys(data[feature][browser]).forEach(method => {
        data[feature][browser][method] = [];
      });
    });
  });

  files = files.filter(file => args.update_feature.some(method => file.includes(method)));
}

let browsersIndex = 0;
let fileIndex = 0;
let passes = 0;
let progress;
let runBrowserTimeout;
let mobileDriver;

const runBrowser = async () => {
  const file = files[fileIndex];
  const browser = browsers[browsersIndex];
  const command = commands.start[browser];

  logger.info(`Opens browser: ${browser}, file: ${file}, iter: ${passes}/${args.iterations}`);
  const url = `http://${ip}:${args.port}${file}?browser=${browser}&delay=${args.delay}&sessionId=${sessionId}&_ts=${Date.now()}`;
  clearTimeout(runBrowserTimeout);

  execSync(command.replace('{{URL}}', url));
  logger.info(command.replace('{{URL}}', url));
  await sleep(args.delay);

  // Rerun test after 1.5 minutes if it's for some reason failed
  runBrowserTimeout = setTimeout(runBrowser, 1_000 * 30);
};

const makeIteration = async () => {
  if (passes === 0 || passes >= args.iterations) {
    if (passes >= args.iterations) {
      passes = 0;

      fileIndex++;
      progress.update(fileIndex * args.iterations + passes);
      if (fileIndex === files.length) {
        progress.stop();
        execSync(commands.kill[browsers[browsersIndex]]);
        logger.info(`Previous browser ${browsers[browsersIndex]} was killed`);
        browsersIndex++;
        fileIndex = 0;
      }

      if (browsersIndex === browsers.length) {
        console.timeEnd('Benchmark is done');
        logger.info('Done!');

        function median(values) {
          values = [...values].sort((a, b) => a - b);
          const half = Math.floor(values.length / 2);
          return (values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2);
        }

        for (const feature in data) {
          let csv = `x,${browsers.join(',')}\n`;
          csv += `1,${browsers.map(it => median(data[feature][it].map(it => 1000 / it)).toFixed(3)).join(',')}\n`;
          csv += `2,${browsers.map(it => median(data[feature][it])).join(',')}\n`;
          fse.outputFileSync(`${args.dir}/results/${feature}.csv`, csv);
        }

        process.exit(0);
      }
    }

    if (fileIndex % files.length === 0 && passes === 0) {
      progress = new SingleBar({
        format: `${browsers[browsersIndex].padEnd(8)}[{bar}] {percentage}% | ETA: {eta}s | {value}/{total}`,
      });
      progress.start(files.length * args.iterations, 0);

      try {
        execSync(commands.kill[browsers[browsersIndex]]);
        logger.info(`Current browser ${browsers[browsersIndex]} was killed`);
      } catch {}
      execSync(commands.prepare[browsers[browsersIndex]]);
      logger.info(`Current browser ${browsers[browsersIndex]} was prepared`);
    }
  }

  const progressIndex = fileIndex * args.iterations + passes++;
  progressIndex > 0 && progress.update(progressIndex);

  setTimeout(runBrowser, args.delay);
};

const app = express();

app.use(express.json());
app.use(express.static(`${args.dir}/build`));

app.post('/execution', async (req, res) => {
  const {browser, feature, results, duration, sessionId: reqSessionId} = req.body;

  if (sessionId !== reqSessionId) {
    res.status(400);
    res.send('Unknown session');
    logger.error('Got unknown session');
    return;
  }

  data[feature] ||= {};
  data[feature][browser] ||= [];
  data[feature][browser].push(parseInt(duration));

  fse.outputFileSync(`${args.dir}/results/results.json`, JSON.stringify(data, undefined, 2));

  res.sendStatus(200);

  commands.closeTab?.[browser] && execSync(commands.closeTab?.[browser]);

  makeIteration();
});

app.listen(args.port, () => {
  console.log(`Running benchmark  on port ${args.port}:`);
  console.time('Benchmark is done');
  makeIteration();
});
