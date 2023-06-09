//publisher.js
const mqtt = require("mqtt");
require("dotenv").config();

//the client id is used by the MQTT broker to keep track of clients and and their // state
const clientId = "mqttjs_" + "6f9ea7c7-6297-4283-b72d-7d673d3473fd";
const client = mqtt.connect("mqtt://broker.hivemq.com", {
    clientId: clientId,
    clean: false,
});

// console.log(process.env.BROKER_URL, 'client', clientId)

const topicName = "/device/6f9ea7c7-6297-4283-b72d-7d673d3473fd";

client.on("connect", function (connack) {
    console.log("client connected", connack);
    // on client connection publish messages to the topic on the server/broker
    const payload = { 33333: "the above DataPoint model" };
    client.publish(
        topicName,
        JSON.stringify(payload),
        { qos: 1, retain: true },
        (PacketCallback, err) => {
            if (err) {
                console.log(err, "MQTT publish packet");
            }
        }
    );

    //assuming messages comes in every 3 seconds to our server and we need to publish or process these messages
    setInterval(() => console.log("Message published"), 3000);
});

client.on("error", function (err) {
    console.log("Error: " + err);
    if (err.code == "ENOTFOUND") {
        console.log(
            "Network error, make sure you have an active internet connection"
        );
    }
});

client.on("close", function () {
    console.log("Connection closed by client");
});

client.on("reconnect", function () {
    console.log("Client trying a reconnection");
});

client.on("offline", function () {
    console.log("Client is currently offline");
});
