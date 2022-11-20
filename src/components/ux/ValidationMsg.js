import Button from "react-bootstrap/Button";
import { SubHeading } from "../layout/Headings";

export default function ValidationMsg(handleClose, message) {
  return ( 
    <>
    <div className="success-msg">
      <div className="text">
        <SubHeading content={message} />
      </div>
      <Button variant="primary" onClick={handleClose}>
        Ok
      </Button>
    </div>
    </>
  ) 
}
