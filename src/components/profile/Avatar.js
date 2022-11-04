export default function Avatar (avatar) {
  return (
    <>
    <div className="profile--avatar">
      <img src={avatar.src} alt={avatar.alt} />
    </div>
    </>
  )
}