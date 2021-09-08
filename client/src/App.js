import { Container } from "react-bootstrap";
import Footer from "./component/Footer";
import Header from "./component/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/product/:id" exact component={ProductScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
