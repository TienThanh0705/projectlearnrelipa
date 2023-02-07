import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataWeatherStart,
  setLoadingAPI,
} from "../../redux/slice/weatherSlice";
import * as ReactBootStrap from "react-bootstrap";
import styles from "./styles.module.scss";
import Head from "next/head";
import DefaultLayout from "../../layout/defaultLayout";

const WeatherRedux = () => {
  const dispatch = useDispatch();
  const dataWeatherRedux = useSelector((state) => state.weather.dataWeather);
  const loadingRedux = useSelector((state) => state.weather.loading);
  const [background, setBackground] = useState("winter");
  const [dataWeather, setDataWeather] = useState();
  const [dateWeather, setDateWeather] = useState("");
  const [hour, setHour] = useState("");
  const [valueSearch, setValueSearch] = useState("ha noi");

  const handleGetDataWeather = () => {
    dispatch(setLoadingAPI());
    dispatch(getDataWeatherStart(valueSearch));
  };

  // Handle get date weather
  const handleGetDateWeather = () => {
    const newDateWeather = new Date(dataWeather?.location?.localtime);
    setDateWeather(
      `${newDateWeather.getDate()}-${
        newDateWeather.getMonth() + 1
      }-${newDateWeather.getFullYear()}`
    );
    setHour(`${newDateWeather.getHours()}:${newDateWeather.getMinutes()}`);
  };

  // Handle set BGR layout
  const handleSetBgrLayoutWeather = () => {
    if (
      new Date(dataWeather?.location?.localtime).getHours() < 20 &&
      new Date(dataWeather?.location?.localtime).getHours() > 5
    ) {
      if (dataWeather?.current?.temp_c > 30) {
        setBackground("summer");
      }
      if (
        dataWeather?.current?.temp_c > 20 &&
        dataWeather?.current?.temp_c < 30
      ) {
        setBackground("cooling");
      }
      if (
        dataWeather?.current?.temp_c > 10 &&
        dataWeather?.current?.temp_c < 20
      ) {
        setBackground("winter");
      }
      if (dataWeather?.current?.temp_c < 10) {
        setBackground("cool");
      }
    } else {
      setBackground("night");
    }
  };

  // Xóa dấu tiếng việt
  const handleSetValueInput = (str) => {
    const newValue = str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
    setValueSearch(newValue);
  };

  // Set data weather
  useEffect(() => {
    setDataWeather(dataWeatherRedux);
  }, [dataWeatherRedux]);

  // Set new data weather
  useEffect(() => {
    handleGetDataWeather(valueSearch);
  }, []);

  // Get date
  useEffect(() => {
    handleGetDateWeather();
    handleSetBgrLayoutWeather();
  }, [dataWeather]);

  return (
    <>
      <Head>
        <title>WeatherRedux</title>
      </Head>
      <DefaultLayout>
        <div className={clsx(styles[background], styles.layout_weather)}>
          <div className={clsx(styles.from_weather)}>
            <div className={clsx(styles.from_weather_content)}>
              <div className={clsx(styles.total_search)}>
                <input
                  placeholder="City search..."
                  value={valueSearch}
                  className={clsx(styles.input_search)}
                  onChange={(e) => handleSetValueInput(e.target.value)}
                />
                <button
                  type="button"
                  className={clsx(styles.button_search)}
                  onClick={() => handleGetDataWeather(valueSearch)}
                >
                  Search
                </button>
              </div>

              <div className={clsx(styles.total_heading)}>
                <div className={clsx(styles.present)}>
                  <h2 className={clsx(styles.heading)}>THỜI TIẾT HIỆN TẠI</h2>
                  <div className={clsx(styles.list_timmer)}>
                    <span>
                      Date :{" "}
                      <h3 className={clsx(styles.active_time)}>
                        {dateWeather}
                      </h3>
                    </span>
                    <span>
                      Time :{" "}
                      <h3 className={clsx(styles.active_time)}>{hour}</h3>
                    </span>
                  </div>

                  {loadingRedux ? (
                    <>
                      <ReactBootStrap.Spinner animation="border" />
                      <p className={clsx(styles.loading)}>Đang load........</p>
                    </>
                  ) : dataWeather ? (
                    <>
                      <div className={clsx(styles.icons_weather)}>
                        <img
                          src={dataWeather?.current?.condition?.icon}
                          alt="img weather"
                        />
                        <span>{dataWeather?.current?.condition?.text}</span>
                      </div>
                      <h2 className={clsx(styles.country)}>
                        {dataWeather?.location?.name} -{" "}
                        {dataWeather?.location?.country}
                      </h2>
                      <ul className={clsx(styles.list_detail_weather)}>
                        <li>
                          Nhiệt độ (độ C) :{" "}
                          <span>{dataWeather?.current?.temp_c}°C</span>
                        </li>
                        <li>
                          Nhiệt độ (độ F) :{" "}
                          <span>{dataWeather?.current?.temp_f}°F</span>
                        </li>
                        <li>
                          Nhiệt độ trung bình (độ C) :{" "}
                          <span>{dataWeather?.current?.feelslike_c}°C</span>
                        </li>
                        <li>
                          Nhiệt độ trung bình (độ F) :{" "}
                          <span>{dataWeather?.current?.feelslike_f}°F</span>
                        </li>
                        <li>
                          Độ ẩm hiện tại :{" "}
                          <span>{dataWeather?.current?.humidity}%</span>
                        </li>
                        <li>
                          Cấp độ gió :{" "}
                          <span>{dataWeather?.current?.gust_mph}</span>
                        </li>
                        <li>
                          Tốc độ gió :{" "}
                          <span>{dataWeather?.current?.wind_kph}km/h</span>
                        </li>
                        <li>
                          Chỉ số tia UV :{" "}
                          <span>{dataWeather?.current?.uv}</span>
                        </li>
                        <li>
                          Lượng mưa :{" "}
                          <span>{dataWeather?.current?.precip_mm} mm</span>
                        </li>
                      </ul>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default WeatherRedux;
