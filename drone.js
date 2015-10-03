var RollingSpider = require("rolling-spider");
var keypress = require('keypress');
var temporal = require('temporal');
keypress(process.stdin);

process.stdin.setRawMode(true);
process.stdin.resume();

var ACTIVE = true;
var STEPS = 5;
var d = new RollingSpider({uuid:"7b5b3c3f2db1464f9ec0525c15991f7c"}); //各々書き換えましょう。

function cooldown() {
  ACTIVE = false;
  setTimeout(function () {
    ACTIVE = true;
  }, STEPS);
}

// hamada added
function delay() {
  setTimeout(function() {
    console.log('delay start');
  }, 1000);
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


    if (key.name === 'a') {
      temporal.queue([
      {
        delay: 5000,
        task: function () {
          console.log('Getting ready for takeOff!');
          d.takeOff();
          d.flatTrim();
        }
      },
      {
        delay: 4500,
        task: function () {
          console.log('Going forward');
          d.forward({steps: 12});
        }
      },
      {
        delay: 4500,
        task: function () {
          console.log('Going up');
          d.up({steps: 20});
        }
      },
      {
        delay: 4500,
        task: function () {
          console.log('Going down');
          d.down({steps: 20});
        }
      },
      {
        delay: 4500,
        task: function () {
          console.log('Going left');
          d.tiltLeft({steps: 12, speed: 100});
        }
      },
      {
        delay: 4500,
        task: function () {
          console.log('Going right');
          d.tiltRight({steps: 12, speed: 100});
        }
      },
      {
        delay: 5000,
        task: function () {
          console.log('OMG Flip!');
          d.frontFlip();
        }
      },
      {
        delay: 5000,
        task: function () {
          console.log('Time to land');
          d.land();
        }
      },
      {
        delay: 5000,
        task: function () {
          temporal.clear();
          process.exit(0);
        }
      }
      
    }


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