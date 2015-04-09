"use strict";

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-minify-css');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const less = require('gulp-less');
const del = require('del');
const coveralls = require('gulp-coveralls');
const karma = require('karma').server;

const babel = require('gulp-babel');

const _developmentDir = './client/dev/';
const _distributionDir = './client/dist/';

const _images = _developmentDir + 'img/*';
const _fonts = _developmentDir + 'fonts/*';
const _partials = _developmentDir + 'partials/**/*';
const _components = _developmentDir + 'components/**/*';

const _indexHTML = _developmentDir + 'index.html';

gulp.task('build:esnext', function()
{
    return gulp.src(['**/*.es6', '!node_modules/**'])
               .pipe(babel({optional: ["es7.decorators"]}))
               .pipe(gulp.dest('.'));
});

gulp.task('watch:esnext', ['build:esnext'], function()
{
    return gulp.watch('**/*.es6', ['build:esnext']);
});

gulp.task('build', ['del_dist', 'unit_test'], function()
{
    gulp
        .src(_indexHTML)
        .pipe(usemin({js0: [rev(), uglify()], js1: [rev(), uglify()], css0: [cssmin(), rev(), less()]}))
        .pipe(gulp.dest(_distributionDir));

    gulp
        .src(_images)
        .pipe(gulp.dest(_distributionDir + 'img/'));

    gulp
        .src(_partials)
        .pipe(gulp.dest(_distributionDir + 'partials/'));

    gulp
        .src(_fonts)
        .pipe(gulp.dest(_distributionDir + 'fonts/'));

    gulp
        .src(_components)
        .pipe(gulp.dest(_distributionDir + 'components/'));
});

gulp.task('del_dist', function()
{
    return del([_distributionDir]);
})

gulp.task('unit_test', function(done)
{
    karma
        .start({
            configFile: __dirname + '/karma.conf.js',
            browsers: ['PhantomJS'],
            singleRun: true
        }, done);
})

gulp.task('coverage_frontend', ['unit_test'], function()
{
    gulp
        .src('unit_coverage/**/lcov.info')
        .pipe(coveralls());
})