import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import airtpods from "../images/airpods.jpg";
import Rating from "../component/Rating";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getSingleProduct } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

const ProductScreen = ({
  match,
  pro: { product, loading, error },
  getSingleProduct,
  addToCart
}) => {
  const [qty, setQty] = useState(1);
  useEffect(() => {
    getSingleProduct(match.params.id);

    // eslint-disable-next-line
  }, [match]);

  const cartTriger = () => {
    addToCart(product._id, qty)
  }

  if (loading === false && product === null) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={airtpods} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty :</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={product.countInStock === 0}
                  onClick={ cartTriger }
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
const mapStateToProps = (state) => ({
  pro: state.products,
  cart: state.cart
});
export default connect(mapStateToProps, { getSingleProduct, addToCart })(ProductScreen);
