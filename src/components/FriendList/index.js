import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./styles.css";

const FriendList = () => {
  const [list, setList] = useState([
    { id: 0, name: "Adam" },
    { id: 1, name: "John" },
    { id: 2, name: "Ram" },
    { id: 3, name: "Athira" },
  ]);
  const [newName, setNewName] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    setList([...list, { id: list.length, name: newName }]);
  };
  return (
    <Card class="card">
      <Card.Header class="card-header">
        <strong>Friends List</strong>
      </Card.Header>
      <ListGroup variant="flush">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Control
                onChange={(event) => setNewName(event.target.value)}
                placeholder="Enter your friend's name"
              />
            </Col>
          </Row>
        </Form>
        {list.length > 0 &&
          list.map((item) => (
            <ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>
          ))}
      </ListGroup>
    </Card>
  );
};

export default FriendList;
