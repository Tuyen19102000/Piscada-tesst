import React, { createContext, useContext, useEffect, useState } from "react";
import Connection from "./Connection.js";

import mqtt from "mqtt/dist/mqtt";
import { DataContext } from "../../context/DataContext.js";
import { Button } from "antd";
import { useNavigate } from "react-router";

const HookMqtt = () => {
    const navigate = useNavigate();
    const { client, setClient, setPayload } = useContext(DataContext);
    const [connectStatus, setConnectStatus] = useState("Connect");

    const mqttConnect = (host, mqttOption) => {
        setConnectStatus("Connecting");
        /**
         * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
         * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
         *
         * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
         * which should be specified when connecting, and the path used on EMQX is /mqtt.
         *
         * for more details about "mqtt.connect" method & options,
         * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
         */
        setClient(mqtt.connect(host, mqttOption));
    };

    useEffect(() => {
        if (client) {
            // https://github.com/mqttjs/MQTT.js#event-connect
            client.on("connect", () => {
                setConnectStatus("Connected");
                console.log("connection successful");
            });

            // https://github.com/mqttjs/MQTT.js#event-error
            client.on("error", (err) => {
                console.error("Connection error: ", err);
                client.end();
            });

            // https://github.com/mqttjs/MQTT.js#event-reconnect
            client.on("reconnect", () => {
                setConnectStatus("Reconnecting");
            });

            // https://github.com/mqttjs/MQTT.js#event-message
            client.on("message", (topic, message) => {
                const payload = { topic, message: message.toString() };
                setPayload(payload);
                console.log(
                    `received message: ${message} from topic: ${topic}`
                );
            });
        }
    }, [client]);

    // disconnect
    // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
    const mqttDisconnect = () => {
        if (client) {
            try {
                client.end(false, () => {
                    setConnectStatus("Connect");
                    console.log("disconnected successfully");
                });
            } catch (error) {
                console.log("disconnect error:", error);
            }
        }
    };

    // publish message
    // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
    console.log(connectStatus);
    return (
        <>
            <Connection
                connect={mqttConnect}
                disconnect={mqttDisconnect}
                connectBtn={connectStatus}
            />
            {connectStatus === "Connected" && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "30px",
                        gap: "30px",
                    }}
                >
                    <Button onClick={() => navigate("/device")}>
                        Go to Device Page
                    </Button>
                    <Button onClick={() => navigate("/dashboard")}>
                        Go to Dashboard Page
                    </Button>
                </div>
            )}
        </>
    );
};

export default HookMqtt;
