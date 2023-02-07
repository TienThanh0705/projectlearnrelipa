import { get } from "../../utils/baseRequest";

const actionTypes = Object.freeze({
  // Action Type
  CHANGE_LOADING: " CHANGE_LOADING",
  GET_DATA_WEATHER_SUCCESS: "GET_DATA_WEATHER_SUCCESS",
  GET_DATA_WEATHER_FAIL: "GET_DATA_WEATHER_FAIL",
});

const initState = {
  loading: true,
  dataWeather: {},
};

export const setLoadingAPI = (status) => {
  return {
    type: actionTypes.CHANGE_LOADING,

    payload: status,
  };
};

//action weather
export const getDataWeatherStart = (value) => async (dispatch) => {
  try {
    dispatch(setLoadingAPI(true));

    const res = await get("http://api.weatherapi.com/v1/current.json", {
        params: {
          key: "220b162ef6574c97ac432326212612",
          q: value,
          alerts: "yes",
        },
      });
    // Nếu lấy data thành công !
    if (res?.data && res?.status === 200) {
      dispatch({
        type: actionTypes.GET_DATA_WEATHER_SUCCESS,
        dataWeather: res.data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_DATA_WEATHER_FAIL,
        dataWeather: {},
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_DATA_WEATHER_FAIL,
      dataWeather: {},
    });
  }
  finally {
    dispatch(setLoadingAPI(false));
  }
};

const weatherReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOADING:
      state.loading = action.loading;
      return {
        ...state,
        loading: action.payload,
      };

    case actionTypes.GET_DATA_WEATHER_SUCCESS:
      state.dataWeather = action.dataWeather;
      return {
        ...state,
      };

    case actionTypes.GET_DATA_WEATHER_FAILURE:
      state.dataWeather = action.dataWeather;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default weatherReducer;
