import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getAssetUrl } from '../../api/client';
import Button from './Button';
import Input from './Input';

export default function CrudForm({ config, initialValues, onSubmit, onCancel, submitting }) {
  const form = useForm({
    resolver: zodResolver(config.schema),
    defaultValues: initialValues
  });
  const selectedImage = form.watch('image');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!(selectedImage instanceof File)) {
      setPreviewUrl('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {config.fields.map((field) => {
        const error = form.formState.errors[field.name]?.message;
        if (field.type === 'select') {
          return (
            <div key={field.name}>
              <label htmlFor={field.name} className="mb-2 block text-sm font-semibold text-stone-700">{field.label}</label>
              <select id={field.name} className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${error ? 'border-red-400' : 'border-stone-200'}`} {...form.register(field.name)}>
                <option value="">Choose {field.label.toLowerCase()}</option>
                {field.options.map((option) => <option key={option} value={option}>{option[0].toUpperCase() + option.slice(1)}</option>)}
              </select>
              {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
            </div>
          );
        }
        if (field.type === 'textarea') {
          return (
            <div key={field.name}>
              <label htmlFor={field.name} className="mb-2 block text-sm font-semibold text-stone-700">{field.label}</label>
              <textarea id={field.name} rows={3} className={`w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${error ? 'border-red-400' : 'border-stone-200'}`} {...form.register(field.name)} />
              {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
            </div>
          );
        }
        if (field.type === 'checkbox') {
          return <Input key={field.name} type="checkbox" label={field.label} error={error} {...form.register(field.name)} />;
        }
        if (field.type === 'file') {
          const currentImage = previewUrl || (initialValues.imageUrl ? getAssetUrl(initialValues.imageUrl) : '');
          return (
            <div key={field.name}>
              <label htmlFor={field.name} className="mb-2 block text-sm font-semibold text-stone-700">{field.label}</label>
              <input
                id={field.name}
                type="file"
                accept={field.accept}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-stone-600 file:mr-4 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-xs file:font-bold file:text-brand-700 hover:file:bg-brand-100 ${error ? 'border-red-400' : 'border-stone-200'}`}
                onChange={(event) => form.setValue(field.name, event.target.files?.[0], { shouldDirty: true, shouldValidate: true })}
              />
              <p className="mt-1.5 text-xs text-stone-500">Choose a JPEG, PNG, or WebP image up to 5 MB.</p>
              {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
              {currentImage && <img src={currentImage} alt="Food preview" className="mt-4 h-40 w-full rounded-xl border border-stone-100 object-cover" />}
            </div>
          );
        }
        return <Input key={field.name} type={field.type || 'text'} label={field.label} error={error} {...form.register(field.name)} />;
      })}
      <div className="flex justify-end gap-3 pt-3">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={submitting}>{submitting ? 'Saving…' : initialValues._id ? 'Save changes' : `Create ${config.singular}`}</Button>
      </div>
    </form>
  );
}
