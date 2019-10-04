const bp = require('body-parser');
const config = require('./config');
const request = require('request');
//const sendData = require('./app.js').sendData;

var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient("localhost:9092"),
    consumer = new Consumer(
        client,
        [
            { topic: config.kafka_topic, partition: 0 }
        ],
        {
            autoCommit: false
        }
    );

  consumer.on('message', function (message) {
    if(message){
        request.post({url:'http://localhost:3005/send-to-socket', form: {key:message}}, function(err,httpResponse,body){ 
        if(err)
            console.log('error => ', err);
        else{
            console.log('body => ', body);
            }
        })    
    }
    

});