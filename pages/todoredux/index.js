import clsx from "clsx";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import {
  addTodo,
  checkAll,
  checkOne,
  deleteAll,
  deleteOne,
  editValue,
} from "../../redux/slice/todoSlice";
import DefaultLayout from "../../layout/defaultLayout";
import Head from "next/head";

const TodoRedux = () => {
  const dispatch = useDispatch();
  const listTodos = useSelector((state) => state.todo.listTodos);
  const [listTodosCoppy, setListTodosCoppy] = useState();
  const [valueInput, setValueInput] = useState("");
  const [idChange, setIdChange] = useState(false);
  const [pageMount, setPageMount] = useState("ALL");
  const [showBtnClear, setShowBtnClear] = useState(false);
  const [isActiveAll, setIsActiveAll] = useState(false);
  const [lengthTodoActive, setLengthTodoActive] = useState(0);

  // Add
  // check trùng
  const handleCheckAdd = () => {
    return listTodosCoppy?.some((el) => el.value === valueInput);
  };
  const handleOnKey = (event) => {
    if (handleCheckAdd()) {
      alert("Công việc trùng");
      setValueInput("");
    } else {
      if (event.keyCode == 13 && valueInput?.trim() !== "") {
        dispatch(addTodo({ id: Date.now(), value: valueInput, active: false }));
        setValueInput("");
      }
    }
  };

  // Edit
  const handleEditValue = (data) => {
    const newListTodos = listTodos.map((todo) => {
      if (todo.id === data.id) {
        todo.value = data.valueChange;
      }
      return todo;
    });
    dispatch(editValue(newListTodos));
  };

  // Hide input
  const handlePresEdit = (event) => {
    event.keyCode === 13 && setIdChange(false);
  };

  // Delete todo
  const handleDeleteOne = (id) => {
    const newListTodos = listTodos.filter((todo) => todo.id !== id);
    dispatch(deleteOne(newListTodos));
  };

  // Delete all
  const handleDeleteAll = () => {
    const newListTodos = listTodos.filter((todo) => !todo.active);
    dispatch(deleteAll(newListTodos));
  };

  // Active one
  const handleCheckOne = (id) => {
    const newListTodos = listTodos.map((todo) => {
      if (todo.id === id) {
        todo.active = !todo.active;
      }
      return todo;
    });
    dispatch(checkOne(newListTodos));
  };

  // Check All
  const handleCheckAll = () => {
    if (pageMount === "ALL") {
      const newListTodos = listTodos.map((todo) => {
        todo.active = isActiveAll;
        return todo;
      });
      const activeAll = !isActiveAll;
      setIsActiveAll(activeAll);
      dispatch(checkAll(newListTodos));
    }
  };

  // đến số item
  const handleCountItem = () => {
    setLengthTodoActive(listTodos?.filter((todo) => !todo.active).length);
  };
  // set list todo
  const handleSetListTodos = (type) => {
    setPageMount(type);

    let newListTodos = [];
    if (type === "ALL") {
      newListTodos = listTodos;
    }
    if (type === "ACTIVE") {
      newListTodos = listTodos.filter((todo) => !todo.active);
    }

    if (type === "COMPLETED") {
      newListTodos = listTodos.filter((todo) => todo.active);
    }

    setListTodosCoppy(newListTodos);
  };

  // Check Show clear
  const handleCheckShowBtnClear = () => {
    const iShow = listTodos.some((todo) => todo.active);
    setShowBtnClear(iShow);
  };

  // List todos thay dổi gọi hàm
  useEffect(() => {
    handleCountItem();
    handleSetListTodos(pageMount);
    handleCheckShowBtnClear();
  }, [listTodos]);

  return (
    <>
      <Head>
        <title>Todo with Redux</title>
      </Head>
      <DefaultLayout>
        <div className={clsx(styles.list_todos)}>
          <h1>Todos</h1>
          <div className={clsx(styles.input_add_todo)}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={clsx(styles.icon_down)}
              onClick={() => handleCheckAll()}
            />
            <input
              value={valueInput}
              placeholder="What needs to be done ?"
              onKeyDown={handleOnKey}
              onChange={(e) => setValueInput(e.target.value)}
            />
          </div>
          <div className={clsx(styles.list_todos_content)}>
            {listTodosCoppy?.map((todo) => (
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
                    disabled={idChange === todo.id ? false : true}
                    onKeyDown={handlePresEdit}
                    onChange={(e) =>
                      handleEditValue({
                        id: todo.id,
                        valueChange: e.target.value,
                      })
                    }
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

          {listTodos?.length > 0 && (
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
                  <p onClick={() => handleSetListTodos("ALL")}>All</p>
                </li>
                <li
                  className={`size_controll ${
                    pageMount == "ACTIVE" ? "active" : ""
                  }`}
                >
                  <p onClick={() => handleSetListTodos("ACTIVE")}>Active</p>
                </li>
                <li
                  className={`size_controll ${
                    pageMount == "COMPLETED" ? "active" : ""
                  }`}
                >
                  <p onClick={() => handleSetListTodos("COMPLETED")}>
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

export default TodoRedux;
