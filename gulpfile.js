var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'),
	livereload = require('gulp-livereload'),
	spritesmith = require('gulp.spritesmith'),
	imagemin = require('gulp-imagemin'),
	notify = require("gulp-notify");
	concat = require('gulp-concat');

// Scalanie plików js w jeden
gulp.task('concat', function() {
	return gulp.src('*.js')
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('js'))
		.pipe(notify("Pliki js zostały scalone"));
});

// Kompresja plików js
gulp.task('scripts', function () {
	gulp.src('*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('js'))
		.pipe(notify("Kompresja plików js OK"));
});

// Kompresja obrazków
gulp.task('images', function () {
	gulp.src('dev/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('images'))
		.pipe(notify("Kompresja obrazków OK"));
});

//Tworzenie Sprite'k
gulp.task('sprite', function () {
	var spriteData = gulp.src('*.png')
		.pipe(spritesmith({
			imgName: 'images/sprite.png',
			cssName: '_sprite.scss',
			padding: 20,
			algorithm: 'left-right'
		}));
	spriteData.img.pipe(gulp.dest('images'));
	spriteData.css.pipe(gulp.dest('sass'))
		.pipe(notify("Utworzono plik sprite"));
});

// Kompresja plików scss
gulp.task('styles', function () {
	gulp.src('sass/style.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			// includePaths: require('node-neat').with('other/path', 'another/path')
			includePaths: require('node-bourbon').includePaths,
			outputStyle: 'compressed'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('css'))
		.pipe(notify({
			message: "Kompresja plików sass do css OK",
			onLast: true
		}))
		.pipe(livereload({
			start: true
		}));
});

// Watch
gulp.task('watch', function () {

	var server = livereload.listen();

	gulp.watch('*.js', ['scripts']);
	gulp.watch('sass/*.scss', ['styles']);
	gulp.watch('css/*.css', livereload.reload);
	gulp.watch('index.html', livereload.reload);
	gulp.watch('img/*', ['images']);
	gulp.watch('icons/*.png', ['sprite']);
});

gulp.task('default', ['styles', 'watch']);
gulp.task('production', ['concat', 'scripts', 'images', 'sprite']);
'use strict';
 
// var gulp = require('gulp');
// var bourbon = require('node-bourbon').includePaths;
// var sass = require('gulp-sass');
// gulp.task('sass', function() {
//   gulp.src('./scss/**/*.scss')
//   	.pipe(sass().on('error', sass.logError))
//       .pipe(sass({
//         includePaths: bourbon
//       }))
//       .pipe(gulp.dest('./css'))
// });

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });

// gulp.task('default', ['sass']);


