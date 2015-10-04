/*
	methonds for control a drone
	created by hamada 
*/




var RollingSpider = require("rolling-spider");
var temporal = require('temporal');

var d_mars  = new RollingSpider({uuid:"64ee3b2c2e4649e596467b8d60d98767"});
var d_blaze = new RollingSpider({uuid:"8da392be47304342929ffde7d89afc8e"});
var d_swat =  new RollingSpider({uuid:"5381b23c73914e6387a1fa14c0adb7e8"});
var d = {'M': d_mars,
		 'B': d_blaze,
		 'S': d_swat};

// var d = { 'M': d_mars,
// 		  'B': d_blaze
// 		};



exports.wakeup = function(id, cb) {
	// console.log(id, d[id])
	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	d[id].connect(function () {

  	d[id].setup(function () {
    	console.log('Configured for Rolling Spider! ', d[id].name);
    	d[id].flatTrim();
    	d[id].startPing();
    	d[id].flatTrim();
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
      		console.log(d[id].name + ' => SESSION START');
			cb();
      		// ACTIVE = true;
    	}, 1000);
  	});
	});
};




exports.up = function(id, steps) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	if (!steps) {
		console.log("up steps 20");
		d[id].up({steps: 20});
	}
	else {
		console.log("up steps ", steps);
		// d.up({steps: steps});
		d[id].up({steps: steps});
	}
};

exports.down = function(id, steps) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	if (!steps) {
		console.log("down steps 20");
		d[id].down({steps: 20});
	}

	else {
		console.log("down steps ", steps);
		d[id].down({steps: steps});
	}
};

exports.takeOff = function(id) {
	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	console.log('take off');
	d[id].takeOff();
};

exports.land = function(id) {
	
	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	console.log('land');
	d[id].land();
};

exports.hover = function(id) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	console.log('hover ');
	d.hover();
};

exports.disconnect = function() {

	d['M'].land();
	d['B'].land();

	console.log('disconnect');
	process.stdin.pause();
    process.exit();
};


exports.forward = function(id, steps, speed) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	if (!speed) {
		// console.log('1 steps speed', steps, speed);
		d[id].forward({ steps: steps });
	}
	else {
		// console.log('2 steps, speed ', steps, speed);
		d[id].forward({ steps: steps, speed: speed });
	}
};

exports.backward = function(id, steps, speed) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	if (!speed) {
		// console.log('1 steps speed', steps, speed);
		d[id].backward({ steps: steps });
	}
	else {
		// console.log('2 steps, speed ', steps, speed);
		d[id].backward({ steps: steps, speed: speed });
	}
};

exports.tiltRight = function(id, steps, speed) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	if (!speed) {
		// console.log('1 steps speed', steps, speed);
		d[id].tiltRight({ steps: steps });
	}
	else {
		// console.log('2 steps, speed ', steps, speed);
		d[id].tiltRight({ steps: steps, speed: speed });
	}
};

exports.tiltLeft = function(id, steps, speed) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	if (!speed) {
		// console.log('1 steps speed', steps, speed);
		d[id].tiltLeft({ steps: steps });
	}
	else {
		// console.log('2 steps, speed ', steps, speed);
		d[id].tiltLeft({ steps: steps, speed: speed });
	}
};

exports.turnRight = function(id, steps) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	d[id].drive({tilt:0, forward:0, turn:90, up:0}, steps);
};

exports.turnLeft = function(id, steps) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	d[id].drive({tilt:0, forward:0, turn:-90, up:0}, steps);
};

exports.frontFlip = function (id) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	d[id].frontFlip();
}

exports.backFlip = function (id) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	d[id].backFlip();
}

exports.rightFlip = function (id) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	d[id].rightFlip();
}

exports.leftFlip = function (id) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	d[id].leftFlip();
}


exports.attack_avert = function(id1, id2) {
	
	if (!d[id1]) {
		console.log('id is not correct ', id1);
		return;
	}

	if (!d[id2]) {
		console.log('id is not correct ', id2);
		return;
	}

	temporal.queue([
		{
			delay: 1000,
			task: function() {
				d[id1].forward({steps: 30});
			}
		},
		{
			delay:1000,
			task: function() {
				d[id2].rightFlip();
			}
		},
		{
			delay: 1000,
			task: function() {
				d[id1].backward({steps: 30});
			}
		}
	]);
}


exports.delight = function(id) {
	
	console.log('delight function');
	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	d[id].frontFlip();
}

exports.anger = function(id) {

	console.log('anger function');
	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	temporal.queue([
	{
		delay: 1000,
		task: function() {
			d[id].up({steps: 10});
		}
	}, 
	{
		delay: 1000,
		task: function() {
			d[id].down({steps: 10});
		}
	},
	{
		delay: 1000,
		task: function() {
			d[id].up({steps: 10});
		}
	}, 
	{
		delay: 1000,
		task: function() {
			d[id].down({steps: 10});
		}
	},
	{
		delay: 1000,
		task: function() {
			d[id].up({steps: 10});
		}
	}, 
	{
		delay: 1000,
		task: function() {
			d[id].down({steps: 10});
		}
	},
	{
        delay: 1000,
        task: function () {
          temporal.clear();
          // process.exit(0);
        }
     }
	]);
}

exports.sadness = function(id) {

	console.log('sadness function');
	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}

	temporal.queue([
	{
		delay: 1000,
		task: function() {
			d[id].tiltLeft({steps: 12, speed: 100});
		}
	}, 
	{
		delay: 1000,
		task: function() {
			d[id].tiltRight({steps: 24, speed: 100});
		}
	},
	{
		delay: 1000,
		task: function() {
			d[id].tiltLeft({steps: 24, speed: 100});
		}
	}, 
	{
		delay: 1000,
		task: function() {
			d[id].tiltRight({steps: 24, speed: 100});
		}
	},
	{
		delay: 1000,
		task: function() {
			d[id].tiltLeft({steps: 24, speed: 100});
		}
	}, 
	{
		delay: 1000,
		task: function() {
			d[id].tiltRight({steps: 12, speed: 100});
		}
	},
	{
		delay: 1000,
		task: function() {
			d[id].land();
		}
	},
	{
        delay: 1000,
        task: function () {
          temporal.clear();
          // process.exit(0);
        }
     }
	]);
}

// test code to autopilot
exports.autopilot_test = function(id) {

	if (!d[id]) {
		console.log('id is not correct ', id);
		return;
	}
  	
  	console.log('Start autopilot_test() function');
      
      temporal.queue([
      {
        delay: 5000,
        task: function () {
          console.log('Getting ready for takeOff!');
          d[id].takeOff();
          d[id].flatTrim();
        }
      },
      {
        delay: 4500,
        task: function () {
          console.log('Going forward');
          d[id].forward({steps: 12});
        }
      },
      {
        delay: 4500,
        task: function () {
          console.log('Going up');
          d[id].up({steps: 20});
        }
      },
      {
        delay: 4500,
        task: function () {
          console.log('Going down');
          d[id].down({steps: 20});
        }
      },
      {
        delay: 4500,
        task: function () {
          console.log('Going left');
          d[id].tiltLeft({steps: 12, speed: 100});
        }
      },
      {
        delay: 4500,
        task: function () {
          console.log('Going right');
          d[id].tiltRight({steps: 12, speed: 100});
        }
      },
      {
        delay: 5000,
        task: function () {
          console.log('OMG Flip!');
          d[id].frontFlip();
        }
      },
      {
        delay: 5000,
        task: function () {
          console.log('Time to land');
          d[id].land();
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

