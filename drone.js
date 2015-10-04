/*
	methonds for control a drone
	created by hamada 
*/




var RollingSpider = require("rolling-spider");
var temporal = require('temporal');

var d = new RollingSpider({uuid:"64ee3b2c2e4649e596467b8d60d98767"});
var d_blaze = new RollingSpider({uuid:"8da392be47304342929ffde7d89afc8e"});


exports.wakeup = function() {
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
      		// ACTIVE = true;
    	}, 1000);
  	});
	});
};

exports.up = function(steps) {
	if (!steps) {
		console.log("up steps 20");
		d.up({steps: 20});
	}
	else {
		console.log("up steps ", steps);
		d.up({steps: steps});
	}
};

exports.down = function(steps) {
	if (!steps) {
		console.log("down steps 20");
		d.down({steps: 20});
	}
	else {
		console.log("down steps ", steps);
		d.down({steps: steps});
	}
};

exports.takeOff = function() {
	console.log('take off');
	d.takeOff();
};

exports.land = function() {
	console.log('land');
	d.land();
};

exports.hover = function() {
	console.log('hover ');
	d.hover();
};

exports.disconnect = function() {
	console.log('disconnect');
	process.stdin.pause();
    process.exit();
};


exports.forward = function(steps, speed) {
	if (!speed) {
		// console.log('1 steps speed', steps, speed);
		d.forward({ steps: steps });
	}
	else {
		// console.log('2 steps, speed ', steps, speed);
		d.forward({ steps: steps, speed: speed });
	}
};

exports.backward = function(steps, speed) {
	if (!speed) {
		// console.log('1 steps speed', steps, speed);
		d.backward({ steps: steps });
	}
	else {
		// console.log('2 steps, speed ', steps, speed);
		d.backward({ steps: steps, speed: speed });
	}
};

exports.tiltRight = function(steps, speed) {
	if (!speed) {
		// console.log('1 steps speed', steps, speed);
		d.tiltRight({ steps: steps });
	}
	else {
		// console.log('2 steps, speed ', steps, speed);
		d.tiltRight({ steps: steps, speed: speed });
	}
};

exports.tiltLeft = function(steps, speed) {
	if (!speed) {
		// console.log('1 steps speed', steps, speed);
		d.tiltLeft({ steps: steps });
	}
	else {
		// console.log('2 steps, speed ', steps, speed);
		d.tiltLeft({ steps: steps, speed: speed });
	}
};

exports.turnRight = function(steps) {
	d.drive({tilt:0, forward:0, turn:90, up:0}, steps);
};

exports.turnLeft = function(steps) {
	d.drive({tilt:0, forward:0, turn:-90, up:0}, steps);
};

exports.frontFlip = function () {
	d.frontFlip();
}

exports.backFlip = function () {
	d.backFlip();
}

// test code to autopilot
exports.autopilot_test = function() {
  console.log('Start autopilot_test() function');
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
          // process.exit(0);
        }
      }
    ]);
};

