import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../ux/Loading";
import { BASE_URL } from "../../constants/api";
import { token } from "../../utils/user";
import PostCard from "./PostCard";

export default class Posts extends React.Component {
  state = {
    items: Array.from({ length: 10 }),
    posts: [] 
  };

  componentDidMount() {
  this.fetchPosts();
}

  fetchPosts = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    axios
      .get(
        BASE_URL + `social/posts?_author=true&_reactions=true`, 
        config
      )
      .then(res =>
        setTimeout(() => {
          this.setState({
            items: this.state.items.concat(Array.from({ length: 10 })),
            posts: [...this.state.posts, ...res.data],
          })
      }, 1500));
  };

  render() {
    return (
      <div>
        <InfiniteScroll 
        dataLength={this.state.items.length}
        next={this.fetchPosts}
        hasMore={true}
        height={500}
        loader={<Loading />}
        className={'post-list'}
        >
          {this.state.posts.map((post) => (
            <PostCard 
            key={post.id} 
            title={post.title} 
            body={post.body} 
            src={post.media} 
            comment_count={post._count.comments}
            reaction_count={post._count.reactions}
            created={post.created}
            href={post.id}
            author={post.author.name}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

