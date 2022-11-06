import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


// use buttons to set the value of the field to either one of these emojies and send the form right after.
export default function ReactionForm() {
  return (
    <Form>
      <Button>😍</Button>
      <Button>🤠</Button>
      <Button>🙌</Button>
      <Form.Control 
        type="string" 
        placeholder="emoji" 
        name='symbol'
        hidden
        />
    </Form>
  )
}