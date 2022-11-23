import axios from "axios";
import React from "react";
import { token } from "../../../utils/user";
import {
  Form, 
  InputGroup,
  Button,
} from "react-bootstrap";
import { BASE_URL } from "../../../constants/api";
import { set } from "react-hook-form";

export default function CommentForm (postId) {
  const id = postId.postId;
  const url = BASE_URL + 'social/posts/' + id + '/comment';
  const [text, setText] = React.useState();

  const handleChange = event => {
    setText(event.target.value);
  }

  async function makeComment(e) {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }
    }
    const body = JSON.stringify({
      body: text,
    })

    try {
      let res = await axios.post(url, body, config);
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    } 
  }

  return (
  <Form className="comment-form" onSubmit={makeComment}>
    <InputGroup className="" controlid="formComment">

      <Form.Control 
        type="text" 
        placeholder="Write a comment" 
        name="body"
        onChange={handleChange}
      />

      <Button type='submit'><ion-icon name="send"></ion-icon></Button>
    </InputGroup>
  </Form>
  )
}