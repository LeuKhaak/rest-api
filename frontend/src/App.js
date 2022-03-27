import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [usersList, setUsersList] = useState([]);

  const edit = (event) => {
    if (event.target.name === "id") setId(event.target.value);
    else setUser(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    if (id.length > 1 && user.length > 1) {
      const newList = [...usersList];
      const newUser = { id: id, user: user, isMarked: false };
      newList.push(newUser);
      setUsersList(newList);
      setId("");
      setUser("");
    }
  };

  const mark = (id) => {
    const newList = [...usersList];
    const ind = newList.findIndex((el) => el.id === id);
    newList[ind].isMarked = !newList[ind].isMarked;
    setUsersList(newList);
  };

  const deleteUser = (id) => {
    const newList = [...usersList];
    const list = newList.filter((el) => el.id !== id);
    setUsersList(list);
  };

  async function request(url, method = "GET", data = null) {
    try {
      const headers = {};
      let body;
      if (data) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(data);
      }
      // @ts-ignore
      const respons = await fetch(url, { method, headers, body });
      console.log(respons);
      return await respons.json();
    } catch (e) {
      console.warn("Error:", e.message);
    }
  }

  useEffect(() => {
    request("http://localhost:5000/api/users");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <form className="" onSubmit={submit}>
        <input name="id" value={id} onChange={(event) => edit(event)} />
        <input name="user" value={user} onChange={(event) => edit(event)} />
        <input type="submit" value="Отправить" />
      </form>
      <div className="list">
        {usersList &&
          usersList.map((el) => (
            <div
              key={el.id}
              className="user"
              style={{
                backgroundColor: el.isMarked ? "rgb(180, 222, 247)" : "",
              }}
            >
              <div>Id: {el.id}</div>
              <div>User: {el.user}</div>
              <button className="btn" onClick={() => mark(el.id)}>
                MARK
              </button>
              <button className="btn delete" onClick={() => deleteUser(el.id)}>
                DELETE
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
