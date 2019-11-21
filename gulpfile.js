const gulp = require('gulp');
const zip = require('gulp-zip');

const files = [
    './src/**/**.*',
    './script.js'
];

gulp.task('dist', () => {
    return gulp.src(files)
        .pipe(gulp.dest('dist'));
});

gulp.task('default', () =>
    gulp.src('dist/*')
        .pipe(zip('application-backend-mailing.zip'))
        .pipe(gulp.dest('./'))
);
