const { series, src, dest, watch } = require('gulp');

const del = require('del');
const postcss = require('gulp-postcss');
const px2rem = require('postcss-px2rem');

// css
function copyCss() {
	const processors = [px2rem({remUnit: 75})];
	return src('./cssPhone/**/*.css')
		.pipe(postcss(processors))
		.pipe(dest('./rem'))
}

// 删除dist文件
function delFn(cb) {
	return del([
		'./rem/**/*.css',
	], cb)
}


// 监听任务
function watchFn() {
	watch(['./cssPhone/**/*.css'], series(delFn, copyCss));
}

// 开发环境
function defaultTask() {
	setTimeout(() => {
		watchFn();
	}, 1500);
	return series(delFn, copyCss);
}

// 生产环境
function buildTask() {
	return series(delFn, copyCss);
}

exports.default = defaultTask();
exports.build = buildTask();