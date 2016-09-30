var through = require('through2');    // npm install --save through2
var fs     = require('fs');
var fe     = require('fs-extra');
var md5ify = require('md5ify');
var globby = require('globby');
var async  = require('async');
var Path   = require("path");

var noop = function () {

};

var getOutput = function (data, url, cb, md5PrependString) {
    if(md5PrependString === undefined) {
        md5PrependString = '';
    }
    // url:  the file path
    // cb:   callback
        // console.log(data);
        // ?__md5()
        var regex = /[\"\']([\w\/:\.=_\-]*)\?__md5_relative\([\'\"]?([\w\.\/]*)[\'\"]?\)[\"\']/g;
        var r = [];
        while (m = regex.exec(data)) {
            r.push(m);
        }
        r.forEach(function (v) {
            var s_index = v.index,
                match   = v[0],
                e_index = v.index + match.length,
                path    = v[1],
                relativePath = v[2];

            var dir = Path.dirname(url);
            path    = Path.resolve(dir, relativePath, path);
            // path:    the file path for md5ing
            data = data.replace(match, '\'' + v[1] + '?' + md5PrependString + getMd5(path) + '\'');
        });



        // ?__md5('path')
        var regex = /__md5\([\'\"]([-\w\./]*)[\'\"]\)/g;
        var r = [];
        while (m = regex.exec(data)) {
            r.push(m);
        }
        r.forEach(function (v) {
            var s_index = v.index,
                match   = v[0],
                e_index = v.index + match.length,
                path    = v[1];

            var dir = Path.dirname(url);
            path    = Path.resolve(dir, path);
            // path:    the file path for md5ing

            data = data.replace(match, getMd5(path));
        });

        cb(data);
};

var isFile = function (path, cb) {
    cb = cb || noop;
    fs.stat(path, function (err, stats) {
        if (err) throw err;
        if (!stats.isDirectory()) {
            cb(path);
        }
    });
};

var getMd5 = function (path) {
    return md5ify(path).substr(0, 10);
};

var convert = function (url, dest, cb) {

};

var filesToFolder = function (paths, dest, noDir, cb) {
    cb = cb || noop;

    if(typeof noDir == "function") {
        cb = noDir;
        noDir = "";
    }

    globby(paths).then(function (paths) {
        async.map(paths, getOutput, function (err, results) {
            async.map(paths, function (path, cb) {
                
            }, function (err, result) {
                if (err) throw err;
                cb();
            });
        });
    });


};

module.exports = function(o) {
    return through.obj(function(file, encoding, callback) {
        var content = file.contents.toString();

        // file.contents = new Buffer(content, "binary");
        // console.log(content);
        // return;

        getOutput(content, file.path, function (data) {
            file.contents = new Buffer(data, "utf-8");
            callback(null, file);
        }, o.md5PrependString);
    });
};