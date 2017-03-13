/**
 * Created by Roman on 02.03.2017.
 */
var gulp = require('gulp');
var minify = require('gulp-minify');

var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

//global tasks
gulp.task('default', ['font', 'style:build', 'scripts', 'ui-framework']);

gulp.task('style:minify', function () {
    gulp.src("./style/*.css")
        .pipe(cleanCSS({ compatibility: 'ie8', processImportFrom: ['!fonts.googleapis.com'] }))
        .pipe(gulp.dest("./style/"));
});

gulp.task('scripts:vendor-minify', function () {
    return gulp.src(scripts.release)
        .pipe(minify({
            ext: { min: '.js' },
            mangle: true,
            noSource: true
        }))
        .pipe(concat('vendor.js', { newLine: ';' }))
        .pipe(gulp.dest('./Scripts/vendor'));
});


gulp.task('ui-framework:copy-views', function () {
    var copyViews = [
        "./bower_components/ui-framework/Views/ui-framework/**",
        "../ui-framework-override/cshtml/ui-framework/**"
    ];
    return gulp.src(copyViews)
        .pipe(gulp.dest('./Views/Partials/ui-framework/'));
});