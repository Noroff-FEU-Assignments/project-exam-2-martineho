import React from "react"

export default function AvatarPlaceholder (props) {
  return (
    <>
      <div className={props.className}>
        <ion-icon name="person"></ion-icon>
      </div>
    </>
  )
}