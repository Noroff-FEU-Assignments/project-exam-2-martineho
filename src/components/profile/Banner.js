export default function Banner (banner) {
  return (
    <>
    <div className="profile--banner">
      <img src={banner.src} alt={banner.alt} />
    </div>
    </>
  )
}