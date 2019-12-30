const { series, src, dest, watch } = require('gulp');

const del = require('del');

const htmlmin = require('gulp-htmlmin');

const imagemin = require('gulp-imagemin');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cleanCss = require('gulp-clean-css');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const connect = require('gulp-connect');

// 删除dist文件
function delFn(cb) {
	return del([
		'./dist/*.html',
		'./dist/css/*',
		'./dist/img/*',
		'./dist/js/*'
	], cb)
}

// html
function copyhtml() {
	return src('./src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest('./dist'))
}

// img
function copyImg() {
	return src('./src/img/*')
		.pipe(imagemin())
		.pipe(dest('./dist/img'))
}

// css
function copyCss() {
	return src('./src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(dest('./dist/css'))
}
function copyCss2() {
	return src('./dist/css/*.css')
		.pipe(cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(dest('./dist/css'))
}

// js
function copyJs() {
	return src('./src/js/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(dest('./dist/js'))
}
function copyJs2() {
	return src('./dist/js/*.js')
		.pipe(uglify())
		.pipe(dest('./dist/js'))
}

// 本地服务器
function devServer() {
	return connect.server({
		root: 'dist/',
		port: 8003,
		host: '0.0.0.0',
		livereload: true
	})
}

// 服务器重加载
function serverReload() {
	return src(['./src/*.html', './src/img/*', './src/scss/*.scss', './src/js/*.js'])
		.pipe(connect.reload());
}


// 监听任务
function watchFn() {
	watch(['./src/*.html', './src/img/*', './src/scss/*.scss', './src/js/*.js'], series(delFn, copyhtml, copyImg, copyCss, copyJs, serverReload));
}

// 开发环境
function defaultTask() {
	setTimeout(() => {
		watchFn();
	}, 1500);
	return series(delFn, copyhtml, copyImg, copyCss, copyJs, devServer);
}

// 生产环境
function buildTask() {
	return series(delFn, copyhtml, copyImg, copyCss, copyJs, copyCss2, copyJs2);
}


exports.default = defaultTask();
exports.build = buildTask();
