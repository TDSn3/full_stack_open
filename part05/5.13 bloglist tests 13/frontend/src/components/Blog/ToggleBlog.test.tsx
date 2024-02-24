import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  // no visible
  const hideWhenVisible = { display: '' };
  const showWhenVisible = { display: 'none' };

  const blog = {
    id: '1',
    title: 'blog for test',
    author: 'thomas for test',
    url: 'http://www.test.com',
    likes: 10,
    user: {
      id: '2',
      username: 'user-for-test',
      name: 'user for test',
    },
  };

  const voidFunction = () => {};

  const { container } = render(<Blog
    hideWhenVisible={hideWhenVisible}
    showWhenVisible={showWhenVisible}
    blog={blog}
    toggleVisibility={voidFunction}
    buttonLabel="test"
    handleLikeButton={voidFunction}
    userId="1"
    handleRemoveBlogButton={voidFunction}
  />);

  // screen.debug();

  const div = container.querySelector('.short');
  expect(div).not.toBeNull();
  expect(div).toHaveTextContent('blog for test');
  expect(div).toHaveTextContent('thomas for test');

  const elements = screen.getAllByText(/blog for test/i);
  expect(elements.length).toBe(2);

  const linkElement = screen.getByText(/http:\/\/www\.test\.com/i);
  const divElement = linkElement.closest('div');
  expect(divElement).toHaveStyle('display: none;');
});
