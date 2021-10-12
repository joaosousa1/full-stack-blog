import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <div className="blog-preview" key={blog._id} >
          <Link to={`/post/${blog._id}`}>
            <h2>{ blog.title }</h2>
            <p>Autor: { blog.author }</p>
            <p>id { blog._id }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default BlogList;