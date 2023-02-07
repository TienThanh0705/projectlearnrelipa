import { get } from "../../utils/baseRequest";


const initState = {
  handleJSX: {
    loading: true,
    page: 1,
  },
  dataUser: [],
};

// Actions

export const addApi = (data) => {
  return {
    type: "dataUser/addApi",
    payload: data,
  };
};

export const setLoading = (loading) => {
  return {
    type: "handleJSX/loading",
    payload: loading,
  };
};

export const changePage = (page) => {
  return {
    type: "handleJSX/page",
    payload: page,
  };
};

//Reducer
export const allUserAPI = () => async (dispatch, getData) => {
  try {
    const userAPI = await get("https://randomuser.me/api", {
      params: {
        results: 5,
        page: getData().user.handleJSX.page,
      },
    });
    const dataUser = userAPI.data.results.map((item) => {
      return {
        id: `${item.id.name} ${item.id.value}`,
        gender: item.gender,
        name: `${item.name.title} ${item.name.first} ${item.name.last}`,
        location: ` ${item.location.street.number} 
                    ${item.location.street.name} 
                    ${item.location.city}
                    ${item.location.country}`,
        email: item.email,
        age: item.dob.age,
        phone: item.phone,
        picture: item.picture.thumbnail,
      };
    });
    dispatch(addApi(dataUser));
  } catch (error) {
    alert("Hệ thống lỗi vui lòng thử lại sau");
  } finally {
    dispatch(setLoading(false));
  }
};

export const antDTableReducer = (state = initState, action) => {
  switch (action.type) {
    case "dataUser/addApi":
      return {
        ...state,

        dataUser: action.payload,
      };

    case "handleJSX/loading":
      return {
        ...state,

        handleJSX: {
          ...state.handleJSX,
          loading: false,
          loading: action.payload,
        },
      };

    case "handleJSX/page":
      return {
        ...state,

        handleJSX: { ...state.handleJSX, loading: true, page: action.payload },
      };

    default:
      return state;
  }
};
