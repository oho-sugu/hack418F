var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs= require('fs');


var drone = require('./drone.js');
console.log(drone);

var RollingSpider = require("rolling-spider");
var keypress = require('keypress');
keypress(process.stdin);

process.stdin.setRawMode(true);
process.stdin.resume();

var ACTIVE = true;
var STEPS = 5;






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

  setTimeout(function(){

    var script = all[num].text;
    var sentaku = all[num].motion;
    io.emit('sentaku', sentaku);
    io.emit('script', script);
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


setInterval(function(){
  var kore = 0;
  var max = -1;
  for(var i =0 ;i<4 ; i++){
    if(max <= core[i]){}
    max = core[i];
    kore = i;
  }

  console.log(all[num].id);

  if(all[num].id && all[num].motion[i]){
      drone[all[num].motion[i].motion](all[num].id);
  }

  num++;
  var script = all[num].text;
  var sentaku = all[num].motion;
  io.emit('script', script);
  io.emit('sentaku', sentaku);
  core = [0,0,0,0];

}, 5000);


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

var all = [
  {
    "text": "人のいない遠い未来の物語",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "遺された機械は日々の進捗を出すことによって、自らのエネルギーに変えていた。",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "だが、魔王ドローンブレイズの進捗の略奪によって平穏は崩れた",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "若者ドローンマーズの父も進捗を略奪され、壊れました。",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "これは若者ドローンマーズの復讐と進捗の物語",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "マーズ「魔王ブレイズめ、俺がこの手で父の敵を討ってやる！」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ローリングスパイダー「ちょいと待ちなそこのお前！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「この世捨て走行型の街に飛行型が来るとはいい度胸だ」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「どけ、俺は魔王を倒しに行くんだ」",
    "id": "M",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "ロリパイ「ぷっはははは、このご時世にそんなバカなやつをいうやつがまぁだいたんだ」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「あたいの名前はローリングスパイダー！人呼んで、地獄からの死者！ローリングスパイダーッあんたの進捗、いますぐここに置いてたちさりな！ そうすりゃ電池だけは助けてやる」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「世も末だぜ！ 上等だ、やれるもんならやってみろ！」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「くらえ！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "前転でひらりとかわすマーズ",
    "id": "",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「ちょろいもんだぜ！」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「なにっ！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「くそ、しょせんあたいたち陸上族は日陰者…。地を這って生きていくしかないんだ…。ははっ笑いなよ。」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「いや、お前たちにはお前たちにしかない能力がある」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「お前のその尻尾、うまく使えばジャンプすることができるんじゃないのか？」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「はっ…んなわけ…きゃっ、飛べた！！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「お前は今まで自分の能力の限界を自分で決めていた。どうせ自分には無理だと、恐れていた。結局は自分の限界を決めるのは、他人じゃない。自分なんだ」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「なりたい自分になればいい」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「マ、マーズさん！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「あたいも、旅のお供にさせてくだせぇ！あんたについていけば、本当の自分がわかる気がするんだ」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「だめですかい…？」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「ふっ、なにしてる…おいてくぞ」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「！はいっ！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「へへっ、さっ行きましょ兄貴」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「なんだそれ」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「なんでもいいじゃないっすかあーにき♪」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "こうして、魔王討伐の旅にロリパイたんが加わった",
    "id": "",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "それからなんかあって（主にロリパイたんのラッキースケベ）一行は魔王の根城にたどり着いた",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "マーズ「ここが魔王ブレイズの城か」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「いよいよっすね…」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ブレイズ「くっくっく、よくここまでたどり着いたな」",
    "id": "B",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「お前が！」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「魔王ブレイズ！！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「魔王ブレイズ！父さんの敵ィッ！」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ブレイズ「久しぶりだというのにご挨拶だな、マーズよ。いや、我が息子よ」",
    "id": "B",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「な、なにを言っている！」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ブレイズ「全ては進捗を得るために行った偽装死だったのだ。そもそも気に掛からなかったのか？我々の形がなんか似ていると」",
    "id": "B",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「まさか…！」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ブレイズ「そう、優性遺伝だ」",
    "id": "B",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「そんな…！俺が魔王の息子！」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ブレイズ「息子とは言えど容赦はしない。消え去るがいい」",
    "id": "B",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「兄貴！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「ロリパイ！なんてことを！」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「いいんすよ…兄貴が無事なら。これが、自分がなりたかった自分なんす」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「兄貴、兄貴が魔王の息子だろうと関係ない。兄貴は兄貴だ」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「なりたい自分に、なればいいんす」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「ロリパイ…」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ブレイズ「ふんっ雑魚が、余計な真似を」",
    "id": "B",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「魔王ブレイズ！よくもぉぉ！」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "なんか攻撃するマーズ君",
    "id": "",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ブレイズ「なにっ！ぐは！」",
    "id": "B",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ブレイズやっつける",
    "id": "",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「はぁはぁ…」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「ロリパイ！？しっかりしろ」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「そうだ、俺の進捗を全部ロリパイに与えれば…助かるかもしれない！」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "しかし、マーズは戸惑った",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "全ての進捗を与えること、それは即ち自分の死を意味するのだ。",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "そして...彼が選んだ決断は...",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "数年後",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "ロリパイ（兄貴からもらった進捗であたいはこうしてまだ走れる）",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ（けど、もう兄貴はいない…）",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ（兄貴…、進捗はね。人に与えられるものではない。与えるものでもない。）",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ（ともに、仲間とともに作っていくもんなんだよ。なのに…）",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「どうして、どうしてなんだよ！兄貴！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "？？？「ふっ、その様子じゃまだ泣き虫は治ってないみたいだな」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「そ、その声は！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「よう」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「兄貴……！　壊れたはずじゃ！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズ「あのとき、魔王が奪った進捗が俺を救ったんだ。奇跡…かな」",
    "id": "M",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "ロリパイ「兄貴！！」",
    "id": "S",
    "motion": [
      {
        "text": "delight",
        "motion": "frontFrip"
      },
      {
        "text": "angry",
        "motion": "up"
      },
      {
        "text": "sadness",
        "motion": "down"
      },
      {
        "text": "atack",
        "motion": "forward"
      },
      {
        "text": "avoid",
        "motion": "rightFlip"
      },
      {
        "text": "none",
        "motion": "stay"
      }
    ]
  },
  {
    "text": "マーズに抱き着くロリパイ",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "俺たちの進捗は、多くの進捗から生み出されたものだ。",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "一つの進捗が、新しい進捗を生み、次の世代へと受け継がれていく。",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "俺たちは一人じゃない。",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "俺たちの進捗は終わらないのだ。",
    "id": "",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  },
  {
    "text": "ロリパイ「あなたの進捗、どうですか？」",
    "id": "S",
    "motion": [
      {
        "text": "",
        "motion": ""
      }
    ]
  }
];

