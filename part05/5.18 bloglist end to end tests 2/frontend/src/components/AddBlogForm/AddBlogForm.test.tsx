import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import blogService from '../../services/blog';
import AddBlogForm from './AddBlogForm';

jest.mock('../../services/blog', () => ({
  addNew: jest.fn((newBlogObject) => Promise.resolve({
    title: newBlogObject.title,
    author: newBlogObject.author,
    url: newBlogObject.url,
    likes: 10,
    userId: '1',
  })),
}));

const voidFunction = () => {};

test('blog form', async () => {
  const user = userEvent.setup();

  render(<AddBlogForm
    blogFormRef={{ current: { toggleVisibility: () => {} } }}
    userId="1"
    blogs={[]}
    setBlogs={voidFunction}
    setNotificationMessage={voidFunction}
    setNotificationClassName={voidFunction}
  />);

  // screen.debug();

  const inputTitle = screen.getByRole('textbox', { name: /title/ });
  const inputAuthor = screen.getByRole('textbox', { name: /author/ });
  const inputUrl = screen.getByRole('textbox', { name: /url/ });
  const createButton = screen.getByText('Create');

  await user.type(inputTitle, 'test1');
  await user.type(inputAuthor, 'test2');
  await user.type(inputUrl, 'http://www.test3.com');
  await user.click(createButton);

  expect(blogService.addNew).toHaveBeenCalledTimes(1);
  expect(blogService.addNew).toHaveBeenCalledWith({
    title: 'test1',
    author: 'test2',
    url: 'http://www.test3.com',
    likes: 0,
    userId: '1',
  });
});
