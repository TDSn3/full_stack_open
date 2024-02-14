import { BlogType } from '../utils/type';

interface BlogProps {
  blog: BlogType,
}

function Blog({ blog }: BlogProps) {
  return (
    <div>
      {blog.title}
      {' '}
      {blog.author}
    </div>
  );
}

export default Blog;
