var gulp = require('gulp');

// Used to stream bundle for further handling
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var concat = require('gulp-concat');

gulp.task('copy', function(){
  gulp.src('index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./app/main.js'],
        transform: [reactify],
        // Gives us sourcemapping
        debug: true,
        // Requirement of watchify
        cache: {}, 
        packageCache: {}, 
        fullPaths: true
    });

    var watcher = watchify(bundler);

    return watcher.on('update', function () {
        // When any files update
        var updateStart = Date.now();
        console.log('Updating!');

        // Create new bundle that uses the cache for high performance
        watcher.bundle()
        .pipe(source('main.js'))
        // This is where you add uglifying etc.
        .pipe(gulp.dest('build/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('css', function () {
    gulp.watch('./app/styles/**/*.css', function () {
        return gulp.src([
            './node_modules/purecss/build/pure.css',
            './node_modules/purecss/build/grids-responsive.css',
            './app/styles/**/*.css'
        ])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('build/'));
    });
});

// Just running the two tasks
gulp.task('default', ['browserify', 'css']);