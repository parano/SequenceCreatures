var express = require('express');
var GameboardReader = require('./GameboardReader');
var ReadingQueue = require('./ReadingQueue');
var readline = require('readline');

var commandQueue = new ReadingQueue();
//console.log(commandQueue);

var isTesting = process.argv.length > 2 ? true : false;

if(isTesting) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', function(data){
    console.log("data received: " + data);
    commandQueue.push(data);
  });
} else {
  var settingBoard = new GameboardReader("/dev/cu.usbmodem1421", 9600, function(data){
    console.log("data received: " + data);
    commandQueue.push(data);
  });

  var instructionBoard = new GameboardReader("/dev/cu.usbmodem1411", 9600, function(data){
    console.log("data received: " + data);
    commandQueue.push(data);
  });
}

var app = express();
app.get('/instruction.json', function(req, res){
  res.setHeader("Access-Control-Allow-Origin", "*");

  if(commandQueue.isEmpty()) {
    res.end(JSON.stringify({
      empty: true
    }));
  } else {
    res.end(JSON.stringify({
      empty: false,
      data: commandQueue.next()
    }));
  }
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});


