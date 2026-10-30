import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { createOne, deleteOne, getAll, updateOne } from '../../api/resourceApi';
import { resourceConfigs } from '../../schemas/adminResources';
import Button from '../common/Button';
import ResourceForm from '../common/ResourceForm';
import DataTable from '../common/DataTable';
import Modal from '../common/Modal';

const emptyValues = (config) => Object.fromEntries(config.fields.map((field) => [
  field.name,
  field.type === 'checkbox' ? true : field.type === 'select' ? field.defaultValue || field.options?.[0] || '' : ''
]));

const errorMessage = (error) => error.response?.data?.message || error.message || 'Something went wrong.';

export default function ResourcePage() {
  const { resource } = useParams();
  const config = Object.prototype.hasOwnProperty.call(resourceConfigs, resource)
    ? resourceConfigs[resource]
    : undefined;

  if (!config) {
    return <p role="alert" className="rounded-xl bg-red-50 p-5 text-sm text-red-700">This admin section is not available.</p>;
  }

  return <ResourceManagementPage config={config} />;
}

function ResourceManagementPage({ config }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const showAll = searchParams.get('view') === 'all';
  const managementAction = searchParams.get('manage');

  const loadRows = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setRows(await getAll(config.endpoint));
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [config.endpoint]);

  useEffect(() => { loadRows(); }, [loadRows]);

  useEffect(() => {
    if (config.canCreate && searchParams.get('action') === 'create') {
      setEditing(null);
      setModalOpen(true);
    }
  }, [config.canCreate, searchParams]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditing(null);
    setSearchParams(showAll ? { view: 'all' } : {}, { replace: true });
  }, [setSearchParams, showAll]);

  const startCreate = () => {
    if (!config.canCreate) return;
    if (config.separateForms) {
      navigate(`/admin/${config.endpoint}/new`);
      return;
    }
    setEditing(null);
    setNotice('');
    setModalOpen(true);
    setSearchParams({ action: 'create' });
  };

  const startEdit = (row) => {
    if (config.separateForms) {
      navigate(`/admin/${config.endpoint}/${row._id}/edit`);
      return;
    }
    setEditing(row);
    setNotice('');
    setModalOpen(true);
    setSearchParams({ view: 'all' });
  };

  const save = async (values) => {
    setSubmitting(true);
    setError('');
    try {
      if (editing?._id) await updateOne(config.endpoint, editing._id, values);
      else await createOne(config.endpoint, values);
      closeModal();
      setNotice(`${config.singular} ${editing ? 'updated' : 'created'} successfully.`);
      await loadRows();
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (row) => {
    if (config.separateForms) {
      navigate(`/admin/${config.endpoint}/${row._id}/delete`);
      return;
    }
    if (!window.confirm(`Delete this ${config.singular.toLowerCase()}? This cannot be undone.`)) return;
    setError('');
    setNotice('');
    try {
      await deleteOne(config.endpoint, row._id);
      setNotice(`${config.singular} deleted successfully.`);
      await loadRows();
    } catch (requestError) {
      setError(errorMessage(requestError));
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-600">Management</p>
          <h1 className="mt-2 font-display text-4xl text-ink">{config.title}</h1>
          <p className="mt-2 text-sm text-stone-500">
            {config.canCreate
              ? `Create, review, and update your ${config.title.toLowerCase()}.`
              : `Review and update ${config.title.toLowerCase()} created from the storefront.`}
          </p>
        </div>
      </div>
      {error && <div role="alert" className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><span>{error}</span><button type="button" onClick={() => setError('')} aria-label="Dismiss error" className="text-lg">×</button></div>}
      {notice && <div role="status" className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{notice}</div>}
      <div className="mb-5 flex flex-wrap gap-3">
        <Button type="button" variant={showAll ? 'primary' : 'secondary'} onClick={() => setSearchParams(showAll ? {} : { view: 'all' })}>
          {showAll ? `Showing all ${config.title.toLowerCase()}` : `View all ${config.title.toLowerCase()}`}
        </Button>
      </div>
      {managementAction && managementAction !== 'add' && (
        <p className="mb-4 text-sm text-stone-500">Choose a {config.singular.toLowerCase()} below to {managementAction}.</p>
      )}
      {showAll && (loading
        ? <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center text-sm text-stone-500">Loading {config.title.toLowerCase()}…</div>
        : <DataTable
          columns={config.columns}
          rows={rows}
          onEdit={managementAction === 'remove' ? undefined : startEdit}
          onDelete={managementAction === 'update' ? undefined : remove}
          emptyMessage={config.emptyMessage}
          actionLabels={config.separateForms ? { edit: 'Update', delete: 'Remove' } : undefined}
        />)}
      <Modal open={modalOpen} title={`${editing ? 'Edit' : 'Add'} ${config.singular}`} onClose={closeModal}>
        <ResourceForm
          key={editing?._id || 'new'}
          config={config}
          initialValues={editing ? { ...emptyValues(config), ...editing } : emptyValues(config)}
          onSubmit={save}
          onCancel={closeModal}
          submitting={submitting}
        />
      </Modal>
    </>
  );
}
