const gulp = require("gulp");
const clean = require("gulp-clean");
const sass = require("gulp-sass")(require("sass"));
const git = require("simple-git");
const cleanCSS = require("gulp-clean-css");
const sassdoc = require('sassdoc');

gulp.task("borra", function () {
  return gulp
    .src("./css/*", { read: false, allowEmpty: false })
    .pipe(clean());
});

gulp.task("parse_sass", function () {
  return gulp.src("./sass/*.scss").pipe(sass()).pipe(gulp.dest("css"));
});

gulp.task('generate_docs', function () {
    return gulp.src("./sass/*.scss")
    .pipe(sassdoc());
});

gulp.task("minifica_css", function () {
  return gulp.src("css/principal.css").pipe(cleanCSS()).pipe(gulp.dest("css"));
});

gulp.task("git_push", function (done) {
  git()
    .add(".")
    .commit("cambios realizados")
    .push("origin", "main", function (err) {
      if (err) {
        console.error(err);
        done(err);
      } else {
        done();
      }
    });
});

gulp.task(
  "default",
  gulp.series("borra", gulp.parallel("parse_sass", "generate_docs"), "minifica_css", "git_push")
);
