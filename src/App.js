import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AboutUs from "./Pages/About/About";
import Contact from "./Pages/Contact/ContactUs";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Homepage/Home/Home";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Products from "./Pages/Products/Products";
import Registration from "./Pages/Registration/Registration";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { useEffect, useState } from "react";
import { fetchUserData } from "./store/auth/LoginAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

// Create a layout component that includes the Header
const Layout = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

function App() {
  const userData = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // Fetch user data and wait for it to complete
    dispatch(fetchUserData())
      .then(() => {
        // Data fetched successfully, set loading state to false
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors, e.g., redirect to login
        setIsLoading(false);
      });
  }, [dispatch, history]);

  if (isLoading) {
    // Display a loading message or spinner
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Layout>
              <Home />
            </Layout>
          </Route>
          <Route exact path="/home">
            <Layout>
              <Home />
            </Layout>
          </Route>
          <Route exact path="/header">
            <Layout>
              <Header />
            </Layout>
          </Route>
          <Route exact path="/footer">
            <Layout>
              <Footer />
            </Layout>
          </Route>
          <Route exact path="/login">
            {userData.isAuthenticated ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/registration">
            {userData.isAuthenticated ? <Redirect to="/" /> : <Registration />}
          </Route>
          <Route exact path="/products/:mainCategory/:subCategory">
            <Layout>
              <Products />
            </Layout>
          </Route>
          <Route exact path="/products/:mainCategory/:subCategory/:id">
            <Layout>
              <ProductDetails />
            </Layout>
          </Route>
          <Route exact path="/products">
            <Layout>
              <Products />
            </Layout>
          </Route>
          <Route exact path="/contact">
            <Layout>
              <Contact />
            </Layout>
          </Route>
          <Route exact path="/about">
            <Layout>
              <AboutUs />
            </Layout>
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="*">
            <Layout>
              <NotFound />
            </Layout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
