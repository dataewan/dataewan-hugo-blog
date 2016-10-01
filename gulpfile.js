var gulp            = require('gulp');
var source          = require('vinyl-source-stream');
var browserify      = require('browserify');
var rename          = require('gulp-rename');
var glob            = require('glob');
var es              = require('event-stream');
var watchify        = require('watchify');
var uglify          = require('gulp-uglify');
var buffer          = require('vinyl-buffer');
var envify          = require('envify/custom');

gulp.task('default', function(done) {
        glob('./src/js/*js', function(err, files) {
                if(err) done(err);

                var tasks = files.map(function(entry) {
                        return browserify({entries : [entry]})
                            .transform("babelify", {presets : ['react']})
                            .transform(envify({
                                    NODE_ENV : 'production'
                            }))
                            .bundle()
                            .pipe(source(entry))
                            .pipe(buffer())
                            .pipe(uglify())
                            .pipe(rename({
                                    dirname : ''
                            }))
                            .pipe(gulp.dest('./static/js'));
                })
                es.merge(tasks).on('end', done);
        })
})
