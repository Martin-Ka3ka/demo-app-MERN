import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import {
  addPostRequest,
  fetchPosts,
  deletePostRequest,
  thumbUpPostRequest,
  thumbDownPostRequest,
} from '../../PostActions';
import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer';
import { getPosts } from '../../PostReducer';

class PostListPage extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.deletePost(post);
    }
  };

  handleAddPost = (name, title, content) => {
    this.props.toggleAddPost();
    this.props.addPostRequest({ name, title, content });
  };

  render() {
    return (
      <div>
        <PostCreateWidget
          addPost={this.handleAddPost}
          showAddPost={this.props.showAddPost}
        />
        <PostList
          handleDeletePost={this.handleDeletePost}
          posts={this.props.posts}
          thumbUpPost={this.props.thumbUpPost}
          thubmDownPost={this.props.thubmDownPost}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostListPage.need = [
  () => {
    return fetchPosts();
  },
];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    thumbUpPost: cuid => dispatch(thumbUpPostRequest(cuid)),
    thubmDownPost: cuid => dispatch(thumbDownPostRequest(cuid)),
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: post => dispatch(deletePostRequest(post)),
    toggleAddPost: () => dispatch(toggleAddPost()),
    addPostRequest: ({ name, title, content }) =>
      dispatch(addPostRequest({ name, title, content })),
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  showAddPost: PropTypes.bool.isRequired,
  thumbUpPost: PropTypes.func.isRequired,
  thubmDownPost: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  toggleAddPost: PropTypes.func.isRequired,
  addPostRequest: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListPage);
