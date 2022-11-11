import Form from "react-bootstrap/Form";


// use buttons to set the value of the field to either one of these emojies and send the form right after.
export default function ReactionForm() {
  return (
    <Form>
      <button className="reaction-btn">😍</button>
      <button className="reaction-btn">🤠</button>
      <button className="reaction-btn">🙌</button>
      <Form.Control 
        type="string" 
        placeholder="emoji" 
        name='symbol'
        hidden
        />
    </Form>
  )
}