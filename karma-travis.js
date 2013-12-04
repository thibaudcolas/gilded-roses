module.exports = function(config) {
  config.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['jasmine'],
    files: [
      'src/gilded_rose.js',
      'spec/gilded_rose_spec.js'
    ],
    browsers: ['PhantomJS'],

    reporters: ['progress', 'coverage'],
    preprocessors: { 'src/gilded_rose.js': ['coverage'] },

    singleRun: true
  });
};
