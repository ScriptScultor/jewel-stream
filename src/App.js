import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AboutUs from "./Pages/About/About";
import Contact from "./Pages/Contact/ContactUs";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Homepage/Home/Home";
import Login from "./Pages/Login/Login";
import PrivateRoute from "./Pages/Login/PrivateRoute";
import NotFound from "./Pages/NotFound/NotFound";
import Products from "./Pages/Products/Products";
import Registration from "./Pages/Registration/Registration";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

function App() {
  const userData = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/header">
            <Header />
          </Route>
          <Route exact path="/footer">
            <Footer />
          </Route>
          <Route exact path="/login">
            {userData.isAuthenticated ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/registration">
            {userData.isAuthenticated ? <Redirect to="/" /> : <Registration />}
          </Route>
          <Route exact path="/products/:mainCategory/:subCategory">
            <Products />
          </Route>
          <Route exact path="/products/:mainCategory/:subCategory/:id">
            <ProductDetails />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/about">
            <AboutUs />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
