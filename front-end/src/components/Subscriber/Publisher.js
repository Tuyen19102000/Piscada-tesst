import React, { useContext } from "react";
import { Card, Form, Input, Row, Col, Button, Select } from "antd";
import { QosOption } from "../Subscriber/index";
import { useLocation } from "react-router";

const Publisher = ({ publish }) => {
    const [form] = Form.useForm();
    const qosOptions = useContext(QosOption);
    const params = useLocation();
    // topic, QoS for publishing message
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
        publish(values);
    };

    const PublishForm = (
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
                <Col span={24}>
                    <Form.Item label="Payload" name="payload">
                        {params.pathname === "/device" ? (
                            <Select
                                options={[
                                    {
                                        label: "true",
                                        value: "true",
                                    },
                                    {
                                        label: "false",
                                        value: "false",
                                    },
                                ]}
                            />
                        ) : (
                            <Input type="number" max={100} />
                        )}
                    </Form.Item>
                </Col>
                <Col span={8} offset={16} style={{ textAlign: "right" }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Publish
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );

    return <Card title="Publisher">{PublishForm}</Card>;
};

export default Publisher;
