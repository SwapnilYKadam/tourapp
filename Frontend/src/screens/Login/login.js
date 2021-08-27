import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import classes from "./Login.module.css";
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from './../../Loader/Loader.js'
import { login, signup } from './../../actions/userAction.js'
import { useLocation } from "react-router";

const Login = () => {
  const [isLogin, setLogin] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')

  const location = useLocation();
  const method = location.pathname.split("/")[2];

  useEffect(() => {
    if (method === 'signup') {
      setLogin(false)
    } else {
      setLogin(true)
    }
  })

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, userInfo, error } = userLogin;
  const history = useHistory();

  const toggleLogin = () => {
    setLogin(!isLogin);
  };
  let isLoggedin = Boolean(userInfo);
  useEffect(() => {
    if (isLoggedin) {
      history.push('/');
    }
  }, [history, isLoggedin])

  const submitHandler = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login(email, password));
    } else {

      if (password === confirmpassword) {
        dispatch(signup(name, email, password, confirmpassword))
        // history.push('/');
      } else {
        setMessage("Password dont match.")
      }
    }
  }

  return (
    <div className={classes.loginpage}>
      {loading ? <Loader /> :
        <form className={classes.logindiv} onSubmit={submitHandler} >
          <h1 className="title">LOG INTO YOUR ACCOUNT</h1>
          {error ? <h3 className={classes.error}>{error}</h3> : null}
          {message ? <h3 className={classes.error}>{message}</h3> : null}
          {!isLogin && (
            <div>
              <label for="name">Name :</label>
              <input type="text" id="name" placeholder="Your Name" value={name} required onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div>
            <label for="email">Email Address :</label>
            <input type="email" id="email" placeholder="you@example.com" value={email} required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label for="password">Password :</label>
            <input type="password" id="password" placeholder="********" value={password} required onChange={(e) => setPassword(e.target.value)} />
          </div>
          {!isLogin && (
            <div>
              <label for="confirmpassword">Confirm Password :</label>
              <input
                type="password"
                id="confirmpassword"
                placeholder="********"
                required
                value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>
          )}
          <div>
            {isLogin ? (
              <div>
                <button className="btn" href="/" type="submit">
                  Login
              </button>
                <p className={classes.navigate}>
                  New to Natours? <span onClick={toggleLogin}>Signin</span>
                </p>
              </div>
            ) : (
                <div>
                  <button className="btn" href="/" type="submit">
                    signup
              </button>
                  <p className={classes.navigate}>
                    Alredy have an account? <span onClick={toggleLogin}>Login</span>
                  </p>
                </div>
              )}
          </div>
        </form>
      }
    </div>
  );
};

export default Login;
