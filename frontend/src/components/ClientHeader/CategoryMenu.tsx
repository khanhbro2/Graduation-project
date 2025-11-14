import React, { Dispatch, SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageConfigs from 'pages/PageConfigs';
import { useQuery } from 'react-query';
import { ClientCategoryResponse, CollectionWrapper } from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { AlertTriangle } from 'tabler-icons-react';

function CategoryMenu({ setOpenedCategoryMenu }: { setOpenedCategoryMenu: Dispatch<SetStateAction<boolean>> }) {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const {
    data: categoryResponses,
    isLoading: isLoadingCategoryResponses,
    isError: isErrorCategoryResponses,
  } = useQuery<CollectionWrapper<ClientCategoryResponse>, ErrorMessage>(
    ['client-api', 'categories', 'getAllCategories'],
    () => FetchUtils.get(ResourceURL.CLIENT_CATEGORY),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  if (isLoadingCategoryResponses) {
    return (
      <div className="flex flex-col gap-3 p-4">
        {Array(5).fill(0).map((_, index) => (
          <div key={index} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        ))}
      </div>
    );
  }

  if (isErrorCategoryResponses) {
    return (
      <div className="flex flex-col items-center gap-4 my-8 text-pink-600 dark:text-pink-400">
        <AlertTriangle size={125} strokeWidth={1}/>
        <p className="text-xl font-medium">Đã có lỗi xảy ra</p>
      </div>
    );
  }

  const handleAnchor = (path: string) => {
    setOpenedCategoryMenu(false);
    setTimeout(() => navigate(path), 200);
  };

  return (
    <div className="w-full flex">
      {/* Tab buttons - Vertical */}
      <div className="flex flex-col gap-1 p-4 border-r border-gray-200 dark:border-gray-700 w-[180px] flex-shrink-0">
        {categoryResponses?.content.map((firstCategory, index) => {
          const FirstCategoryIcon = PageConfigs.categorySlugIconMap[firstCategory.categorySlug];
          const isActive = activeTab === index;
          
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-3 rounded-md text-sm font-medium transition-all flex items-center gap-3 text-left relative group ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/35 text-blue-600 dark:text-blue-300 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FirstCategoryIcon size={16} className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}/>
              <span className="flex-1">{firstCategory.categoryName}</span>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 dark:bg-blue-400 rounded-r-md" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 p-4 overflow-auto" style={{ maxHeight: '500px' }}>
        {categoryResponses?.content.map((firstCategory, index) => {
          if (activeTab !== index) return null;
          
          const FirstCategoryIcon = PageConfigs.categorySlugIconMap[firstCategory.categorySlug];
          
          return (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <FirstCategoryIcon size={20}/>
                </div>
                <Link
                  to={'/category/' + firstCategory.categorySlug}
                  onClick={() => handleAnchor('/category/' + firstCategory.categorySlug)}
                  className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {firstCategory.categoryName}
                </Link>
              </div>
              <div className="overflow-auto" style={{ maxHeight: '325px' }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {firstCategory.categoryChildren.map((secondCategory, secondIndex) => (
                    <div key={secondIndex} className="flex flex-col gap-2">
                      <Link
                        to={'/category/' + secondCategory.categorySlug}
                        onClick={() => handleAnchor('/category/' + secondCategory.categorySlug)}
                        className="font-semibold text-pink-600 dark:text-pink-400 hover:underline text-sm"
                      >
                        {secondCategory.categoryName}
                      </Link>
                      <div className="flex flex-col gap-1">
                        {secondCategory.categoryChildren.map((thirdCategory, thirdIndex) => (
                          <Link
                            key={thirdIndex}
                            to={'/category/' + thirdCategory.categorySlug}
                            onClick={() => handleAnchor('/category/' + thirdCategory.categorySlug)}
                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {thirdCategory.categoryName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryMenu;
