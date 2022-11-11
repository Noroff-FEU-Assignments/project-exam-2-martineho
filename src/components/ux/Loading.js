import Container from "react-bootstrap/Container"

export default function Loading() {
  return (
    <>
    <Container className='loading-container'>
      <div className='loading'>
        <div className="loading--dot"></div>
        <div className="loading--dot"></div>
        <div className="loading--dot"></div>
        <div className="loading--dot"></div>
        <div className="loading--dot"></div>
        <div className="loading--dot"></div>
      </div>
    </Container>
    </>
  )
}