import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Heading } from "../../components/layout/Headings";
import Loading from "../../components/ux/Loading";
import { token } from "../../utils/user";
import { BASE_URL } from "../../constants/api"

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  let navigate = useNavigate();
 
  const { id } = useParams();
 
  if (!id) {
   navigate.push("/");
  }

  const url = BASE_URL + `social/posts/${id}`;

  useEffect(function () {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

		async function getPosts() {
      try {
        let res = await axios.get(url, config);
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        if (!err?.response) {
          setError(err)       
        }
      } finally {
          setLoading(false);
      }
    } getPosts();
	}, [url]);
  
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>An error occured: {error}</div>;
  }
  console.log(post);

  return(
    <Container>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
      <Row className="post-container">
        <Col className="col-lg-6">
          <div className="post-image">
            <img src={post.media} alt={post.title} />
          </div>
        </Col>
        <Col className="col-lg-6">
          <div className="post-header">
            <div className="timestamp">{post.updated}</div>
          </div>
          <div className="post-content">
            <Heading content={post.title}/>
          </div>
          <div className="post-comments">
            <div className="comment-count">
              Comments {post._count.comments}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
