import { useEffect, useState } from 'react';
import api from '../../api/apiClient';
import DataTable from '../../components/common/DataTable';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api.get('/users')
      .then(({ data }) => { if (active) setUsers(data); })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || requestError.message || 'Could not load registered users.');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <section>
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-600">Data</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Registered users</h1>
      <p className="mt-2 text-sm text-stone-500">Accounts created through the registration form. Passwords are not stored or displayed.</p>
      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <div className="mt-6">
        {loading
          ? <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center text-sm text-stone-500">Loading registered users…</div>
          : <DataTable
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'createdAt', label: 'Registered', format: (value) => value ? new Date(value).toLocaleDateString() : '—' }
            ]}
            rows={users}
            emptyMessage="No users have registered yet."
          />}
      </div>
    </section>
  );
}
