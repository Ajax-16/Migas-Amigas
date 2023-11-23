var gulp = require("gulp");
var clean = require("gulp-clean");
var sass = require("gulp-sass")(require("sass"));
var git = require("simple-git");
var cleanCSS = require("gulp-clean-css");

gulp.task("borra", function () {
  return gulp
    .src("./css/*", { read: false, allowEmpty: false })
    .pipe(clean());
});

gulp.task("parse_sass", function () {
  return gulp.src("./sass/*.scss").pipe(sass()).pipe(gulp.dest("css"));
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
  gulp.series("borra", "parse_sass", "minifica_css", "git_push")
);
