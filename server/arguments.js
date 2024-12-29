const { ArgumentParser } = require('argparse');

const { version } = require('../package.json');

const parser = new ArgumentParser({
  description: 'EcmaScript Syntax Features Benchmark',
});

parser.add_argument('-v', '--version', {
  action: 'version',
  version,
});

parser.add_argument('-p', '--port', {
  help: 'port to run benchmark at',
  default: 8080,
  type: Number,
});

parser.add_argument('-d', '--delay', {
  help: 'delay between test iterations',
  default: 350,
  type: Number,
});

parser.add_argument('-D', '--dir', {
  help: 'directory',
  required: true,
  type: String,
});

parser.add_argument('-n', '--iterations', {
  help: 'amount of iteration for each test',
  default: 25,
  type: Number,
});

parser.add_argument('--update-method', {
  help: 'methods to update in already generated results.json file',
  action: 'append',
});

parser.add_argument('--update-feature', {
  help: 'methods to update in already generated results.json file',
  action: 'append',
});

const args = parser.parse_args();

module.exports = { args };
