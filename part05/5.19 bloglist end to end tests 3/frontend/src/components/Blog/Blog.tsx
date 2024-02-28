import { Divider } from '@mui/material';
import { BlogType } from '../../utils/type';

interface BlogProps {
  hideWhenVisible: { display: string },
  showWhenVisible: { display: string },
  blog: BlogType,
  toggleVisibility: () => void,
  buttonLabel: string,
  handleLikeButton: () => void,
  userId: string,
  handleRemoveBlogButton: () => void,
}

function Blog({
  hideWhenVisible,
  showWhenVisible,
  blog,
  toggleVisibility,
  buttonLabel,
  handleLikeButton,
  userId,
  handleRemoveBlogButton,
}: BlogProps) {
  return (
    <div>
      <div className="short" style={hideWhenVisible}>
        <Divider style={{ marginTop: '16px' }} />
        {blog.title}
        {' '}
        {blog.author}
        <button id="show-blog-button" type="button" onClick={toggleVisibility}>{buttonLabel}</button>
        <Divider />
      </div>

      <div className="long" style={showWhenVisible}>
        <Divider style={{ marginTop: '16px' }} />
        {blog.title}
        {' '}
        {blog.author}
        <br />
        {blog.url}
        <br />
        likes:
        {' '}
        {blog.likes}
        {' '}
        <button id="like-blog-button" type="button" onClick={handleLikeButton}>like</button>
        <br />
        username:
        {' '}
        {blog.user.username}
        {' | name :'}
        {blog.user.name}
        <br />
        <button id="hide-blog-button" type="button" onClick={toggleVisibility}>hide</button>
        <br />
        {
          userId === blog.user.id ? (
            <button id="remove-blog-button" type="button" onClick={handleRemoveBlogButton}>remove</button>
          ) : (<div />)
        }
        <Divider />
      </div>
    </div>
  );
}

export default Blog;
