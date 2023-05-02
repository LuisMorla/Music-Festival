const { src, dest, watch, parallel } = require('gulp');
//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
//IMAGES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const cache = require('gulp-cache');

//JS
const terser = require('gulp-terser-js');

function css(done){
  //Identificar archivo SASS
  //Compilar SASS
  //Almacenar en el disco
  src('src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([autoprefixer(), cssnano()]))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('build/css'));

  done();
}

function images(done){

  const options = {
    optimizationLevel: 3
  }
  src('src/img/**/*.{jpg,png}')
  .pipe(cache(imagemin(options)))
  .pipe(dest('build/img'));
  done();
}

function versionAvif(done){
  const options = {
    quality: 50
  };
  src('src/img/**/*.{jpg,png}')
  .pipe(avif(options))
  .pipe(dest('build/img'));
}


function versionWebp(done){
  const options = {
    quality: 50
  };
  src('src/img/**/*.{jpg,png}')
  .pipe(webp(options))
  .pipe(dest('build/img'));
}

function js(done){
  src('src/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write('.'))
  .pipe(dest('build/js'));
  done();
}
function dev(done){
  watch('src/scss/**/*.scss', css);
  watch('src/js/**/*.js', js)
  done();
}
exports.css = css;
exports.js = js;

exports.dev = parallel(images, versionWebp, versionAvif, js, dev);

