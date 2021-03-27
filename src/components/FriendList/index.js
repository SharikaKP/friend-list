import React, { useState, useMemo } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const FriendList = () => {
  const [list, setList] = useState([
    { id: 0, name: "Adam" },
    { id: 1, name: "John" },
    { id: 2, name: "Ram" },
    { id: 3, name: "Athira" },
  ]);
  const [newName, setNewName] = useState();
  const onSubmit = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      setNewName('');
      setList([...list, { id: list.length, name: newName }]);
    }
  };
  const [search, setSearch] = useState("");
  const onDelete = (id) => {
    setList(list.filter((item) => item.id !== parseInt(id)));
  };
  const onSearchChange = (value) => {
    setSearch(value);
  };

  const listData = useMemo(() => {
    let modifiedList = list;
    if (search) {
      modifiedList = modifiedList.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return modifiedList;
  }, [list, search]);

  return (
    <Card className="card">
      <Card.Header className="card-header">
        <strong>Friends List</strong>
      </Card.Header>
      <ListGroup variant="flush">
        <Form>
          <Row>
            <Col>
              <Form.Control
                placeholder="Search"
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                onChange={(event) => setNewName(event.target.value)}
                placeholder="Enter your friend's name"
                onKeyPress={onSubmit}
                value={newName}
              />
            </Col>
          </Row>
        </Form>
        {listData.length > 0 &&
          listData.map((item) => (
            <ListGroup.Item key={item.id}>
              <div className="list-item">
                <strong>{item.name}</strong>
                <div>is your friend</div>
              </div>
              <span className="icon" onClick={() => onDelete(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Card>
  );
};

export default FriendList;
