gilded-roses
============

[![Build Status](https://img.shields.io/travis/ThibWeb/gilded-roses.svg?style=flat-square)](https://travis-ci.org/ThibWeb/gilded-roses) [![devDependency Status](https://img.shields.io/david/dev/ThibWeb/gilded-roses.svg?style=flat-square)](https://david-dm.org/ThibWeb/gilded-roses) [![Code Climate](https://img.shields.io/codeclimate/github/ThibWeb/gilded-roses.svg?style=flat-square)](https://codeclimate.com/github/ThibWeb/gilded-roses) [![Coverage](https://img.shields.io/codeclimate/coverage/github/ThibWeb/gilded-roses.svg?style=flat-square)](https://codeclimate.com/github/ThibWeb/gilded-roses/coverage)


> A refactoring kata, originally from [Emily Bache](https://github.com/emilybache/Refactoring-Katas), to execute during a [Coding Dojo](http://codingdojo.org/).

Testing stack taken from http://onsen.io/blog/mocha-chaijs-unit-test-coverage-es6/:

- [Mocha](https://mochajs.org/)
- [Chai](http://chaijs.com/)
- [Isparta](https://github.com/douglasduteil/isparta)
- [Babel](https://babeljs.io/)

## Setup

```sh
git clone https://github.com/ThibWeb/gilded-roses.git
cd gilded-roses/
nvm install
npm install
npm install -g eslint eslint-config-airbnb eslint-plugin-react babel-eslint
```

## Doing the kata

```sh
# Run the tests with a watcher
npm start
# Run the coverage
npm run coverage
open coverage/lcov-report/index.html
# Run the linting
npm run lint
```
