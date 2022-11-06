import { Container, Col, Row  } from "react-bootstrap";
import { BigHeading } from "../../components/layout/Headings";
import Footer from "../../components/layout/Footer";
import BigParagraph from "../../components/layout/Paragraphs";
import LoginForm from "../../components/login/LoginForm";

export default function Login() {

  return (
    <>
    <Container>
      <main>
        <Row>
          <Col lg={6} md={12}>
            <BigHeading content='Content with substance. Find likeminded people and be inspired.' />
            <BigParagraph content='A conscious social media platform, created for a more mindful approach to traditional social medias.' />
          </Col>
          <Col lg={6} md={12}>
            <LoginForm />
          </Col>
        </Row>
      </main>
    </Container>
    <Footer />
    </>
  );
}
