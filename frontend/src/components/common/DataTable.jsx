import Button from './Button';

export default function DataTable({ columns, rows, onEdit, onDelete, emptyMessage, actionLabels = {} }) {
  const hasActions = Boolean(onEdit || onDelete);

  if (!rows.length) {
    return <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500">{emptyMessage || 'No records yet.'}</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
            <tr>
              {columns.map((column) => <th key={column.key} className="px-5 py-4 font-bold">{column.label}</th>)}
              {hasActions && <th className="px-5 py-4 text-right font-bold">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {rows.map((row) => (
              <tr key={row._id} className="text-stone-700 hover:bg-stone-50/70">
                {columns.map((column) => {
                  const value = row[column.key];
                  return <td key={column.key} className="max-w-xs truncate px-5 py-4">{column.format ? column.format(value, row) : String(value ?? '—')}</td>;
                })}
                {hasActions && <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    {onEdit && <Button type="button" variant="secondary" className="px-4 py-2 text-xs" onClick={() => onEdit(row)}>{actionLabels.edit || 'Edit'}</Button>}
                    {onDelete && <Button type="button" variant="danger" className="px-4 py-2 text-xs" onClick={() => onDelete(row)}>{actionLabels.delete || 'Delete'}</Button>}
                  </div>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
