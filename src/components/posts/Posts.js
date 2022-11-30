import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../ux/Loading";
import { BASE_URL } from "../../constants/api";
import { token } from "../../utils/user";
import PostCard from "./PostCard";

export default class Posts extends React.Component {
	state = {
		posts: [],
		paginatedPosts: [],
		page: 1,
		hasError: false,
	};

	perPage = 3;

	componentDidMount() {
		this.fetchPosts();
	}

	paginatePosts = () => {
		const start = this.perPage * (this.state.page - 1);
		const end = this.perPage * this.state.page;
		const newPosts = this.state.posts.slice(start, end);

		this.setState({
			paginatedPosts: this.state.paginatedPosts.concat(newPosts),
			page: this.state.page + 1,
		});
	};

	fetchPosts = () => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios.get(BASE_URL + `social/posts?_author=true&_reactions=true`, config).then((res) =>
			this.setState(
				{
					posts: res.data,
				},
				() => this.paginatePosts()
			)
		).catch((err) => {
			if (err.response.status === 429) {
				console.log('An error occured while fetching the data 😥');
			} if (err.response.status === 500) {
				console.log('Sorry, the server did not anwser 😥');
			}
		});
	};

	render() {

		return (
			<div>
				<InfiniteScroll
					dataLength={this.state.paginatedPosts.length}
					next={this.paginatePosts}
					hasMore={true}
					loader={<Loading />}
					className={"post-list"}
				>
					{this.state.paginatedPosts.map((post) => (
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