import React from 'react';
import useGetByIdApi from 'hooks/use-get-by-id-api';

interface EntityDetailTableProps<T> {
  entityDetailTableRowsFragment: (entity: T) => React.ReactNode;
  resourceUrl: string;
  resourceKey: string;
  entityId: number;
}

function EntityDetailTable<T>({
  entityDetailTableRowsFragment,
  resourceUrl,
  resourceKey,
  entityId,
}: EntityDetailTableProps<T>) {
  const { isLoading, isError, data } = useGetByIdApi<T>(resourceUrl, resourceKey, entityId);

  if (isLoading) {
    return <div className="p-4 text-center">Đang tải...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-600">Đã có lỗi truy vấn</div>;
  }

  return (
    <div className="rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Thuộc tính
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Giá trị
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {entityDetailTableRowsFragment(data as T)}
        </tbody>
      </table>
    </div>
  );
}

export default EntityDetailTable;
