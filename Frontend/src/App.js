import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/login";
import Overview from "./screens/TourOverview/Overview";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/tours/:id" exact>
            <Overview />
          </Route>
          <Route path="/auth/:method" exact>
            <Login />
          </Route>
          <Route path="/booking" exact>
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
