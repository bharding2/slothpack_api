const gulp = require('gulp');
const webpack = require('webpack-stream');
const webp = require('webpack');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const childProcess = require('child_process');
const angularProtractor = require('gulp-angular-protractor');
const KarmaServer = require('karma').Server;

var apiFiles = ['./*.js', './lib/*.js', './models/*.js', './routes/*.js'];
var specFiles = ['./test/**/*spec.js'];
var testFiles = ['./test/*test.js'];
var unitFiles = ['./test/unit/**/*test.js'];
var appFiles = ['./app/**/*.js'];

var children = [];

gulp.task('startservers:test', () => {
  process.env.BUILD_PORT = 5525;
  process.env.PORT = 5505;
  const mongoURI = 'mongodb://localhost/slothbearTestDB';
  children.push(childProcess.fork('build_server.js'));
  children.push(childProcess.spawn('mongod', ['--dbpath=./db']));
  children.push(childProcess.fork('server.js', [], { env:
    { MONGODB_URI: mongoURI, PORT: 5505 }
  }));
});

gulp.task('webpack:dev', ['html:dev', 'css:dev'], () => {
  return gulp.src('app/js/entry.js')
    .pipe(webpack({
      output: {
        devtool: 'source-map',
        filename: 'bundle.js'
      },
      plugins: [
        new webp.EnvironmentPlugin([
          'PORT'
        ])
      ]
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', () => {
  return gulp.src('test/unit/test_entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('html:dev', () => {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', () => {
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('test:mocha', () => {
  return gulp.src('./test/*test.js')
    .pipe(mocha());
});

gulp.task('test:karma', ['webpack:test'], (done) => {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:protractor', ['startservers:test', 'build:dev'], () => {
  return gulp.src(['./test/integration/**/*spec.js'])
    .pipe(angularProtractor({
      'configFile': './test/integration/config.js',
      'debug': true,
      'autoStartStopServer': true
    }))
    .on('error', () => {
      children.forEach((child) => {
        child.kill('SIGTERM');
      });
      setTimeout(() => {
        process.env.PORT = 5555;
        gulp.start('build:dev');
      }, 2000);
    })
    .on('end', () => {
      children.forEach((child) => {
        child.kill('SIGTERM');
      });
      setTimeout(() => {
        process.env.PORT = 5555;
        gulp.start('build:dev');
      }, 2000);
    });
});

gulp.task('lint:api', () => {
  return gulp.src(apiFiles)
    .pipe(eslint('./.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:test', () => {
  return gulp.src(testFiles)
    .pipe(eslint('./.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:app', () => {
  return gulp.src(appFiles)
    .pipe(eslint('./app/.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:spec', () => {
  return gulp.src(specFiles)
  .pipe(eslint('./test/integration/.eslintrc.json'))
  .pipe(eslint.format());
});

gulp.task('lint:unit', () => {
  return gulp.src(unitFiles)
  .pipe(eslint('./test/unit/.eslintrc.json'))
  .pipe(eslint.format());
});

gulp.task('build:dev', ['webpack:dev']);
// gulp.task('test', ['test:mocha', 'test:karma'], () => {
gulp.task('test', ['test:mocha'], () => {
  gulp.start('test:protractor');
});
// gulp.task('test', ['test:mocha', 'test:karma']);

gulp.task('lint', ['lint:api', 'lint:test', 'lint:app', 'lint:spec', 'lint:unit']);

gulp.task('default', ['lint', 'test']);
