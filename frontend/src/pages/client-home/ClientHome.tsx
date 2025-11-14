import React from 'react';
import ClientHomeBanner from 'pages/client-home/ClientHomeBanner';
import ClientHomeFeaturedCategories from 'pages/client-home/ClientHomeFeaturedCategories';
import ClientHomeLatestProducts from 'pages/client-home/ClientHomeLatestProducts';
import useTitle from 'hooks/use-title';

function ClientHome() {
  useTitle();

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          <ClientHomeBanner/>
          <ClientHomeFeaturedCategories/>
          <ClientHomeLatestProducts/>
        </div>
      </div>
    </main>
  );
}

export default ClientHome;
