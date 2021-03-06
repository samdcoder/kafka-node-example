const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const pushEvent = require('./producer.js').pushEvent;
const config = require('./config')
const io = require('socket.io').listen(http);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

http.listen(3005, function(){
	console.log('app running on port 3005');
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
})

app.post('/push-event', function(req,res){
	// Todo fetch from data source and remove this
	const message = req.body.message || "Default message";
	pushEvent( [{
      topic: config.kafka_topic,
      messages: message    
  }]);
	res.send('success');

});

app.post('/send-to-socket', function(req, res){
	const data = req.body.key.value || "no data";
	io.emit('data', { data });
})
