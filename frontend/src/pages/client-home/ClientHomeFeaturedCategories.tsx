import React from 'react';
import { List } from 'tabler-icons-react';
import PageConfigs from 'pages/PageConfigs';
import { Link } from 'react-router-dom';
import MockUtils from 'utils/MockUtils';

function ClientHomeFeaturedCategories() {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#14372fe4]">
          Danh mục nổi bật
        </h2>
        <Link
          to="/all-categories"
          className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
        >
          <List size={16} />
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {MockUtils.featuredCategories.map(category => {
          const CategoryIcon = PageConfigs.categorySlugIconMap[category.categorySlug];

          return (
            <Link
              key={category.categorySlug}
              to={'/category/' + category.categorySlug}
              className="p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CategoryIcon size={50} strokeWidth={1} />
                <p className="text-gray-900 dark:text-gray-100">{category.categoryName}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ClientHomeFeaturedCategories;
