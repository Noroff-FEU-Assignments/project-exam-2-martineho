import { Heading } from "../../components/layout/Headings";
import Container from 'react-bootstrap/Container';
import WelcomeModal from "../../components/register/WelcomeModal";
import PostList from "../../components/posts/PostList";

export default function Dashboard() {
  const new_user = localStorage.getItem('new_user');

  return (
    <>
    <Container>
      <Heading content='Feed'></Heading>
      {new_user ? <WelcomeModal/> : null }
      <PostList />
    </Container>
    </>
  );
}
