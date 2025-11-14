import React from 'react';
import {
  FilterPanel,
  ManageHeader,
  ManageHeaderButtons,
  ManageHeaderTitle,
  ManageMain,
  ManagePagination,
  ManageTable,
  SearchPanel
} from 'components';
import DateUtils from 'utils/DateUtils';
import { CategoryResponse } from 'models/Category';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import CategoryConfigs from 'pages/category/CategoryConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';
import { QuestionMark } from 'tabler-icons-react';

function CategoryManage() {
  useResetManagePageState();
  useInitFilterPanelState(CategoryConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<CategoryResponse>,
  } = useGetAllApi<CategoryResponse>(CategoryConfigs.resourceUrl, CategoryConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const categoryStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <span className="px-2 py-1 text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded">Có hiệu lực</span>;
    }

    return <span className="px-2 py-1 text-xs font-medium border border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 rounded">Vô hiệu lực</span>;
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i} className="bg-blue-200 dark:bg-blue-800">{part}</mark>
      ) : (
        part
      )
    );
  };

  const showedPropertiesFragment = (entity: CategoryResponse) => (
    <>
      <td>{entity.id}</td>
      <td className="text-sm">
        {highlightText(entity.name, searchToken)}
      </td>
      <td className="text-sm">
        {highlightText(entity.slug, searchToken)}
      </td>
      <td>
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          {entity.thumbnail ? (
            <img src={entity.thumbnail} alt={entity.name} className="w-full h-full object-cover" />
          ) : (
            <QuestionMark size={30} className="text-gray-400" />
          )}
        </div>
      </td>
      <td>{entity.parentCategory ? entity.parentCategory.name : <em>không có</em>}</td>
      <td>{categoryStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: CategoryResponse) => (
    <>
      <tr>
        <td>{CategoryConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.name.label}</td>
        <td>{entity.name}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.slug.label}</td>
        <td>{entity.slug}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.description.label}</td>
        <td className="max-w-[300px]">{entity.description}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.thumbnail.label}</td>
        <td>
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            {entity.thumbnail ? (
              <img src={entity.thumbnail} alt={entity.name} className="w-full h-full object-cover" />
            ) : (
              <QuestionMark size={30} className="text-gray-400" />
            )}
          </div>
        </td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties['parentCategory.name'].label}</td>
        <td>{entity.parentCategory ? entity.parentCategory.name : <em>không có</em>}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.status.label}</td>
        <td>{categoryStatusBadgeFragment(entity.status)}</td>
      </tr>
    </>
  );

  return (
    <div className="flex flex-col gap-4">
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={CategoryConfigs.manageTitleLinks}
          title={CategoryConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={CategoryConfigs.resourceUrl}
          resourceKey={CategoryConfigs.resourceKey}
        />
      </ManageHeader>

      <SearchPanel/>

      <FilterPanel/>

      <ManageMain
        listResponse={listResponse}
        isLoading={isLoading}
      >
        <ManageTable
          listResponse={listResponse}
          properties={CategoryConfigs.properties}
          resourceUrl={CategoryConfigs.resourceUrl}
          resourceKey={CategoryConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </div>
  );
}

export default CategoryManage;
