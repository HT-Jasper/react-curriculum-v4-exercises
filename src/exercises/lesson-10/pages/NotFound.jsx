import { Link, useLocation } from 'react-router';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section>
      <h2>404: Not Found</h2>
      <p>
        No route matches <code>{pathname}</code>.
      </p>
      <Link to="..">Go Home</Link>
    </section>
  );
}
