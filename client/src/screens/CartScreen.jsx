import { connect } from "react-redux";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import airpods from "../images/airpods.jpg";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ cart: { cartItems }, addToCart, removeFromCart }) => {
  const checkoutHandler = () => {};
  return (
    <Row>
      <Col md={8}>
        <h3>Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/"> Go back </Link>
          </div>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product_id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={airpods}
                      alt={item.product_name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product_id}`}>
                      {item.product_name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.product_price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCart(item.product_id, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCart(item.product_id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>
                Subtotal ({cartItems.reduce((accu, item) => accu + item.qty, 0)}
                ) items
              </h4>
              $
              {cartItems
                .reduce((accu, item) => accu + item.qty * item.product_price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn w-100"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { addToCart, removeFromCart })(
  CartScreen
);
