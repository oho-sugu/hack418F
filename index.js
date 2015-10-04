var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs= require('fs');


var RollingSpider = require("rolling-spider");
var keypress = require('keypress');
keypress(process.stdin);

process.stdin.setRawMode(true);
process.stdin.resume();

var ACTIVE = true;
var STEPS = 5;
var d = new RollingSpider({uuid:"8581b07eed0d42679702cb7b7235ec05"}); //各々書き換えましょう。

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
    if(msg === 't'){
      console.log('takeoff');
      d.takeOff();
    }
    if(msg === 'l'){
      console.log('land');
      d.land();
    }
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

function cooldown() {
  ACTIVE = false;
  setTimeout(function () {
    ACTIVE = true;
  }, STEPS);
}

d.connect(function () {

  d.setup(function () {
    console.log('Configured for Rolling Spider! ', d.name);
    d.flatTrim();
    d.startPing();
    d.flatTrim();
    /*
     d.on('battery', function () {
     console.log('Battery: ' + d.status.battery + '%');
     d.signalStrength(function (err, val) {
     console.log('Signal: ' + val + 'dBm');
     });

     });

     d.on('stateChange', function () {
     console.log(d.status.flying ? "-- flying" : "-- down");
     })
     */
    setTimeout(function () {
      console.log(d.name + ' => SESSION START');
      ACTIVE = true;
    }, 1000);

  });
});

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {

  console.log('got "keypress" => ', key);

  if (ACTIVE && key) {

    var param = {tilt:0, forward:0, turn:0, up:0};

    if (key.name === 'l') {
      console.log('land');
      d.land();
    } else if (key.name === 't') {
      console.log('takeoff');
      d.takeOff();
    } else if (key.name === 'h') {
      console.log('hover');
      d.hover();
    } else if (key.name === 'x') {
      console.log('disconnect');
      d.disconnect();
      process.stdin.pause();
      process.exit();
    }

    if (key.name === 'up') {
      d.forward({ steps: STEPS });
      cooldown();
    } else if (key.name === 'down') {
      d.backward({ steps: STEPS });
      cooldown();
    } else if (key.name === 'right') {
      d.tiltRight({ steps: STEPS });
      cooldown();
    } else if (key.name === 'left') {
      d.tiltLeft({ steps: STEPS });
      cooldown();
    } else if (key.name === 'u') {
      d.up({ steps: STEPS });
      cooldown();
    } else if (key.name === 'd') {
      d.down({ steps: STEPS });
      cooldown();
    }

    if (key.name === 'm') {
      param.turn = 90;
      d.drive(param, STEPS);
      cooldown();
    }
    if (key.name === 'h') {
      param.turn = -90;
      d.drive(param, STEPS);
      cooldown();
    }
    if (key.name === 'f') {
      d.frontFlip();
      cooldown();
    }
    if (key.name === 'b') {
      d.backFlip();
      cooldown();
    }

  }
});
