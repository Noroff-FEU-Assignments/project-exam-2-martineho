import { Heading } from "../../components/layout/Headings";
import Container from 'react-bootstrap/Container';
import WelcomeModal from "../../components/register/WelcomeModal";

export default function Dashboard() {
  const new_user = localStorage.getItem('new_user');

  return (
    <>
    <Container>
      <Heading content='Feed'></Heading>
      {new_user ? <WelcomeModal/> : null }
    </Container>
    </>
  );
}
