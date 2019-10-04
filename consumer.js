const bp = require('body-parser');
const config = require('./config');
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
    console.log(message);
});