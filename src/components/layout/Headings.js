export function Heading(heading) {

  const headingStyle = {
    textAlign: heading.textAlign,
    fontSize: '2.1rem',
    fontWeight: 600,
  }
  
  return ( 
    <h1 style={headingStyle}>
      {heading.content}
    </h1> 
  )
  
}

export function BigHeading(heading) {

  const headingStyle = {
    textAlign: heading.textAlign,
    fontSize: '3.2rem',
    fontWeight: 600,
  }
  
  return ( 
    <h1 style={headingStyle}>
      {heading.content}
    </h1> 
  )
  
}

export function SubHeading(heading) {

  const headingStyle = {
    textAlign: heading.textAlign,
    fontSize: '1.8rem',
    fontWeight: 600,
  }
  
  return ( 
    <h2 style={headingStyle}>
      {heading.content}
    </h2> 
  )
  
}
