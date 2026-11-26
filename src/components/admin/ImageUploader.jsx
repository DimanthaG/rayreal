import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowLeft, ArrowRight, Check, GripVertical, ImagePlus, Loader2, Star, Trash2, UploadCloud } from 'lucide-react';
import { ACCEPTED, uploadPropertyImage } from '../../lib/upload';
import { MAX_PHOTOS } from '../../lib/options';
import { cld } from '../../lib/image';

/**
 * Drag-and-drop uploader for up to MAX_PHOTOS (5) photos per listing.
 * value: [{ url, publicId, width, height }] — value[0] is the cover photo.
 * Each photo uploads as multipart/form-data to the API (→ Cloudinary) as soon as it is added.
 */
export default function ImageUploader({ value, onChange, onRemove, onBusyChange }) {
  const inputRef = useRef(null);
  const [over, setOver] = useState(false);
  const [pending, setPending] = useState([]); // { id, name, preview, progress, error }
  const [notice, setNotice] = useState('');
  const [dragIdx, setDragIdx] = useState(null);
  const latest = useRef(value);
  latest.current = value;

  const activeUploads = pending.filter((p) => !p.error).length;
  const slotsLeft = MAX_PHOTOS - value.length - activeUploads;
  const full = slotsLeft <= 0;

  const setPendingItem = (id, patch) => setPending((list) => list.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const addFiles = async (fileList) => {
    setNotice('');
    const all = [...fileList];
    const images = all.filter((f) => ACCEPTED.includes(f.type) || /\.(jpe?g|png|webp|heic|heif)$/i.test(f.name));
    if (images.length < all.length) setNotice('Only JPG, PNG, WebP or HEIC photos can be added.');
    if (!images.length) return;
    if (slotsLeft <= 0) {
      setNotice(`This listing already has ${MAX_PHOTOS} photos. Remove one to add another.`);
      return;
    }
    const files = images.slice(0, slotsLeft);
    if (images.length > files.length) {
      setNotice(`Only ${MAX_PHOTOS} photos per listing — added the first ${files.length}, skipped ${images.length - files.length}.`);
    }
    const jobs = files.map((f) => ({ id: `${Date.now()}-${Math.random()}`, name: f.name, preview: URL.createObjectURL(f), progress: 0, file: f }));
    setPending((p) => [...p, ...jobs]);
    onBusyChange?.(true);
    await Promise.all(
      jobs.map(async (job) => {
        try {
          const res = await uploadPropertyImage(job.file, (progress) => setPendingItem(job.id, { progress }));
          const next = [...latest.current, { url: res.url, publicId: res.publicId, width: res.width, height: res.height }].slice(0, MAX_PHOTOS);
          latest.current = next;
          onChange(next);
          setPending((list) => list.filter((x) => x.id !== job.id));
          URL.revokeObjectURL(job.preview);
        } catch (e) {
          setPendingItem(job.id, { error: e.message || 'Upload failed' });
        }
      }),
    );
    onBusyChange?.(false);
  };

  const move = (from, to) => {
    if (to < 0 || to >= value.length || from === to) return;
    const next = [...value];
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    onChange(next);
  };

  const setCover = (i) => move(i, 0);

  const remove = (i) => {
    const img = value[i];
    onChange(value.filter((_, k) => k !== i));
    onRemove?.(img);
    setNotice('');
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-muted">
          <span className={clsx('font-medium', full ? 'text-navy' : 'text-ink')}>{value.length}</span> / {MAX_PHOTOS} photos
          {value.length > 0 && <span className="ml-2 hidden sm:inline">· tap <Star className="inline h-3.5 w-3.5 -translate-y-px" /> to choose the cover</span>}
        </span>
        <div className="flex gap-1" aria-hidden="true">
          {Array.from({ length: MAX_PHOTOS }, (_, i) => (
            <span key={i} className={clsx('h-1.5 w-6 rounded-full', i < value.length ? 'bg-navy' : i < value.length + activeUploads ? 'bg-navy/40' : 'bg-line')} />
          ))}
        </div>
      </div>

      {!full && (
        <div
          onDragOver={(e) => {
            if (e.dataTransfer.types.includes('Files')) {
              e.preventDefault();
              setOver(true);
            }
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            if (!e.dataTransfer.files?.length) return;
            e.preventDefault();
            setOver(false);
            addFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
          role="button"
          tabIndex={0}
          className={clsx('flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-9 text-center transition', over ? 'border-navy bg-powder-soft' : 'border-line bg-ice hover:border-navy/40')}
        >
          <UploadCloud className="h-8 w-8 text-navy" strokeWidth={1.5} />
          <div className="mt-3 text-[15px] text-ink">Drop photos here or <span className="text-navy underline underline-offset-2">browse</span></div>
          <div className="mt-1 text-xs text-muted">
            {slotsLeft} more {slotsLeft === 1 ? 'photo' : 'photos'} allowed · JPG, PNG, WebP or HEIC · up to 15 MB each
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />

      {notice && <p className="mt-3 rounded-xl bg-amber-50 px-4 py-2.5 text-sm text-amber-800" role="status">{notice}</p>}

      {(value.length > 0 || pending.length > 0) && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.map((img, i) => {
            const isCover = i === 0;
            return (
              <li
                key={img.publicId || img.url}
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (dragIdx !== null) move(dragIdx, i);
                  setDragIdx(null);
                }}
                onDragEnd={() => setDragIdx(null)}
                className={clsx(
                  'group relative overflow-hidden rounded-2xl bg-ice transition',
                  isCover ? 'col-span-2 row-span-2 ring-[3px] ring-navy sm:col-span-2' : 'ring-1 ring-line',
                  dragIdx === i && 'opacity-40',
                )}
              >
                <div className={isCover ? 'aspect-[4/3] h-full' : 'aspect-[4/3]'}>
                  <img src={cld(img.url, isCover ? 900 : 480)} alt={isCover ? 'Cover photo' : `Photo ${i + 1}`} className="h-full w-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                </div>

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2">
                  <button
                    type="button"
                    onClick={() => setCover(i)}
                    disabled={isCover}
                    aria-pressed={isCover}
                    title={isCover ? 'This is the cover photo' : 'Set as cover photo'}
                    className={clsx('chip shadow-soft transition', isCover ? 'bg-navy text-white' : 'bg-white/95 text-ink hover:bg-navy hover:text-white')}
                  >
                    {isCover ? <><Check className="h-3 w-3" /> Cover photo</> : <><Star className="h-3 w-3" /> Set as cover</>}
                  </button>
                  <span className="hidden h-7 w-7 cursor-grab place-items-center rounded-full bg-white/90 text-muted sm:grid" title="Drag to reorder"><GripVertical className="h-3.5 w-3.5" /></span>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent p-2">
                  <div className="flex gap-1">
                    <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-ink disabled:opacity-40" aria-label="Move left"><ArrowLeft className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => move(i, i + 1)} disabled={i === value.length - 1} className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-ink disabled:opacity-40" aria-label="Move right"><ArrowRight className="h-3.5 w-3.5" /></button>
                  </div>
                  <button type="button" onClick={() => remove(i)} className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-brand-red" aria-label={`Remove photo ${i + 1}`}><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </li>
            );
          })}

          {pending.map((job) => (
            <li key={job.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ice ring-1 ring-line">
              {job.preview && <img src={job.preview} alt="" className="h-full w-full object-cover opacity-50" />}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
                {job.error ? (
                  <>
                    <span className="text-xs font-medium text-brand-red">{job.error}</span>
                    <button type="button" onClick={() => setPending((l) => l.filter((x) => x.id !== job.id))} className="chip bg-white text-ink">Dismiss</button>
                  </>
                ) : (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-navy" />
                    <div className="h-1.5 w-3/4 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-navy transition-all" style={{ width: `${job.progress}%` }} /></div>
                    <span className="max-w-full truncate text-[11px] text-ink">Uploading {job.progress}%</span>
                  </>
                )}
              </div>
            </li>
          ))}

          {!full && value.length > 0 && (
            <li>
              <button type="button" onClick={() => inputRef.current?.click()} className="grid aspect-[4/3] w-full place-items-center rounded-2xl border-2 border-dashed border-line text-muted transition hover:border-navy/40 hover:text-navy">
                <span className="flex flex-col items-center gap-1 text-xs"><ImagePlus className="h-5 w-5" />Add photo ({slotsLeft} left)</span>
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
