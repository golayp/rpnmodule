var version='0.3.5';

var uglifyjs = require("uglify-js");
var fs = require('fs');
var compressor = require("node-minify");
var less = require("less");

function copyFile(source, target) {
  fs.writeFileSync(target, fs.readFileSync(source));
}

//Copy and js with no compression

new compressor.minify({
    compressor: 'no-compress',
    input:'js/**/*.js',
    output: 'dist/js/rpnmodule.'+version+'.js',
    callback: function(err, min){
        console.log(err);
//        console.log(min);
    }
});

jsHanling();
cssHandling();

//CSS build handling
function cssHandling(){
    fs.readFile('less/rpnmodule.less',function(error,data){
      data = data.toString();
      less.render(data, function (e, rendered) {
          fs.writeFile('dist/css/rpnmodule.'+version+'.css', rendered.css, function(err){
          });
      });
      less.render(data,{compress:true,sourceMap:true}, function (e, rendered) {
          fs.writeFile('dist/css/rpnmodule.'+version+'.min.css', rendered.css, function(err){
          });
          fs.writeFile('dist/css/rpnmodule.'+version+'.min.css.map', rendered.map, function(err){
          });
      });
  });
}

//JS build handling
function jsHanling(){
  var jsmap=uglifyjs.minify('dist/js/rpnmodule.'+version+'.js',{
    compress:false,
    outSourceMap: "rpnmodule."+version+".min.js.map"
  });

  fs.writeFile("dist/js/rpnmodule."+version+".min.js", jsmap.code, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("js file compression done");
    }
  });
  fs.writeFile("dist/js/rpnmodule."+version+".min.js.map", jsmap.map, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("js file map compression done");
    }
  });
}
