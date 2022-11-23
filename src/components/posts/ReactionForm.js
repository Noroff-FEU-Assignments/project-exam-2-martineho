import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../constants/api";
import { token } from "../../utils/user";

export default function ReactionForm(href) {
  const id = href.href; 
  console.log(id);
  const [symbol, setSymbol] = useState('');

  const url = BASE_URL + 'social/posts/' + id + '/react/' + symbol;
  console.log(url);

  const handleClick = (e) => {
    setSymbol(e.target.value);
    console.log(symbol);
    // make this run after the handle change has been done
    addReaction();
  }

  const addReaction = async () => {
    axios({
      method: 'put',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) 
    .then(function () {
      console.log('Reaction ok');
    });
  }

  return (
    <div className='reaction-buttons'>
      <button onClick={handleClick} value={'😍'} className="reaction-btn">😍</button>
      <button onClick={handleClick} value={'🙌'} className="reaction-btn">🙌</button>
    </div>
  )
}