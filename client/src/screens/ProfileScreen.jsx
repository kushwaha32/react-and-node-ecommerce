import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
const ProfileScreen = ({ auth: { userInfo } }) => {
  const { name, email } = userInfo;
  const [pname, setPname] = useState(name);
  const [pemail, setPemail] = useState(email);
  const [ppassword, setPpassword] = useState();
  const [pconfirmPassword , setPconfirmPassword] = useState();
  const formHandler = (e) => {
        e.preventDefault()
        if(ppassword !== pconfirmPassword){
          alert("password and confirm password must match")
        }else{
          const formData = {
             name: pname,
             email: pemail,
             password: ppassword
          }
        }
        
  }
  return (
    <Container>
      <Row>
        <Col sm={12} md={4}>
          <Form onSubmit={formHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={pname}
                onChange={(e) => setPname(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={pemail}
                onChange={(e) => setPemail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={ppassword}
                onChange={(e) => setPpassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={pconfirmPassword}
                onChange={(e) => setPconfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col sm={12} md={8}>
          cart item
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProfileScreen);
