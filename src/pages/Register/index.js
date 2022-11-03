import { Container, Col, Row, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BigHeading } from "../../components/layout/Headings";
import Footer from "../../components/layout/Footer";
import BigParagraph from "../../components/layout/Paragraphs";
import RegisterForm from "../../components/register/RegisterForm";

export default function Register() {
  return (
    <>
    <Container>
      <Nav className="non-auth-navbar">
        <div>Brand</div>
        <NavLink to='/login'>Sign in</NavLink>
      </Nav>
      <main>
        <Row>
          <Col md={6} xs={12}>
            <BigHeading content='Content with substance. Find likeminded people and be inspired.' />
            <BigParagraph content='A conscious social media platform, created for a more mindful approach to traditional social medias.' />
          </Col>
          <Col md={6} xs={12}>
            <RegisterForm />
          </Col>
        </Row>
      </main>
    </Container>
    <Footer />
    </>
  );
}
