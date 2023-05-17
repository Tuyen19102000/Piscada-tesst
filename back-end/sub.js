const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com");
const topicName = "test/connection";

// connect to same client and subscribe to same topic name
client.on("connect", () => {
    // can also accept objects in the form {'topic': qos}
    client.subscribe(topicName, (err, granted) => {
        if (err) {
            console.log(err, "err");
        }
        console.log(granted, "granted");
    });
});

// on receive message event, log the message to the console
client.on("message", (topic, message, packet) => {
    if (topic === topicName) {
        console.log("something", JSON.parse(message));
    }
});
client.on("packetsend", (packet) => {
    console.log(packet, "packet2");
});
