import React, { useState, useMemo } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import Pagination from "../Pagination";

const FriendList = () => {
  const ITEMS_PER_PAGE = 4;
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([
    { id: 0, favorite: false, name: "Adam" },
    { id: 1, favorite: true, name: "John" },
    { id: 2, favorite: false, name: "Ram" },
    { id: 3, favorite: true, name: "Athira" },
  ]);
  const [newName, setNewName] = useState();
  const onSubmit = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      setNewName("");
      setList([...list, { id: list.length, favorite: false, name: newName }]);
    }
  };
  const [search, setSearch] = useState("");
  const onDelete = (id) => {
    setList(list.filter((item) => item.id !== Number(id)));
  };
  const onLike = (id) => {
    const newList = [...list];
    const index = newList.findIndex((item) => item.id === Number(id));
    newList[index].favorite = !newList[index].favorite;
    setList(newList);
  };
  const onSearchChange = (value) => {
    setSearch(value);
  };
  const sortByFav = () => {
    const newList = [...list];
    newList.sort(function (a, b) {
      return Number(b.favorite) - Number(a.favorite);
    });
    setList(newList);
  };

  const listData = useMemo(() => {
    let modifiedList = list;
    if (search) {
      modifiedList = modifiedList.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(modifiedList.length);
    return modifiedList.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [currentPage, list, search]);

  return (
    <Card className="card">
      <Card.Header className="card-header">
        <strong>Friends List</strong>
      </Card.Header>
      <ListGroup variant="flush">
        <Form>
          <Form.Control
            placeholder="Search"
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <Form.Control
            onChange={(event) => setNewName(event.target.value)}
            placeholder="Add Friend"
            onKeyPress={onSubmit}
            value={newName}
          />
        </Form>
        {listData.length > 0 &&
          listData.map((item) => (
            <ListGroup.Item key={item.id}>
              <div className="list-item">
                <strong>{item.name}</strong>
                <div>is your friend</div>
              </div>
              <span
                className="icon icon-color-not-fav"
                onClick={() => onDelete(item.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span className="icon" onClick={() => onLike(item.id)}>
                {item.favorite ? (
                  <span className="icon-color-fav">
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                ) : (
                  <span className="icon-color-not-fav">
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                )}
              </span>
            </ListGroup.Item>
          ))}
      </ListGroup>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <button onClick={sortByFav}>Show Favorites on top</button>
    </Card>
  );
};

export default FriendList;
