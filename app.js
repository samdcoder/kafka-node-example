const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pushEvent = require('./producer.js').pushEvent;
const config = require('./config')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3005, function(){
	console.log('app running on port 3005');
});

app.post('/push-event', function(req,res){
	const message = req.body.message || "Default message";
	pushEvent( [{
      topic: config.kafka_topic,
      messages: message    
  }]);
	res.send('success');

});