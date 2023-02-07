import clsx from "clsx";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import path from "../../config/routes";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("data");
    router.push("/");
  };

  return (
    <div className={clsx(styles.nav_bar)}>
      <div className={clsx(styles.content_nav_bar)}>
        <ul className={clsx(styles.nav_bar_menu)}>
          <li>
            <Link
              style={{
                color: router.pathname === path.todo ? "red" : undefined,
              }}
              href={path.todo}
            >
              TODO PAGE
            </Link>
          </li>

          <li>
            <Link
              style={{
                color: router.pathname === path.todoredux ? "red" : undefined,
              }}
              href={path.todoredux}
            >
              TODO REDUX
            </Link>
          </li>

          <li>
            <Link
              style={{
                color: router.pathname === path.weather ? "red" : undefined,
              }}
              href={path.weather}
            >
              WEATHER
            </Link>
          </li>

          <li>
            <Link
              style={{
                color:
                  router.pathname === path.weatherredux ? "red" : undefined,
              }}
              href={path.weatherredux}
            >
              WEATHER REDUX
            </Link>
          </li>

          <li>
            <Link
              style={{
                color: router.pathname === path.listuser ? "red" : undefined,
              }}
              href={path.listuser}
            >
              USER PAGE
            </Link>
          </li>

          <li>
            <Link
              style={{
                color: router.pathname === path.form ? "red" : undefined,
              }}
              href={path.form}
            >
              FORM
            </Link>
          </li>

          <li>
            <Link
              style={{
                color: router.pathname === path.formyup ? "red" : undefined,
              }}
              href={path.formyup}
            >
              FORMYUP
            </Link>
          </li>

          <li>
            <Link
              style={{
                color: router.pathname === path.formantd ? "red" : undefined,
              }}
              href={path.formantd}
            >
              FORMYUP
            </Link>
          </li>
        </ul>

        <div className={clsx(styles.nav_bar_menu)}>
          <FontAwesomeIcon
            onClick={handleLogout}
            icon={faRightFromBracket}
            className={clsx(styles.nav_bar_menu_icon)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
