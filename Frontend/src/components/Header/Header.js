import { useSelector, useDispatch } from 'react-redux'
import classes from "./Header.module.css";
import { logout } from './../../actions/userAction.js'
import { IoIosPerson } from 'react-icons/io'

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <header className={classes.header}>
      <div className={classes.header_tours}>
        <a href="/">All Tours</a>
      </div>
      <div className={classes.header_logo}>
        <img alt="logo" src={require("./../../img/logo-green.png").default} />
      </div>
      <ul className={classes.header_login}>
        <li>
          {userInfo ? <div className={classes.loginContainer}><IoIosPerson className={classes.icon} /><a href="/">{userInfo.name}</a></div> : <a href="/auth/login">Login</a>}
        </li>
        <li>
          {userInfo !== null ? <a href="/" onClick={handleLogout}>Logout</a> : <a href="/auth/signup" >Signup</a>}
        </li>
      </ul>
    </header>
  );
};

export default Header;
