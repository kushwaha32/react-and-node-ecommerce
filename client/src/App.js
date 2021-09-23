import { Container } from "react-bootstrap";
import Footer from "./component/Footer";
import Header from "./component/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./privateRoute/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/login" exact component={LoginScreen} />
            <Route path="/register" exact component={RegisterScreen} />
            <PrivateRoute path="/profile" exact component={ProfileScreen} />
            <Route path="/" exact component={HomeScreen} />
            <Route path="/product/:id" exact component={ProductScreen} />
            <Route path="/cart" exact component={CartScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
