'use strict'

var gulp = require('gulp')
const fractal = require('./fractal.js')
const logger = fractal.cli.console
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var sassGlob = require('gulp-sass-glob')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var mqpacker = require('css-mqpacker')
var sortCSSmq = require('sort-css-media-queries')
var cssnano = require('cssnano')
var rename = require('gulp-rename')
var imagemin = require('gulp-imagemin')
var concat = require('gulp-concat')
var babel = require('gulp-babel')
var uglify = require('gulp-uglify')
var clean = require('gulp-clean')

// Node Sass se utilizará de forma predeterminada,
// aún así se recomienda que se configure explícitamente
// para mantener una compatibilidad futura en caso de que
// cambie el valor predeterminado.
sass.compiler = require('node-sass')

// Compilar los ficheros SCSS y enviar el CSS resultante
// en la carpeta /assets/css
gulp.task('sass', function() {
	return gulp
		.src('src/assets/scss/*.scss')
		.pipe(sassGlob())
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed',
			}).on('error', sass.logError)
		)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('assets/css'))
})

// Optimización CSS:
gulp.task('css-minify', function() {
	var postCssOpts = [
		mqpacker({
			sort: sortCSSmq,
		}),
		cssnano,
	]
	return gulp
		.src('assets/css/styles.css')
		.pipe(postcss(postCssOpts))
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest('assets/css'))
})

// Concatena y minifica Javascript
gulp.task('js-minify', function () {
	return gulp.src(['src/components/**/*.js'], 'src/assets/js/**/*.js')
	  .pipe(concat('main.js'))
	  .pipe(uglify({
		compress: {
		  drop_console: true
		} // Eliminación de los comentarios
	  }))
	  .pipe(gulp.dest('assets/js'));
  });
  
  

// Optimización de las imágenes:
// PNG, JPEG, GIF y SVG
gulp.task('image-minify', function() {
	return gulp
		.src('src/assets/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('assets/images'))
})

gulp.task('copy:img', function() {
	return gulp
		.src('src/assets/img/**/*', { base: 'src/assets/' })
		.pipe(gulp.dest('assets'))
})

gulp.task('copy:fonts', function() {
	return gulp
		.src('src/assets/fonts/*', { base: 'src/assets/' })
		.pipe(gulp.dest('assets'))
})

gulp.task('copy:subtitles', function() {
	return gulp
		.src('src/assets/subtitles/*', { base: 'src/assets/' })
		.pipe(gulp.dest('assets'))
})
//Directamente a la carpeta integration para videos en local
/*gulp.task('copy:subtitles', function() {
	return gulp
		.src('src/assets/subtitles/*', { base: 'src/assets/' })
		.pipe(gulp.dest('integration'))
})*/

gulp.task('copy:assets', function() {
	return gulp
		.src(['assets/img/**/*', 'assets/js/*', 'assets/css/*', 'assets/fonts/*','assets/subtitles/*'], {
			base: 'assets/',
		})
		.pipe(gulp.dest('integration/static'))
})

// Limpiar los estáticos: /assets
gulp.task('clean:assets', function() {
	return gulp
		.src('./assets/', {
			read: false,
		})
		.pipe(clean())
})

// Vigilar si hay algún cambio en los SCSS
// de los componentes como en los de assets/
gulp.task('watch', function() {
	gulp.watch('src/components/**/*.scss', gulp.series('sass'))
	gulp.watch('src/assets/**/*.scss', gulp.series('sass'))
	gulp.watch('assets/css/styles.css', gulp.series('css-minify'))
	gulp.watch('src/assets/img/**/*', gulp.series('image-minify'))
	gulp.watch(
		['src/components/**/*.js', 'src/assets/js/**/*.js'],
		gulp.series('js-minify')
	)
	gulp.watch('src/assets/img/**/*', gulp.series('copy:img'))
})

// Start the Fractal server
//
// In this example we are passing the option 'sync: true' which means that it will
// use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
// Obviously this is completely optional!
//
// This task will also log any errors to the console.
gulp.task('fractal:start', function() {
	const server = fractal.web.server({
		ghostMode: true,
		sync: true,
	})
	server.on('error', err => logger.error(err.message))
	return server.start().then(() => {
		logger.success(`-------------------------------------------`)
		logger.success(`|  Local URL:   ${server.url}     |`)
		logger.success(`|  Network URL: ${server.urls.sync.external}  |`)
		logger.success(`-------------------------------------------`)
	})
})

// Run a static export of the project web UI.
//
// This task will report on progress using the 'progress' event emitted by the
// builder instance, and log any errors to the terminal.
//
// The build destination will be the directory specified in the 'builder.dest'
// configuration option set above.
gulp.task('fractal:build', function() {
	const builder = fractal.web.builder()
	builder.on('progress', (completed, total) =>
		logger.update(`Exported ${completed} of ${total} items`, 'info')
	)
	builder.on('error', err => logger.error(err.message))
	return builder.build().then(() => {
		logger.success('Fractal build completed!')
	})
})

// Conjunto de tareas a ejectuar
// -------------------------------------------------
// Development
gulp.task(
	'default',
	gulp.parallel(
		'fractal:start',
		'copy:fonts',
		'copy:subtitles',
		'sass',
		'js-minify',
		'copy:img',
		'watch'
	)
)

// Build to share
gulp.task('build', gulp.series('fractal:build', 'copy:assets'))


gulp.task('hugo',
	gulp.series(
		gulp.parallel('copy:fonts', 'copy:subtitles', 'sass', 'js-minify', 'copy:img'),
		'css-minify',
	'copy:assets')
)
