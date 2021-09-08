import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    return(
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-2">
                        Copyright &copy; 2021
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;