
export default  function PostMenu() {
  return (
    <div className='post-menu'>
      <button className="post-btn edit" ><ion-icon name="create"></ion-icon></button>
      <button className="post-btn delete" ><ion-icon name="trash"></ion-icon></button>
    </div>
  );
}