var gulp = require('gulp'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	browserSync = require('browser-sync').create();

var	styleSheet = 'src/sass/main.scss';
var htmlSrc = 'src/pug/**/*.pug';
var jsSrc = 'src/js/**/*.js';


gulp.task('clean', function (){
	return gulp.src('build/**/*.*')
			.pipe(plugins.clean())
})

gulp.task('assets', function(){
	return gulp.src('src/assets/**/*.*')
		.pipe(gulp.dest('build/assets'))
});

gulp.task('sass', function (){
	return gulp.src(styleSheet)
			.pipe(sass())
			.pipe(gulp.dest('build/css'))
			.pipe(browserSync.stream());
})

gulp.task('js', function (){
	return gulp.src(jsSrc)
			.pipe(gulp.dest('build/js'))

});


gulp.task('html', function buildHTML(){

	return gulp.src(htmlSrc)
			.pipe(pug({
				pretty: true
			}))
			.pipe(gulp.dest('build/html'))


});

gulp.task('copyIndexForBrowserSync', function(){

	return gulp.src('/build/index.html')
			.pipe(gulp.dest('./index.html'));

});

gulp.task('build', function (){

	gulp.start(['sass', 'js', 'assets'], 'html');
});

gulp.task('serve', ['build'], function (){

	browserSync.init({
		server: {
			"baseDir": "./"
		}
	});

	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/pug/*.pug', ['html']);
	gulp.watch('build/html/*.html').on('change', browserSync.reload);
	gulp.watch('build/css/*.css').on('change', browserSync.reload);
});

gulp.task('browserBuild', function (){

	gulp.start(['build'], 'copyIndexForBrowserSync');
})

gulp.task('watch', function (){

	gulp.start(['build'], 'serve');
});

gulp.task('build-pdf', function (){
	gulp.start('sass', 'html', 'pdf');
});