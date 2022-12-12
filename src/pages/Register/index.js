import { Container, Col, Row } from "react-bootstrap";
import { BigHeading } from "../../components/layout/Headings";
import Footer from "../../components/layout/Footer";
import BigParagraph from "../../components/layout/Paragraphs";
import RegisterForm from "../../components/features/auth/RegisterForm";
import SEO from "../../utils/SEO";

export default function Register() {
  return (
    <>
    <SEO
    title='aesocial - Become a member'
    description='A mindful social media platform. Content with substance. Find likeminded people and be inspired.'
    type='social media' />

    <Container>
      <div className="login-background"></div>
      <main className="login-container">
        <Row>
          <Col md={6} xs={12}>
            <div className="login-introduction">
              <BigHeading content='Content with substance. Find likeminded people and be inspired.' />
              <br></br>
              <BigParagraph content='A conscious social media platform, created for a more mindful approach to traditional social medias.' />
            </div>
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
