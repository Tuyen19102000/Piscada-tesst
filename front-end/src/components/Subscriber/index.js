import Publisher from "../Subscriber/Publisher.js";
import Subscriber from "../Subscriber/Subscriber.js";
import Receiver from "../Subscriber/Receiver.js";
import React, { createContext, useContext, useState } from "react";
import { DataContext } from "../../context/DataContext.js";

export const QosOption = createContext([]);
// https://github.com/mqttjs/MQTT.js#qos
const qosOption = [
    {
        label: "0",
        value: 0,
    },
    {
        label: "1",
        value: 1,
    },
    {
        label: "2",
        value: 2,
    },
];
const SubscriberComponent = () => {
    const { payload, client } = useContext(DataContext);
    console.log(client);
    const [isSubed, setIsSub] = useState(false);
    const mqttPublish = (context) => {
        if (client) {
            // topic, QoS & payload for publishing message
            const { topic, qos, payload } = context;
            client.publish(topic, payload, { qos }, (error) => {
                if (error) {
                    console.log("Publish error: ", error);
                }
            });
        }
    };

    const mqttSub = (subscription) => {
        if (client) {
            // topic & QoS for MQTT subscribing
            const { topic, qos } = subscription;
            // subscribe topic
            // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
            client.subscribe(topic, { qos }, (error) => {
                if (error) {
                    console.log("Subscribe to topics error", error);
                    return;
                }
                console.log(`Subscribe to topics: ${topic}`);
                setIsSub(true);
            });
        }
    };

    // unsubscribe topic
    // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
    const mqttUnSub = (subscription) => {
        if (client) {
            const { topic, qos } = subscription;
            client.unsubscribe(topic, { qos }, (error) => {
                if (error) {
                    console.log("Unsubscribe error", error);
                    return;
                }
                console.log(`unsubscribed topic: ${topic}`);
                setIsSub(false);
            });
        }
    };

    return (
        <>
            <QosOption.Provider value={qosOption}>
                <Subscriber
                    sub={mqttSub}
                    unSub={mqttUnSub}
                    showUnsub={isSubed}
                />
                <Publisher publish={mqttPublish} />
            </QosOption.Provider>
            <Receiver payload={payload} />
        </>
    );
};
export default SubscriberComponent;
