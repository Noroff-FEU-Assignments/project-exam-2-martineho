import { Heading } from "../../components/layout/Headings";
import Container from 'react-bootstrap/Container';
import Navigation from "../../components/layout/Navigation";

export default function Profile() {
  return (
    <>
    <Container>
      <Navigation />
      <Heading content='Profile' />
    </Container>
    </>
  );
}
