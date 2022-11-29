import axios from "axios";
import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import { 
  Col, 
  Container, 
  Row,
  Button, 
  Collapse } from "react-bootstrap";
import { Heading } from "../../components/layout/Headings";
import Loading from "../../components/ux/Loading";
import { token } from "../../utils/user";
import { BASE_URL } from "../../constants/api"
import Avatar from "../../components/profile/Avatar";
import AvatarPlaceholder from "../../components/profile/AvatarPlaceholder";
import CommentForm from "../../components/features/comment/CommentForm";
import Footer from "../../components/layout/Footer";

export default function Post() {
  const [post, setPost] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
 
  let navigate = useNavigate();
 
  const { id } = useParams();
 
  if (!id) {
   navigate.push("/");
  }

  const url = BASE_URL + `social/posts/${id}?_comments=true&_author=true`;

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
        setCommentsList(res.data.comments);
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
  
  if (loading) { return <Loading />; }
  if (error) { return <div>An error occured: {error}</div> }

  const timeAgo = <ReactTimeAgo date={post.updated} locale="en-US"/>;
  const sortComments = [...commentsList].reverse();
  const firstComments = sortComments.slice(0, 2);
  const lastComments = sortComments.slice(2, 10);

  return (
    <>
    <Container>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
      <Row key={post.id} className="post-container">
        <Col md="12" lg="6">
          {post.media ? <div className="post-image">
            <img src={post.media} alt={post.title} />
          </div> : <div className="post-quote">{post.body}</div> }
        </Col>
        <Col md="12" lg="6" className="post-content">
          <div className="post-content--header">
            <a href={`/profiles/${post.author.name}`} 
            className="author">
             {post.author.avatar ? <Avatar className='avatar--small' src={post.author.avatar} alt='avatar' /> 
              : <AvatarPlaceholder className='avatar-placeholder--small' /> }
              {post.author.name}
              </a>
            <div className="timeago">Last updated {timeAgo}</div>
          </div>
          <div className="post-content--title">
            <Heading content={post.title}/>
          </div>
          <div className="post-content--comments">
            <div className="comment-count">
              Comments {post._count.comments}
            </div>
            <div className="comments-list">
              {firstComments.map((comment) => {
                return (
                  <>
                  <div key={comment.id} className="comment">
                    <div className="comment-header">
                      <a href={`/profiles/${comment.owner}`} 
                      className="comment-header--owner">{comment.owner} </a> 
                      commented <ReactTimeAgo className="timeago" date={comment.created} locale="en-US"/>
                    </div>
                    <p className="comment-body">{comment.body}</p>
                  </div>
                  </>
                )
              })}
              <Collapse in={open}>
                <div id="example-collapse-text">
                  {lastComments.map((comment) => {
                  return (
                    <>
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <a href={`/profiles/${comment.owner}`} 
                        className="comment-header--owner">{comment.owner} </a> 
                        commented <ReactTimeAgo className="timeago" date={comment.created} locale="en-US"/>
                      </div>
                      <p className="comment-body">{comment.body}</p>
                    </div>
                    </>
                  )
                })}
                </div>
              </Collapse>
              {post._count.comments > 2 ?  
                <Button
                  onClick={() => setOpen(!open) }
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                  variant="light"
                  id='collapse-btn'
                > <ion-icon name="chevron-down"></ion-icon>
                </Button> 
                : '' }

                <CommentForm postId={post.id} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    <Footer />
    </>
  )
}
