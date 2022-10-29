export default function BigParagraph(paragraph) {

  const paragraphStyle = {
    textAlign: paragraph.textAlign,
    margin: paragraph.margin,
    fontSize: '1.15rem',
  }

  return ( <p style={paragraphStyle}>{paragraph.content}</p> ) 
}