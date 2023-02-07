import clsx from "clsx";
import { useState, useEffect } from "react";
import Head from "next/head";
import DefaultLayout from "../../layout/defaultLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";

const Todo = () => {
  const [original, setOriginal] = useState([]);
  const [pageMount, setPageMount] = useState("ALL");
  const [idChange, setIdChange] = useState(false); // 1
  const [valueInput, setValueInput] = useState("");
  const [activeAll, setActiveAll] = useState(false);
  const [listTodos, setListTodos] = useState(original);
  const [showBtnClear, setShowBtnClear] = useState(false);
  const [lengthTodoActive, setLengthTodoActive] = useState(0);

  // Add todos
  const handleOnKey = (event) => {
    if (event.keyCode === 13 && valueInput?.trim() !== "") {
      if (!handleCheckAdd()) {
        setOriginal((prevState) => [
          ...prevState,
          { id: Date.now(), value: valueInput, active: false },
        ]);
        setValueInput("");
        setListTodos((prevState) => [
          ...prevState,
          { id: Date.now(), value: valueInput, active: false },
        ]);
      } else {
        alert("Phần tử đã tồn tại !!!");
        setValueInput("");
      }
    }
    event.keyCode === 13 && setIdChange(false);
  };

  const handleCheckAdd = () => {
    return original.some((el) => el.value === valueInput);
  };

  const handleEditValue = (id, value) => {
    setOriginal(
      original.map((el) => {
        if (el.id === id) el.value = value;
        return el;
      })
    );
    setListTodos(original);
  };

  const handleCheckOne = (id) => {
    setOriginal(
      original.map((el) => {
        if (el.id === id) el.active = !el.active;
        return el;
      })
    );
  };

  const handleCheckAll = () => {
    setOriginal(
      listTodos.map((el) => {
        el.active = activeAll;
        return el;
      })
    );
  };

  const handleDeleteOne = (id) => {
    setOriginal(original.filter((el) => el.id !== id));
    setListTodos(original);
  };

  const handleDeleteAll = () => {
    setOriginal(original.filter((el) => el.active === false));
    setListTodos(original);
  };

  const handleShowClearAll = () => {
    setShowBtnClear(original.some((el) => el.active === true));
    setListTodos(original);
  };

  // đến số item
  const handleCountItem = () => {
    setLengthTodoActive(original.filter((el) => el.active === false).length);
  };

  // Handle set list todo if ?
  const handleGetNewListTodos = (type) => {
    setPageMount(type);
    switch (type) {
      case "ACTIVE":
        setListTodos(original.filter((el) => el.active === false));
        break;
      case "COMPLETED":
        setListTodos(original.filter((el) => el.active === true));
        break;
      case "ALL":
        setListTodos(original);
        break;
    }
  };

  // handle active all
  const handleActiveAll = () => {
    setActiveAll(!activeAll);
    handleCheckAll();
  };

  // Set list todos from setOriginal
  useEffect(() => {
    handleCountItem();
    handleShowClearAll();
  }, [original]);

  return (
    <>
      <Head>
        <title>Todos page</title>
      </Head>

      <DefaultLayout>
        <div className={clsx(styles.list_todos)}>
          <h1>Todos</h1>
          <div className={clsx(styles.input_add_todo)}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={clsx(styles.icon_down)}
              onClick={() => handleActiveAll()}
            />
            <input
              value={valueInput}
              placeholder="What needs to be done ?"
              onKeyDown={handleOnKey}
              onChange={(e) => setValueInput(e.target.value)}
            />
          </div>
          <div className={clsx(styles.list_todos_content)}>
            {listTodos?.map((todo) => (
              <div key={todo.id} className={clsx(styles.input_add_todo)}>
                <div
                  className={clsx(styles.icon_check)}
                  onClick={() => handleCheckOne(todo.id)}
                >
                  {todo.active && <FontAwesomeIcon icon={faCheck} />}
                </div>

                <div
                  onDoubleClick={() => setIdChange(todo.id)}
                  className={`content_todo ${
                    todo.active === true && "not_active"
                  }`}
                >
                  <input
                    name="todo"
                    value={todo.value}
                    disabled={idChange === todo.id ? false : true} // 2
                    onKeyDown={handleOnKey}
                    onChange={(e) => handleEditValue(todo.id, e.target.value)} // 2
                    onBlur={() => setIdChange(false)}
                  />
                </div>

                {!idChange && (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={clsx(styles.icon_delete)}
                    onClick={() => handleDeleteOne(todo.id)}
                  />
                )}
              </div>
            ))}
          </div>

          {original.length > 0 && (
            <div className={clsx(styles.list_controll)}>
              <span className={clsx(styles.size_controll)}>
                {lengthTodoActive} item left
              </span>

              <ul className={clsx(styles.list_content_controll)}>
                <li
                  className={`size_controll ${
                    pageMount == "ALL" ? "active" : ""
                  }`}
                >
                  <p onClick={() => handleGetNewListTodos("ALL")}>All</p>
                </li>
                <li
                  className={`size_controll ${
                    pageMount == "ACTIVE" ? "active" : ""
                  }`}
                >
                  <p onClick={() => handleGetNewListTodos("ACTIVE")}>Active</p>
                </li>
                <li
                  className={`size_controll ${
                    pageMount == "COMPLETED" ? "active" : ""
                  }`}
                >
                  <p onClick={() => handleGetNewListTodos("COMPLETED")}>
                    Completed
                  </p>
                </li>
              </ul>

              {showBtnClear && (
                <span
                  className={clsx(styles.item_end)}
                  onClick={() => handleDeleteAll()}
                >
                  Clear completed
                </span>
              )}
            </div>
          )}
          <ul className={clsx(styles.footer)}>
            <li>Double-click to edit a todo</li>
            <li>Created by petehunt</li>
            <li>Part of TodoMVC</li>
          </ul>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Todo;
