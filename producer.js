const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('./config');
const kafka_topic = config.kafka_topic;

pushEvent = (payloads) => {
 let push_status = producer.send(payloads, (err, data) => {
      if (err) {
        console.log('[kafka-producer -> '+kafka_topic+']: broker update failed');
      } else {
        console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
      }
    });
}

try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient("localhost:9092");
  var producer = new Producer(client);
  producer.on('ready', async function() {
    console.log('producer ready');
  });

  producer.on('error', function(err) {
    console.log(err);
    console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
    throw err;
  });
}
catch(e) {
  console.log(e);
}

module.exports = {
  pushEvent
}