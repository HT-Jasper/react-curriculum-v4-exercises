import { useState } from 'react';
import { getSinglePost } from './api.js';
import './Lesson07Styles.css';

export default function FetchOnClick() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGetPost() {
    setIsLoading(true);
    setError('');

    try {
      const fetchedPost = await getSinglePost(1);
      setPost(fetchedPost);
    } catch (error) {
      setError(error.message);
      setPost(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>

      <button type="button" onClick={handleGetPost} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get post'}
      </button>

      <div className="content">
        {isLoading && <p>Loading post...</p>}

        {error && <p>{error}</p>}

        {!isLoading && !error && post && (
          <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </article>
        )}

        {!isLoading && !error && !post && (
          <p>Click the Get post button to fetch a post.</p>
        )}
      </div>
    </div>
  );
}
