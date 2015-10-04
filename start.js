// hoge


var drone = require('./drone.js');
var keypress = require('keypress');
var co = require('co');

keypress(process.stdin);

process.stdin.setRawMode(true);
process.stdin.resume();

var ACTIVE = true;
var STEPS = 5;

console.log('connect drones');

drone.wakeup('M');
drone.wakeup('B');
drone.wakeup('S');
/*drone.wakeup('M', function () {
	drone.wakeup('B', function () {
		drone.wakeup('S');
	});

});
*/
// drone.wakeup_blaze();

process.stdin.on('keypress', function(ch, key) {
	console.log('got "keypress" => ', key);

	if (ACTIVE && key) {
		var parm = {tilt:0, forward:0, turn:0, up:0};

		// special 1
		// if (key.name === 'a') {
		// 	// drone.up_down();
		// 	co(function *() {
  // 				var res1 = yield p('aSyNc');
		// 		console.log(res1);

		// 		var res2 = yield p(res1.toUpperCase());
		// 		console.log(res2);

		// 		var res3 = yield p(res2.toLowerCase());
		// 		console.log(res3);
		// 	});
		// }

		// special 2
		if (key.name === 'a') {
			drone.autopilot_test('M');
			drone.autopilot_test('S');
			drone.autopilot_test('B');

		}

		if (key.name === 'b') {
			drone.backFrip('M');
			drone.backFrip('S');
			drone.backFrip('B');
		}

		if(key.name === 's') {
			draone.sadness('M');
		}

		// basic 
		if (key.name === 'l') {
      	  	drone.land('M');
      	  	drone.land('B');
      	  	drone.land('S');
	    } else if (key.name === 't') {
	      	drone.takeOff('M');
	      	drone.takeOff('B');
	      	drone.takeOff('S');
	    } else if (key.name === 'h') {
	      	drone.hover('M');
	    } else if (key.name === 'x') {
	      	drone.disconnect();
	      	process.stdin.pause();
	      	process.exit();
	    }

	    if (key.name === 'up') {
	     // 	drone.forward({ id:'M', steps: STEPS });
	      	//drone.up();
	      	// cooldown();
		    drone.frontFlip('M');
			//drone.frontFlip('S');
			drone.frontFlip('B');
	    } else if (key.name === 'down') {
	      	//drone.backward({ id:'M', steps: STEPS });
	      	// cooldown();
			drone.backFlip('M');
			drone.backFlip('S');
			drone.backFlip('B');
	    } else if (key.name === 'right') {
	      	//drone.tiltRight({ id:'M', steps: STEPS });
	      	// cooldown();
			drone.rightFlip('M');
			drone.rightFlip('S');
			drone.rightFlip('B');
	    } else if (key.name === 'left') {
	      	//drone.tiltLeft({ id:'M', steps: STEPS });
	      	// cooldown();
			drone.leftFlip('M');
			drone.leftFlip('S');
			drone.leftFlip('B');
	    } else if (key.name === 'u') {
	      	drone.up({ id:'M', steps: STEPS });
	      	// cooldown();
	    } else if (key.name === 'd') {
	      	drone.down({ id:'M', steps: STEPS });
	      	// cooldown();
	    }
	    /*
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
	    */


	}
});
