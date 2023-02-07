import { useEffect, useState } from "react";
import clsx from "clsx";
import * as ReactBootStrap from "react-bootstrap";
import { get } from "../../utils/baseRequest";
import styles from "./styles.module.scss";
import Head from "next/head";
import DefaultLayout from "../../layout/defaultLayout";

const Weather = () => {
  const [dataWeather, setDataWeather] = useState(null);
  const [inputSearch, setInputSearch] = useState(); // (003)
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState("winter");
  const [dateWeather, setDateWeather] = useState("");
  const [hour, setHour] = useState("");

  // Value input thay đổi hàm này được gọi (001)
  const handleGetDataWeather = async (value) => {
    try {
      setLoading(true);
      const res = await get("http://api.weatherapi.com/v1/current.json", {
        params: {
          key: "220b162ef6574c97ac432326212612",
          q: value,
          alerts: "yes",
        },
      });
      // Nếu lấy data thành công !
      if (res?.data && res?.status === 200) {
        // set data weather vào state
        setDataWeather(res.data);
        // C set giờ và ngày (002)
        handleGetDateWeather(res.data);
        //  set backgroud
        handleSetBgrtWeather(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // Lấy ra ngày giờ & set state ngày giờ
  const handleGetDateWeather = (data) => {
    const newDateWeather = new Date(data?.location?.localtime);
    setDateWeather(
      `${newDateWeather.getDate()}-
      ${newDateWeather.getMonth() + 1}-
      ${newDateWeather.getFullYear()}`
    );
    setHour(`${newDateWeather.getHours()}:${newDateWeather.getMinutes()}`);
  };

  // Handle set BGR layout
  const handleSetBgrtWeather = (data) => {
    // hours là giờ , temperature là độ c
    const hours = new Date(data?.location?.localtime).getHours();
    const temperature = data?.current?.temp_c;
    // Nếu thời gian nhỏ hơn 20 giờ và lớn hơn 5h
    if (hours < 20 && hours > 5) {
      if (temperature > 30) {
        setBackground("hot");
        return;
      }
      if (temperature > 20 && temperature < 30) {
        setBackground("cooling");
        return;
      }
      if (temperature > 10 && temperature < 20) {
        setBackground("winter");
        return;
      }
      if (temperature < 8) {
        setBackground("cool");
        return;
      }
      return;
    }
    setBackground("night");
  };
  // Xóa dấu tiếng việt && set value input
  const handleSetValueInput = (str) => {
    const newValue = str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
    // Set value input
    setInputSearch(newValue);
  };

  useEffect(() => {
    handleGetDataWeather(inputSearch);
  }, []);
  return (
    <>
      <Head>
        <title>Weather page</title>
      </Head>
      <DefaultLayout>
        <div className={clsx(styles[background], styles.layout_weather)}>
          <div className={clsx(styles.from_weather)}>
            <div className={clsx(styles.from_weather_content)}>
              <div className={clsx(styles.total_search)}>
                <input
                  placeholder="City search..."
                  className={clsx(styles.input_search)}
                  onChange={(e) => handleSetValueInput(e.target.value)}
                />
                <button
                  type="button"
                  className={clsx(styles.button_search)}
                  onClick={() => handleGetDataWeather(inputSearch)}
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
                  {loading ? (
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
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Weather;
