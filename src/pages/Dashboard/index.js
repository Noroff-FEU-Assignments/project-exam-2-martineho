import { Heading } from "../../components/layout/Headings";
import Container from 'react-bootstrap/Container';
import WelcomeModal from "../../components/register/WelcomeModal";
import Navigation from "../../components/layout/Navigation";

export default function Dashboard() {
  return (
    <>
    <Container>
      <Navigation/>
      <Heading content='Feed'></Heading>
      <WelcomeModal></WelcomeModal>
    </Container>
    </>
  );
}
