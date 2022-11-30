import Container from 'react-bootstrap/Container';
import WelcomeModal from "../../components/features/auth/WelcomeModal";
import { Col, Row } from "react-bootstrap";
import PostLine from "../../components/posts/PostLine";
import ProfileList from '../../components/profile/ProfileList';
import { SmHeading } from '../../components/layout/Headings';
import Footer from '../../components/layout/Footer';
import Posts from '../../components/posts/Posts';

export default function Dashboard() {
  const new_user = localStorage.getItem('new_user');

  return (
    <>
    <Container>
      {new_user ? <WelcomeModal /> : null }
      <main>
        <Row>
          <Col md="12" lg="10">
            <PostLine />
            <Posts />
          </Col>
          <Col className='right-col' md="12" lg="2">
            <SmHeading content='New users' />
            <ProfileList />
          </Col>
        </Row>
      </main>
    </Container>
    <Footer />
    </>
  );
}
