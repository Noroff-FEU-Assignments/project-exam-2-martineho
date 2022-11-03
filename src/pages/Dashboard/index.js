import { Heading } from "../../components/layout/Headings";
import Container from 'react-bootstrap/Container';
import WelcomeModal from "../../components/register/WelcomeModal";
import Navigation from "../../components/layout/Navigation";

export default function Dashboard() {
  const new_user = sessionStorage.getItem('new_user');

  if (!new_user) {
  
  }

  return (
    <>
    <Container>
      <Navigation/>
      <Heading content='Feed'></Heading>
      <WelcomeModal/>
    </Container>
    </>
  );
}
