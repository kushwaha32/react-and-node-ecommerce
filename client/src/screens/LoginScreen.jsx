import { Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import FormContainer from "../component/FormContainer";
import { getAuthUser } from "../actions/authActions";

const LoginScreen = ({ auth: { userInfo }, location, history, getAuthUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
      if(userInfo !== null){
          history.push("/")
      }
     // eslint-disable-next-line 
  },[userInfo, history]);
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };

    getAuthUser(formData);

    setEmail("");
    setPassword("");
  };
  return (
    <FormContainer>
      <Form onSubmit={formSubmit}>
        <h3 className="my-3">LOGIN FORM</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" className="mb-3" type="submit">
          Submit
        </Button>
      </Form>
      <Row>
        <Col>
          New Customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getAuthUser })(LoginScreen);
