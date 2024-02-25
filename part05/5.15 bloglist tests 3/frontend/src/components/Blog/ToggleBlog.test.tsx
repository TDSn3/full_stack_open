import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

// ── setup blog ── //

// no visible
let hideWhenVisible = { display: '' };
let showWhenVisible = { display: 'none' };

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
const mockHandler = jest.fn(() => {
  hideWhenVisible = { display: 'none' };
  showWhenVisible = { display: '' };
});

// ──────────────── //

beforeEach(() => {
  hideWhenVisible = { display: '' };
  showWhenVisible = { display: 'none' };
  mockHandler.mockClear();
});

test('renders content', async () => {
  const { container } = render(<Blog
    hideWhenVisible={hideWhenVisible}
    showWhenVisible={showWhenVisible}
    blog={blog}
    toggleVisibility={mockHandler}
    buttonLabel="testButton"
    handleLikeButton={voidFunction}
    userId="1"
    handleRemoveBlogButton={voidFunction}
  />);

  // screen.debug();

  const div = container.querySelector('.short');
  expect(div).not.toBeNull();
  expect(div).toHaveTextContent('blog for test');
  expect(div).toHaveTextContent('thomas for test');

  const elements = screen.getAllByText(/blog for test/);
  expect(elements.length).toBe(2);

  const linkElement = screen.getByText(/http:\/\/www\.test\.com/);
  const divElement = linkElement.closest('div');
  expect(divElement).toHaveStyle('display: none;');

  const user = userEvent.setup();
  const button = screen.getByText('testButton');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);

  cleanup();
  const ret = render(<Blog
    hideWhenVisible={hideWhenVisible}
    showWhenVisible={showWhenVisible}
    blog={blog}
    toggleVisibility={mockHandler}
    buttonLabel="testButton"
    handleLikeButton={voidFunction}
    userId="1"
    handleRemoveBlogButton={voidFunction}
  />);

  // screen.debug();

  const divShort = ret.container.querySelector('.short');
  expect(divShort).not.toBeNull();
  expect(divShort).toHaveStyle('display: none;');

  const divLong = ret.container.querySelector('.long');
  expect(divLong).not.toBeNull();
  expect(divLong).not.toHaveStyle('display: none;');
  expect(divLong).toHaveTextContent(/http:\/\/www\.test\.com/);
  expect(divLong).toHaveTextContent(/likes:\s*10/);
});

test('like button', async () => {
  render(<Blog
    hideWhenVisible={hideWhenVisible}
    showWhenVisible={showWhenVisible}
    blog={blog}
    toggleVisibility={mockHandler}
    buttonLabel="testButton"
    handleLikeButton={voidFunction}
    userId="1"
    handleRemoveBlogButton={voidFunction}
  />);

  const user = userEvent.setup();
  const button = screen.getByText('testButton');
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
