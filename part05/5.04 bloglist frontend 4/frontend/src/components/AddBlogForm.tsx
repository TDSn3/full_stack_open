import { Divider } from '@mui/material';

interface AddBlogFormProps {
  title: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  author: string,
  setAuthor: React.Dispatch<React.SetStateAction<string>>,
  url: string,
  setUrl: React.Dispatch<React.SetStateAction<string>>,

  handleAddBlog: (event: { preventDefault: () => void }) => void,
}

function AddBlogForm({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  handleAddBlog,
}: AddBlogFormProps) {
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <span>title </span>
          <input
            type="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <span>author </span>
          <input
            type="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <span>url </span>
          <input
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
      <Divider style={{ marginTop: '16px' }} />
    </div>
  );
}

export default AddBlogForm;
