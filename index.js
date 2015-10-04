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



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/angular_index.js', function (req, res) {
  res.sendFile(__dirname + '/angular_index.js');
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    if(msg === 't'){
      console.log('takeoff');
      d.takeOff();
    }
    if(msg === 'l'){
      console.log('land');
      d.land();
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});



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
