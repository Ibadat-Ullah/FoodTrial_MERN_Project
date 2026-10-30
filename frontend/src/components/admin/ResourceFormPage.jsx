import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createOne, deleteOne, getOne, updateOne } from '../../api/resourceApi';
import { resourceConfigs } from '../../schemas/adminResources';
import Button from '../common/Button';
import ResourceForm from '../common/ResourceForm';

const errorMessage = (error) => error.response?.data?.message || error.message || 'Something went wrong.';

export default function ResourceFormPage({ mode }) {
  const { resource, id } = useParams();
  const navigate = useNavigate();
  const config = resourceConfigs[resource];
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(mode !== 'new');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const initialValues = useMemo(() => {
    if (!config) return {};
    return {
      ...Object.fromEntries(config.fields.map((field) => [
        field.name,
        record ? record[field.name] : field.type === 'checkbox' ? true : field.type === 'select' ? field.defaultValue || field.options?.[0] || '' : field.type === 'file' ? undefined : ''
      ])),
      ...(record?.imageUrl ? { imageUrl: record.imageUrl } : {}),
      ...(record ? { _id: record._id } : {})
    };
  }, [config, record]);

  useEffect(() => {
    if (!config?.separateForms || mode === 'new') {
      setLoading(false);
      return;
    }

    let active = true;
    getOne(config.endpoint, id)
      .then((data) => { if (active) setRecord(data); })
      .catch((requestError) => { if (active) setError(errorMessage(requestError)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [mode, config, id]);

  if (!config?.separateForms || !['new', 'edit'].includes(mode)) {
    return <p role="alert" className="rounded-xl bg-red-50 p-5 text-sm text-red-700">This form is not available.</p>;
  }

  const save = async (values) => {
    setSubmitting(true);
    setError('');
    try {
      const payload = config.fields.some((field) => field.type === 'file')
        ? Object.entries(values).reduce((formData, [key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value instanceof File ? value : String(value));
          }
          return formData;
        }, new FormData())
        : values;

      if (mode === 'edit') await updateOne(config.endpoint, id, payload);
      else await createOne(config.endpoint, payload);
      navigate(`/admin/${resource}?view=all`, { replace: true });
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl">
      <Link to={`/admin/${resource}?view=all`} className="text-sm font-semibold text-stone-500 hover:text-brand-700">← Back to {config.title.toLowerCase()}</Link>
      <h1 className="mt-5 font-display text-4xl text-ink">{mode === 'edit' ? 'Update' : 'Add'} {config.singular}</h1>
      <p className="mt-2 text-sm text-stone-500">{mode === 'edit' ? `Update this ${config.singular.toLowerCase()} record.` : `Add a ${config.singular.toLowerCase()} to the system.`}</p>
      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {loading ? (
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500">Loading record…</div>
      ) : record || mode === 'new' ? (
        <div className="mt-6 rounded-3xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8">
          <ResourceForm
            key={`${mode}-${record?._id || 'new'}`}
            config={config}
            initialValues={initialValues}
            onSubmit={save}
            onCancel={() => navigate(`/admin/${resource}?view=all`)}
            submitting={submitting}
          />
        </div>
      ) : <p role="alert" className="mt-5 rounded-xl bg-red-50 p-5 text-sm text-red-700">Record not found.</p>}
    </section>
  );
}

export function ResourceDeletePage() {
  const { resource, id } = useParams();
  const navigate = useNavigate();
  const config = resourceConfigs[resource];
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!config?.separateForms) {
      setLoading(false);
      return undefined;
    }
    let active = true;
    getOne(config.endpoint, id)
      .then((data) => { if (active) setRecord(data); })
      .catch((requestError) => { if (active) setError(errorMessage(requestError)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [config, id]);

  if (!config?.separateForms) {
    return <p role="alert" className="rounded-xl bg-red-50 p-5 text-sm text-red-700">This action is not available.</p>;
  }

  const remove = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await deleteOne(config.endpoint, id);
      navigate(`/admin/${resource}?view=all`, { replace: true });
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl">
      <Link to={`/admin/${resource}?view=all`} className="text-sm font-semibold text-stone-500 hover:text-brand-700">← Back to {config.title.toLowerCase()}</Link>
      <h1 className="mt-5 font-display text-4xl text-ink">Remove {config.singular}</h1>
      <p className="mt-2 text-sm text-stone-500">Review and confirm this deletion.</p>
      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {loading ? (
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500">Loading record…</div>
      ) : record ? (
        <form onSubmit={remove} className="mt-6 rounded-3xl border border-red-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm leading-6 text-stone-600">This will permanently remove <strong className="text-ink">{record.name}</strong>. This cannot be undone.</p>
          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => navigate(`/admin/${resource}?view=all`)}>Cancel</Button>
            <Button type="submit" variant="danger" disabled={submitting}>{submitting ? 'Removing…' : `Remove ${config.singular}`}</Button>
          </div>
        </form>
      ) : !error ? <p className="mt-5 text-sm text-stone-500">Record not found.</p> : null}
    </section>
  );
}
