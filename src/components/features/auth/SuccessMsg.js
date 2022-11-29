import { SubHeading } from "../../layout/Headings";

export function SucessMsg(handleClose) {
  return ( 
    <>
    <div className="success-msg">
      <div className="text">
        <SubHeading content='Your profile is set 👍' />
      </div>
      <button id="close" className='skip-modal' onClick={handleClose}>
        Ok, let me explore
      </button>
    </div>
    </>
  ) 
}
