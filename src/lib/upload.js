/**
 * Photo uploads: the admin panel sends each photo as multipart/form-data to
 * POST {API}/api/admin/uploads, which streams it to Cloudinary and returns
 * { url, publicId, width, height }. The listing then stores those objects.
 *
 * Large phone photos are scaled down in the browser first (max 2400px) so uploads
 * stay fast on mobile data; Cloudinary handles format and quality for visitors.
 */
import { config, isDemo } from '../config';
import { getAuthToken, ApiError } from './api';

export const MAX_UPLOAD_MB = 15;
export const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
const MAX_SIDE = 2400;

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`${file.name}: this file could not be read as an image.`));
    };
    img.src = url;
  });
}

/** Returns the original file, or a smaller JPEG if it is very large. HEIC is sent as-is (Cloudinary converts it). */
async function shrinkIfLarge(file) {
  if (/hei[cf]/i.test(file.type)) return file;
  const { img, url } = await loadImage(file); // also proves the file is a real image
  const longest = Math.max(img.naturalWidth, img.naturalHeight);
  if (longest <= MAX_SIDE && file.size <= 4 * 1024 * 1024) {
    URL.revokeObjectURL(url);
    return file;
  }
  const scale = Math.min(1, MAX_SIDE / longest);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(url);
  const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', 0.9));
  return blob ? new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }) : file;
}

/**
 * Uploads one photo with progress.
 * @param {File} file
 * @param {(pct:number)=>void} onProgress
 * @returns {Promise<{url:string, publicId:string, width:number, height:number}>}
 */
export async function uploadPropertyImage(file, onProgress = () => {}) {
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) throw new Error(`${file.name} is larger than ${MAX_UPLOAD_MB} MB.`);
  const toSend = await shrinkIfLarge(file);

  if (isDemo) {
    // Demo mode: no server — keep the photo in this browser only.
    for (let p = 25; p <= 100; p += 25) {
      onProgress(p);
      await new Promise((r) => setTimeout(r, 120));
    }
    const url = await new Promise((r) => {
      const fr = new FileReader();
      fr.onload = () => r(fr.result);
      fr.readAsDataURL(toSend);
    });
    return { url, publicId: `demo/${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, width: null, height: null };
  }

  const token = await getAuthToken();
  if (!token) throw new ApiError('Your session has expired. Please sign in again.', 401);
  const body = new FormData();
  body.append('images', toSend, toSend.name);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${config.apiBaseUrl}/api/admin/uploads`);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.min(95, Math.round((e.loaded / e.total) * 95)));
    xhr.onerror = () => reject(new Error(`${file.name}: upload failed — check your connection.`));
    xhr.ontimeout = () => reject(new Error(`${file.name}: upload timed out.`));
    xhr.timeout = 120_000;
    xhr.onload = () => {
      let data = {};
      try {
        data = JSON.parse(xhr.responseText || '{}');
      } catch {
        /* non-JSON error page */
      }
      if (xhr.status >= 200 && xhr.status < 300 && data.images?.[0]) {
        onProgress(100);
        resolve(data.images[0]);
      } else {
        reject(new Error(data.message || `${file.name}: upload failed (${xhr.status}).`));
      }
    };
    xhr.send(body);
  });
}

/** Deletes photos that were uploaded but removed before the listing was saved. Best effort. */
export async function discardImages(publicIds) {
  const ids = (publicIds || []).filter((id) => id && !id.startsWith('demo/'));
  if (!ids.length || isDemo) return;
  const token = await getAuthToken();
  if (!token) return;
  await fetch(`${config.apiBaseUrl}/api/admin/uploads/discard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ publicIds: ids }),
    keepalive: true,
  }).catch(() => {});
}
