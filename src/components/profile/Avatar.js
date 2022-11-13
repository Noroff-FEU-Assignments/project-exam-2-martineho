import React from "react"

export default function Avatar (avatar) {
  return (
    <img className={avatar.className} src={avatar.src} alt={avatar.alt} />
  )
}