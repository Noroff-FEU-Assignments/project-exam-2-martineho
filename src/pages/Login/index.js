import { Container, Col, Row, Nav, NavLink } from "react-bootstrap";
import { BigHeading } from "../../components/layout/Headings";
import Footer from "../../components/layout/Footer";
import BigParagraph from "../../components/layout/Paragraphs";
import LoginForm from "../../components/login/LoginForm";

export default function Login() {
  return (
    <>
    <Container>
      <Nav className="non-auth-navbar">
        <div>Brand</div>
        <NavLink to='/register'>Become a member</NavLink>
      </Nav>
      <main>
        <Row>
          <Col md={6} xs={12}>
            <BigHeading content='Content with substance. Find likeminded people and be inspired.' />
            <BigParagraph content='A conscious social media platform, created for a more mindful approach to traditional social medias.' />
          </Col>
          <Col md={6} xs={12}>
            <LoginForm />
          </Col>
        </Row>
      </main>
    </Container>
    <Footer />
    </>
  );
}
