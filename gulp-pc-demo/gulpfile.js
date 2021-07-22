'use strict';

const { series, src, dest, watch } = require('gulp');

const del = require('del');

const htmlmin = require('gulp-htmlmin');

const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const connect = require('gulp-connect');

const { createProxyMiddleware } = require('http-proxy-middleware');


// 删除dist文件
function delFn(cb) {
	return del([
		'./dist/views/*.html',
		'./dist/css/*',
		'./dist/img/*',
		'./dist/js/*'
	], cb)
}

// html
function copyhtml() {
	return src('./src/views/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest('./dist/views'))
}

// img
function copyImg() {
	return src('./src/images/*.{png,jpg,gif,ico}')
		// .pipe(imagemin())
		.pipe(dest('./dist/images'))
}

// css
function copyCss() {
	return src('./src/less/*.less')
		.pipe(less())
		.pipe(dest('./dist/css'))
}
function uglifyCss() {
	return src('./dist/css/*.css')
		.pipe(cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(dest('./dist/css'))
}

// js
function copyJs() {
	return src('./src/js/**/*.js')
		// .pipe(babel({
		// 	presets: ['@babel/env']
		// }))
		.pipe(babel())
		.pipe(dest('./dist/js'))
}
function uglifyJs() {
	return src('./dist/js/*.js')
		.pipe(uglify())
		.pipe(dest('./dist/js'))
}

// 本地服务器
function devServer() {
	return connect.server({
		root: 'dist/',
		port: 8000,
		host: '127.0.0.1',
		middleware: function (connect, opt) {
			return [
				createProxyMiddleware('/api', {
					target: 'https://cnodejs.org/api/v1',
					changeOrigin: true,
					pathRewrite: {
						'^/api': ''
					},
					ws: true
				}),
			]
		},
		livereload: true
	})
}

// 服务器重加载
function serverReload() {
	return src(['./src/views/*.html', './src/img/*', './src/less/*.less', './src/js/*.js'])
		.pipe(connect.reload());
}


// 监听任务
function watchFn() {
	watch(['./src/views/*.html', './src/img/*', './src/less/*.less', './src/js/*.js'], series(delFn, copyhtml, copyImg, copyCss, copyJs, serverReload));
}

if (process.env.NODE_ENV === 'development') {
	watchFn()
}

// 开发环境
function devTask() {
	return series(delFn, copyhtml, copyImg, copyCss, copyJs, devServer);
}

// 生产环境
function buildTask() {
	return series(delFn, copyhtml, copyImg, copyCss, copyJs, uglifyCss, uglifyJs);
}


exports.dev = devTask();
exports.build = buildTask();
