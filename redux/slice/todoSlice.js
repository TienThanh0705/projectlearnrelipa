const actionTypes = Object.freeze({
  ADD_TODO: "ADD_TODO",
  DELETE_ONE: " DELETE_ONE",
  DELETE_ALL: "DELETE_ALL",
  UPDATE_TODO: "UPDATE_TODO",
  CHECK_ONE: "CHECK_ONE",
  CHECK_ALL: "CHECK_ALL",
});

const initState = {
  listTodos: [],
};

// Action
export const addTodo = (payload) => {
  return {
    type: actionTypes.ADD_TODO,
    payload,
  };
};

export const editValue = (payload) => {
  return {
    type: actionTypes.UPDATE_TODO,
    payload,
  };
};

export const deleteOne = (payload) => {
  return {
    type: actionTypes.DELETE_ONE,
    payload,
  };
};

export const deleteAll = (payload) => {
  return {
    type: actionTypes.DELETE_ALL,
    payload,
  };
};

export const checkOne = (payload) => {
  return {
    type: actionTypes.CHECK_ONE,
    payload,
  };
};

export const checkAll = (payload) => {
  return {
    type: actionTypes.CHECK_ALL,
    payload,
  };
};

//Reducer
const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return {
        ...state,
        listTodos: [...state.listTodos, action.payload],
      };

    case actionTypes.UPDATE_TODO:
      return {
        ...state,
        listTodos: action.payload,
      };

    case actionTypes.DELETE_ONE:
      return {
        ...state,
        listTodos: action.payload,
      };

    case actionTypes.DELETE_ALL:
      return {
        ...state,
        listTodos: action.payload,
      };

    case actionTypes.CHECK_ONE:
      return {
        ...state,
        listTodos: action.payload,
      };

    case actionTypes.CHECK_ALL:
      return {
        ...state,
        listTodos: action.payload,
      };
    default:
      return state;
  }
};
export default todoReducer;
