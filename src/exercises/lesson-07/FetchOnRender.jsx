import { useEffect, useState } from 'react';
import { getPosts } from './api.js';
import './Lesson07Styles.css';

export default function FetchOnRender() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let shouldIgnore = false;

    async function fetchPosts() {
      setIsLoading(true);
      setError('');

      try {
        const postList = await getPosts();

        if (!shouldIgnore) {
          setPosts(postList);
        }
      } catch (error) {
        if (!shouldIgnore) {
          setError(error.message);
        }
      } finally {
        if (!shouldIgnore) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      shouldIgnore = true;
    };
  }, []);

  return (
    <div className="root">
      <h1 className="heading">Fetch list of posts on render</h1>

      <div className="content">
        {isLoading && <p>Loading posts...</p>}

        {error && <p>{error}</p>}

        {!isLoading &&
          !error &&
          posts.map((post) => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </article>
          ))}
      </div>
    </div>
  );
}
