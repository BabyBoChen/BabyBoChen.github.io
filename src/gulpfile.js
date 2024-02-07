const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
// function clean(cb) {
//     // body omitted
//     cb();
// }

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
    let timestmap = Date.now();
    src("src/**/*.js").pipe(uglify({ mangle: false, compress: { sequences: false }, })).pipe(dest("dist/"));
    src("src/**/*.mjs").pipe(uglify({ mangle: false, compress: { sequences: false }, })).pipe(dest("dist/"));
    src("src/**/*.css").pipe(uglifycss()).pipe(dest("dist/"));
    src("src/**/*.html")
        .pipe(replace(`<link href="/scripts/layout.css" rel="stylesheet" />`, `<link href="/scripts/layout.css?v=${timestmap}" rel="stylesheet" />`))
        .pipe(replace(`<script type="module" src="/scripts/app.mjs"></script>`,`<script type="module" src="/scripts/app.mjs?v=${timestmap}"></script>`))
        .pipe(replace(`<script src="/scripts/layout.js"></script>`, `<script src="/scripts/layout.js?v=${timestmap}"></script>`))
        .pipe(replace(`<link href="/scripts/animation.css" rel="stylesheet"/>`, `<link href="/scripts/animation.css?v=${timestmap}" rel="stylesheet"/>`))
        .pipe(replace(`<script type="module" src="/scripts/app.mjs"></script>`, `<script type="module" src="/scripts/app.mjs?v=${timestmap}"></script>`))
        .pipe(dest("dist/"));
    src("src/assets/**/*.*").pipe(dest("dist/assets"));
    src("src/favicon.ico").pipe(dest("dist/"));
    cb();
}

exports.build = build;