import { Col, Row } from "react-bootstrap";
import Product from "../component/Product";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../actions/productActions";


const HomeScreen = ({ pro: {products, loading}, getProducts }) => {
  
  useEffect(() => {
    getProducts();

    // eslint-disable-next-line
  }, [])
  
  if(loading === false && products === null){
    return(
        <div>loading...</div>
    )
  }

  return (
    <>
      <h3>Products lists</h3>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

const mapStateToProps = state => ({
    pro: state.products
})

export default connect(mapStateToProps, { getProducts })(HomeScreen);
