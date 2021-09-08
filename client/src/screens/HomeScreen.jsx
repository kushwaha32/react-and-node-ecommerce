import { Col, Row } from "react-bootstrap";
import Product from "../component/Product";
import { useEffect, useState } from "react";
import axios from "axios";



const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();

    // eslint-disable-next-line
  }, [])
  const getProducts = async() => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      
    } 
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

export default HomeScreen;
