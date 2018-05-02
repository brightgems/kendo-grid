const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const tsProject = tsc.createProject("tsconfig.json");
var replace = require('gulp-string-replace');
// import scss tasks
const gulpSass = require('gulp-sass');
const gulpIf = require('gulp-if');
const gulpCleanCss = require('gulp-clean-css');
import {join} from 'path';

var app={
	srcPath:"src/",     /*源码目录*/
	devPath:"build/",   /*开发环境目录*/
	prdPath:"dist/" 	/*生产环境目录*/
};



/**
 * Used only in build automation tools to tokenize the config file.
 */
gulp.task('tokenizeConfig', function() {
    gulp.src(["./build/app/config/config.js"]) // Every file allown.
        .pipe(replace('http://test-mobilizie-api.azurewebsites.net/', '__APIPath__'))
        .pipe(gulp.dest('./build/app/config',{overwrite:true}))
});


/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["build"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", () => {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest("build"));
});


/**
 * Copy all sass and compile css files into build directory.
 */
gulp.task("sass", () => {
    return gulp.src(join(app.srcPath, '**/*.scss'))
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulpCleanCss())
        .pipe(gulp.dest(app.devPath));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/app/image/**","src/app/image"])
        .pipe(gulp.dest("build"));
});

//html
gulp.task("html", () => {
    return gulp.src(["src/**/*.html"])
        .pipe(gulp.dest("build"));
});


/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
        'core-js/client/shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'powerbi-client/dist/powerbi.js',
        '@angular/**/*.umd.js',
        '@angular/**/*.umd.js.map',
        'angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
        '@progress/kendo-*/dist/cdn/js/*.js',
        'hammerjs/hammer.min.js',
        'rxjs/**/*.js',
		'jquery/dist/jquery.min.js',
        'zone.js/dist/**',
		'rxjs/**/*.js',
        'ng2-slim-loading-bar/bundles/index.umd.js',
        'ng2-slim-loading-bar/**/*.css',
        'bootstrap/dist/**',
        '@telerik/kendo-theme-bootstrap/dist/all.css',
        '@telerik/kendo-theme-default/dist/all.css',
		'tslib/tslib.js'
    ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });

    gulp.watch(["src/**/*.html"], ['html']).on('change', function (e) {
        console.log('html file ' + e.path + ' has been changed. Updating.');
    });
    gulp.watch(["src/**/*.scss","src/**/*.css"], ['sass']).on('change', function (e) {
        console.log('css file ' + e.path + ' has been changed. Updating.');
    });
    gulp.watch(["src/app/img/**"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });

});

gulp.task('templates', function(){
    gulp.src(['file.txt'])
        .pipe(replace(/foo(.{3})/g, '$1foo'))
        .pipe(gulp.dest('build/file.txt'));
});


/**
 * Build the project.
 */
gulp.task("build", ['compile', 'resources','html', 'libs','sass'], () => {
    console.log("Building the project ...");
});