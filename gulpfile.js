var syntax        		= 'scss', // Syntax: sass or scss;
	gulpversion   		= '4'; // Gulp version: 3 or 4

	var gulp          	= require('gulp'),
		gutil         	= require('gulp-util' ),
		sass          	= require('gulp-sass'),
		webp 			= require('gulp-webp'),
		browserSync   	= require('browser-sync'),
		concat        	= require('gulp-concat'),
		uglify        	= require('gulp-uglify'),
		uglifyes 		= require('gulp-uglifyes'),
		cleancss      	= require('gulp-clean-css'),
		rename        	= require('gulp-rename'),
		del            	= require('del'),
		cache          	= require('gulp-cache'),
		autoprefixer  		= require('gulp-autoprefixer'),
		notify        		= require('gulp-notify'),
		imagemin      		= require('imagemin'),
		imageminWebp 		= require('imagemin-webp'),
		responsive 			= require('gulp-responsive'),
		imageminJpegtran 	= require('imagemin-jpegtran'),
		imageminJpegoptim 	= require('imagemin-jpegoptim'),
		imageminPngquant 	= require('imagemin-pngquant'),
		fileinclude    		= require('gulp-file-include'),
		gulpRemoveHtml 		= require('gulp-remove-html'),
		bourbon       		= require('node-bourbon'),
		ftp           		= require('vinyl-ftp'),
		gulpIf 				= require('gulp-if'),
		rsync         		= require('gulp-rsync'),
		babel 				= require('gulp-babel');

/* gulp.task('headersass', function() {
	return gulp.src('app/header.scss')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.reload({stream: true}))
});
 */
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/modernizr/modernizr-custom.js',
		'app/libs/wow/dist/wow.min.js',
		'app/libs/swiper/swiper.min.js',
		'app/js/common.js',
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglifyes())
	.pipe(gulp.dest('app/js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ 
		stream: true,
	}))
});

gulp.task('build', function(done) {

	var removedist = del.sync('dist');

	var buildhtml = gulp.src('app/*.html')
	    .pipe(fileinclude({
	      prefix: '@@'
	    }))
	    .pipe(gulpRemoveHtml())
	    .pipe(gulp.dest('dist'));
	
	var buildCss = gulp.src([
		'app/css/main.min.css'
		]).pipe(gulp.dest('dist/css'));

	var buildFiles = gulp.src([
		'app/ht.access'
	]).pipe(gulp.dest('dist'));

	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));


	done();

});

gulp.task('bld', function(done) {


	var buildhtml = gulp.src('app/*.html')
	    .pipe(fileinclude({
	      prefix: '@@'
	    }))
	    .pipe(gulpRemoveHtml())
	    .pipe(gulp.dest('dist'));
	
	var buildCss = gulp.src([
		'app/css/main.min.css'
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));

	done();

});

gulp.task('buildhtmlwatch', function() {
	return gulp.src('app/*.html')
	    .pipe(fileinclude({
	      prefix: '@@'
	    }))
	    .pipe(gulpRemoveHtml())
	    .pipe(gulp.dest('dist'));
});

gulp.task('webpImages', function () {
	(async () => {
		const webp = await imagemin(['app/img/*.{jpg,png,jpeg}'], 'app/img/webp', {
			use: [
				imageminWebp({quality: 70})
			]
		});
		console.log(webp);
		//=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
	})();
});

gulp.task('watch', function() {
	// gulp.watch('app/header.sass', gulp.parallel('headersass'));
	gulp.watch('app/img/*.{jpg,png}', gulp.parallel('webpImages'));
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch('app/*.html', gulp.parallel('buildhtmlwatch'));
});



gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', gulp.parallel('webpImages', 'styles', 'scripts', 'browser-sync', 'watch'));