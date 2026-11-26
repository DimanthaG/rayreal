import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getFirebase, authErrorMessage } from '../lib/firebase';
import { setTokenProvider } from '../lib/api';
import { hasFirebase, isDemo } from '../config';

const AuthContext = createContext(null);
const DEMO_SESSION = 'rr-demo-admin';
const session = {
  get: (k) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { sessionStorage.setItem(k, v); } catch { /* storage blocked */ } },
  del: (k) => { try { sessionStorage.removeItem(k); } catch { /* storage blocked */ } },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasFirebase) {
      if (isDemo && session.get(DEMO_SESSION)) {
        setUser({ email: 'demo@rayrealtysl.com', demo: true });
        setIsAdmin(true);
      }
      setLoading(false);
      return undefined;
    }
    let unsub = () => {};
    getFirebase().then((fb) => {
      unsub = fb.authMod.onIdTokenChanged(fb.auth, async (u) => {
        if (u) {
          const token = await u.getIdTokenResult();
          setUser(u);
          setIsAdmin(token.claims.admin === true);
          setTokenProvider(() => u.getIdToken());
        } else {
          setUser(null);
          setIsAdmin(false);
          setTokenProvider(async () => null);
        }
        setLoading(false);
      });
    });
    return () => unsub();
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!hasFirebase) {
      if (!isDemo) throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* values to .env.');
      session.set(DEMO_SESSION, '1');
      setUser({ email: email || 'demo@rayrealtysl.com', demo: true });
      setIsAdmin(true);
      return;
    }
    const fb = await getFirebase();
    try {
      const cred = await fb.authMod.signInWithEmailAndPassword(fb.auth, email.trim(), password);
      const token = await cred.user.getIdTokenResult(true);
      if (token.claims.admin !== true) {
        await fb.authMod.signOut(fb.auth);
        throw Object.assign(new Error('This account is not an administrator.'), { code: 'not-admin' });
      }
    } catch (e) {
      throw new Error(e.code === 'not-admin' ? e.message : authErrorMessage(e));
    }
  }, []);

  const resetPassword = useCallback(async (email) => {
    const fb = await getFirebase();
    if (!fb) throw new Error('Password reset needs Firebase to be configured.');
    try {
      await fb.authMod.sendPasswordResetEmail(fb.auth, email.trim());
    } catch (e) {
      throw new Error(authErrorMessage(e));
    }
  }, []);

  const signOut = useCallback(async () => {
    session.del(DEMO_SESSION);
    const fb = await getFirebase();
    if (fb) await fb.authMod.signOut(fb.auth);
    setUser(null);
    setIsAdmin(false);
  }, []);

  const value = useMemo(
    () => ({ user, isAdmin, loading, signIn, signOut, resetPassword }),
    [user, isAdmin, loading, signIn, signOut, resetPassword],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
