import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFoundPage() {
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-24 text-center">
      <Seo title="Page not found" noindex />
      <div>
        <div className="display text-[120px] leading-none text-powder">404</div>
        <h1 className="mt-4 text-3xl font-light tracking-tight">This page has moved or no longer exists.</h1>
        <Link to="/listings" className="btn-plain mt-8 bg-navy text-white">Browse properties</Link>
      </div>
    </section>
  );
}
