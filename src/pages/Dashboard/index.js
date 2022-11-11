import Container from 'react-bootstrap/Container';
import WelcomeModal from "../../components/register/WelcomeModal";
import PostList from "../../components/posts/PostList";
import { Col, Row } from "react-bootstrap";
import PostLine from "../../components/posts/PostLine";
import ProfileList from '../../components/profile/ProfileList';

export default function Dashboard() {
  const new_user = localStorage.getItem('new_user');

  return (
    <>
    <Container>
      {new_user ? <WelcomeModal/> : null }
      <main>
        <Row>
          <Col className="col-lg-9">
            <PostLine />
            <PostList />
          </Col>
          <Col className="col-lg-3">
            <ProfileList />
          </Col>
        </Row>
      </main>
    </Container>
    </>
  );
}
