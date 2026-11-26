import { config, hasFirebase } from '../config';

let appPromise;

/** Firebase Auth (admin sign-in only) is loaded lazily on /login and /admin, so public pages stay light. Photos live in Cloudinary. */
export function getFirebase() {
  if (!hasFirebase) return Promise.resolve(null);
  if (!appPromise) {
    appPromise = (async () => {
      const [{ initializeApp }, authMod] = await Promise.all([import('firebase/app'), import('firebase/auth')]);
      const app = initializeApp(config.firebase);
      const auth = authMod.getAuth(app);
      await authMod.setPersistence(auth, authMod.browserLocalPersistence);
      return { app, auth, authMod };
    })();
  }
  return appPromise;
}

const AUTH_ERRORS = {
  'auth/invalid-credential': 'That email and password combination is not correct.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
};

export function authErrorMessage(err) {
  return AUTH_ERRORS[err?.code] || err?.message || 'Sign-in failed. Please try again.';
}
