import React, { useContext } from "react";
import { Card, Form, Input, Row, Col, Button, Select } from "antd";
import { QosOption } from "../Subscriber/index";
import { useLocation, useParams } from "react-router";

const Subscriber = ({ sub, unSub, showUnsub }) => {
    const [form] = Form.useForm();
    const qosOptions = useContext(QosOption);
    const params = useLocation();
    // topic & QoS for MQTT subscribing
    const record =
        params.pathname === "/device"
            ? {
                  topic: "/device/6f9ea7c7-6297-4283-b72d-7d673d3473fd",
                  qos: 0,
              }
            : {
                  topic: "/device/6f9ea7c7-6297-4283-b72d-7d673d3473fd/Temperature",
                  qos: 0,
              };

    const onFinish = (values) => {
        sub(values);
    };

    const handleUnsub = () => {
        const values = form.getFieldsValue();
        unSub(values);
    };

    const SubForm = (
        <Form
            layout="vertical"
            name="basic"
            form={form}
            initialValues={record}
            onFinish={onFinish}
        >
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item label="Topic" name="topic">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="QoS" name="qos">
                        <Select options={qosOptions} />
                    </Form.Item>
                </Col>
                <Col span={8} offset={16} style={{ textAlign: "right" }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Subscribe
                        </Button>
                        {showUnsub ? (
                            <Button
                                type="danger"
                                style={{ marginLeft: "10px" }}
                                onClick={handleUnsub}
                            >
                                Unsubscribe
                            </Button>
                        ) : null}
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );

    return <Card title="Subscriber">{SubForm}</Card>;
};

export default Subscriber;
