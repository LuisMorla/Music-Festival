const { src, dest, watch, parallel } = require('gulp');
//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//IMAGES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const cache = require('gulp-cache');

function css(done){
  //Identificar archivo SASS
  //Compilar SASS
  //Almacenar en el disco
  src('src/scss/**/*.scss')
  .pipe(plumber())
  .pipe(sass())
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
  .pipe(dest('build/js'));
  done();
}
function dev(done){
  watch('src/scss/**/*.scss', css);
  watch('src/js/**/*.js', js)
  done();
}

exports.css = css;

exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(images, versionWebp, versionAvif, js, dev);

