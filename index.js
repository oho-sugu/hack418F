var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs= require('fs');


var drone = require('./drone.js');
console.log(drone);
drone.wakeup('B');


var RollingSpider = require("rolling-spider");
var keypress = require('keypress');
keypress(process.stdin);

process.stdin.setRawMode(true);
process.stdin.resume();

var ACTIVE = true;
var STEPS = 5;

var all = [{'text': 'Start',
            'motion': [{'text':'go','motion':'t'},
                       {'text':'up','motion':'u'},
                       {'text':'up','motion':'u'} ]},
           {'text': 'End', 'motion': [{'text':'gogo','motion':'up'},{'text':'back','motion':'down'}]}];

var num=0;
var core=[0,0,0,0];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/angular_index.js', function (req, res) {
  res.sendFile(__dirname + '/angular_index.js');
});
app.get('/glue.js', function (req,res) {
  res.sendFile(__dirname+'/node_modules/glue.js');
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    if(msg!=''){
      io.emit('chat message', msg);
    }
    console.log(msg);
    //この部分は関数で後ろに
    switch(msg){
      case 1:
        core[0]++;
        break;
      case 2:
        core[1]++;
        break;
      case 3:
        core[2]++;
        break;
      case 4:
        core[3]++;
        break;
    }
    //
  });

  var script = all[num].text;
  var sentaku = all[num].motion;

  setTimeout(function(){
    io.emit('script', script);
  },500);
  setTimeout(function(){
    io.emit('sentaku', sentaku);
  },500);

  socket.on('sentaku', function (sentaku) {

  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/sentaku/:index', function (req, res) {
  core[req.params.index]++;
  console.log(req.params.index);
});

/*
setInterval(function(){
  var kore = 0;
  var max = -1;
  for(var i =0 ;i<4 ; i++){
    if(max <= core[i]){}
    max = core[i];
    kore = i;
  }

  //all[num].motion[i].motion
  num++;
  var script = all[num].text;
  var sentaku = all[num].motion;
  io.emit('script', script);
  io.emit('sentaku', sentaku);
  core = [0,0,0,0];

},5000);
*/

process.stdin.on('keypress', function (ch, key) {

  console.log('got "keypress" => ', key);

  if (ACTIVE && key) {
    if (key.name === 'x') {
      console.log('disconnect');
      process.stdin.pause();
      process.exit();
    }

  }
});

