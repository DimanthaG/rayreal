import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Seo from '../components/Seo';
import { Img, Logo } from '../components/ui';
import BrandArt from '../components/BrandArt';
import { useAuth } from '../context/AuthContext';
import { hasFirebase, isDemo } from '../config';
import { useProperties } from '../hooks/useProperties';

export default function LoginPage() {
  const { signIn, resetPassword, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const demoMode = isDemo && !hasFirebase;
  const to = location.state?.from || '/admin';

  useEffect(() => {
    if (!loading && isAdmin) navigate(to, { replace: true });
  }, [isAdmin, loading, navigate, to]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    if (!demoMode && (!email || !password)) {
      setError('Enter your email and password.');
      return;
    }
    setBusy(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const forgot = async () => {
    setError('');
    if (!email) {
      setError('Type your email above first, then tap "Forgot password".');
      return;
    }
    try {
      await resetPassword(email);
      setNotice(`If ${email} is an admin account, a reset link is on its way.`);
    } catch (err) {
      setError(err.message);
    }
  };

  const { items } = useProperties();
  const bg = items.find((p) => p.featured)?.images?.[0]?.url;

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <Seo title="Admin sign in" noindex />
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center justify-between">
          <Link to="/"><Logo className="h-8" /></Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-navy"><ArrowLeft className="h-4 w-4" /> Back to site</Link>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <span className="eyebrow">Admin</span>
          <h1 className="display mt-3 text-4xl">Welcome back</h1>
          <p className="mt-2 text-[15px] text-muted">Sign in to manage listings, photos and enquiries.</p>

          {demoMode && (
            <div className="mt-6 rounded-2xl bg-powder-soft p-4 text-sm text-navy">
              <strong className="font-medium">Demo mode.</strong> Firebase isn't configured yet, so any details open the panel with an empty test store. Changes stay in this browser only.
            </div>
          )}

          <form onSubmit={submit} className="mt-8 space-y-3" noValidate>
            <label className="relative block">
              <span className="sr-only">Email</span>
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input type="email" autoComplete="username" className="field pl-11" placeholder="admin@rayrealtysl.com" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
            </label>
            <label className="relative block">
              <span className="sr-only">Password</span>
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input type={show ? 'text' : 'password'} autoComplete="current-password" className="field pl-11 pr-12" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted hover:bg-white" aria-label={show ? 'Hide password' : 'Show password'}>
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </label>

            {error && <p className="rounded-xl bg-brand-redSoft px-4 py-3 text-sm text-brand-red" role="alert">{error}</p>}
            {notice && <p className="rounded-xl bg-ice px-4 py-3 text-sm text-navy" role="status">{notice}</p>}

            <button type="submit" disabled={busy} className="flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-navy text-[15px] font-medium text-white transition hover:bg-navy-700 disabled:opacity-60">
              {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </button>
            {hasFirebase && (
              <button type="button" onClick={forgot} className="w-full pt-2 text-center text-sm text-muted hover:text-navy">Forgot password?</button>
            )}
          </form>
        </div>
        <p className="text-xs text-muted">Protected area. Sign-ins are logged.</p>
      </div>

      <div className="relative hidden p-4 lg:block">
        <div className="relative h-full overflow-hidden rounded-4xl">
          {bg ? <Img src={bg} w={1400} className="absolute inset-0" eager /> : <BrandArt className="absolute inset-0" />}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/20 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <div className="max-w-md text-4xl font-light leading-tight tracking-tight">Clear listings make clear sales.</div>
            <p className="mt-3 text-white/70">Ray Realty admin · Listings, photos and status in one place.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
