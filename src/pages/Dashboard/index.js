import { Heading } from "../../components/layout/Headings";
import Container from 'react-bootstrap/Container';
import WelcomeModal from "../../components/register/WelcomeModal";

export default function Dashboard() {
  return (
    <>
    <Container>
      <Heading content='Feed'></Heading>
      <WelcomeModal></WelcomeModal>
    </Container>
    </>
  );
}
