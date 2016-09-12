## Example
```bash
npm install gulp-md5-fingerprint --save
```

```js
var fingerprint = require('gulp-md5-fingerprint');

gulp.task('fingerprint', function(){
	gulp.src(['src/config.js'])
		.pipe(fingerprint())
		.pipe(gulp.dest('dist'));
});
```

## Before
```javascript
project/src/config.js

System.config({
    baseURL: baseURL,
    map: {
        jquery: 'js/vendor/jquery-1.12.3.min.js?__md5_relative("./")',
        jqueryui: 'js/vendor/jqueryui/jquery-ui.min.js?__md5_relative("./")',
        jqueryuiCss: 'js/vendor/jqueryui/jquery-ui.min.css?__md5_relative("./")',
        modernizr: 'js/vendor/modernizr-custom.js?__md5_relative("./")',
        css: 'js/vendor/plugin-css/css.js?__md5_relative("./")'
    }
});
```
## After
```javascript
project/dist/config.js

System.config({
    baseURL: baseURL,
    map: {
        jquery: "js/vendor/jquery-1.12.3.min.js?48eb3d7453",
        jqueryui: "js/vendor/jqueryui/jquery-ui.min.js?d935d506ae",
        jqueryuiCss: "js/vendor/jqueryui/jquery-ui.min.css?26812a2885",
        modernizr: "js/vendor/modernizr-custom.js?f18f60a912",
        css: "js/vendor/plugin-css/css.js?c14f7206c3"
    }
});
```
