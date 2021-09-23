import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../component/FormContainer";
import { registerUser } from "../actions/authActions";
import { connect } from "react-redux";

const RegisterScreen = ({ auth: { userInfo }, history, registerUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    if (userInfo !== null) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [userInfo, history]);
  const submitForm = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password does not match");
    } else {
      const formData = {
        name: name,
        email: email,
        password: password,
      };
      registerUser(formData);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <FormContainer>
      <Form onSubmit={submitForm}>
        <h4 className="my-3">Register User</h4>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account? <Link to="/login">login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { registerUser })(RegisterScreen);
