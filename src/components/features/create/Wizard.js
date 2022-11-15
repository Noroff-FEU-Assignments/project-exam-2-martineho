import React from "react";
import { useState } from "react";

function Wizard({ children }) {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const pages = React.Children.toArray(children);
  const currentPage = pages[activePageIndex];

  const toNextPage = () => {
    setActivePageIndex(index => index + 1);
  };

  const toLastPage = () => {
    setActivePageIndex(index => index + 2);
  };

  const toPrevPage = () => {
    setActivePageIndex(index => index - 1);
  };

  const ButtonPrev = () =>
    activePageIndex > 0 ? (
      <button 
      type="button"
      onClick={toPrevPage}
      className="back-btn wizard__buttons-left" >
        <ion-icon name="arrow-back-outline"></ion-icon>
      </button>
    ) : null;

    const ButtonToNext = () =>
    activePageIndex > 0 ? ( null ) :  
      <button 
        type="button"
        onClick={toNextPage}
        className='create-btn wizard__buttons-right'
        >
          <ion-icon name="image"></ion-icon> 
          Image
      </button>;

    const ButtonToLast = () =>
    activePageIndex > 0 ? ( null ) :  
      <button 
        type="button"
        onClick={toLastPage}
        className='create-btn wizard__buttons-right'
        >
          <ion-icon name="create"></ion-icon> 
          Text
      </button>;

    return (
      <div className="wizard">
        <ButtonPrev />
        <div className="wizard__content">{currentPage}</div>
        <div className='wizard__buttons group'>
            <ButtonToNext />
            <ButtonToLast />
        </div>
      </div>
    );
}
export default Wizard;