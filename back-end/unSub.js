const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com");
const mClient = client;

// encapsulate a route function
mClient.route = (topic, handler) => {
    mClient.subscribe(topic);
    mClient.on("message", (top, message) => {
        console.log(top);
        const ctx = {}; // generate a context object from a node.js framework
        ctx.topic = top;
        ctx.message = message;
        // maybe here we have some middleware calls
        handler.call(ctx);
    });
};

/**
 * we call route func to init our server
 */
mClient.route("temp", () => {});

/**
 * we unsubscribe some topics at other places
 */
mClient.unsubscribe("temp");

/**
 * and we subscribe again
 * now it will result two times of calling route function
 */
mClient.route("temp1", () => {});
