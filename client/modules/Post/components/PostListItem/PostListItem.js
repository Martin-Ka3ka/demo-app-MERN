import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${props.post.slug}-${props.post.cuid}`}>
          {props.post.title}
        </Link>
      </h3>
      <p className={styles['author-name']}>
        <FormattedMessage id="by" /> {props.post.name}
      </p>
      <p className={styles['post-desc']}>{props.post.content}</p>
      <div className={styles['post-action']}>
        <a href="#" onClick={props.onDelete}>
          <FormattedMessage id="deletePost" />
        </a>
        <div className={styles['votes-wrapper']}>
          <span>Vote:</span>
          <button
            className={styles['vote-button']}
            onClick={() => props.thumbUpPost(props.post.cuid)}
          >
            +
          </button>
          <span>{props.post.voteCount}</span>
          <button
            className={styles['vote-button']}
            onClick={() => props.thubmDownPost(props.post.cuid)}
          >
            -
          </button>
        </div>
      </div>
      <hr className={styles.divider} />
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    voteCount: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  thumbUpPost: PropTypes.func.isRequired,
  thubmDownPost: PropTypes.func.isRequired,
};

export default PostListItem;
