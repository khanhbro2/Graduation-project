import { Link, useNavigate } from 'react-router-dom';
import MiscUtils from 'utils/MiscUtils';
import { ClientCarousel, ReviewStarGroup } from 'components';
import { BellPlus, Heart, PhotoOff, ShoppingCart, Minus, Plus, Bolt } from 'tabler-icons-react';
import React, { useState } from 'react';
import {
  ClientCartRequest,
  ClientPreorderRequest,
  ClientProductResponse,
  ClientWishRequest,
  UpdateQuantityType
} from 'types';
import useCreateWishApi from 'hooks/use-create-wish-api';
import NotifyUtils from 'utils/NotifyUtils';
import useAuthStore from 'stores/use-auth-store';
import useCreatePreorderApi from 'hooks/use-create-preorder-api';
import useSaveCartApi from 'hooks/use-save-cart-api';

interface ClientProductIntroProps {
  product: ClientProductResponse;
}

function ClientProductIntro({ product }: ClientProductIntroProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const { user, currentCartId } = useAuthStore();

  const createWishApi = useCreateWishApi();
  const createPreorderApi = useCreatePreorderApi();
  const saveCartApi = useSaveCartApi();

  const handleSelectVariantButton = (variantIndex: number) => {
    setSelectedVariantIndex(variantIndex);
    setQuantity(1);
  };

  const handleCreateWishButton = () => {
    if (!user) {
      NotifyUtils.simple('Vui lòng đăng nhập để sử dụng chức năng');
    } else {
      const clientWishRequest: ClientWishRequest = {
        userId: user.id,
        productId: product.productId,
      };
      createWishApi.mutate(clientWishRequest);
    }
  };

  const handleCreatePreorderButton = () => {
    if (!user) {
      NotifyUtils.simple('Vui lòng đăng nhập để sử dụng chức năng');
    } else {
      const clientPreorderRequest: ClientPreorderRequest = {
        userId: user.id,
        productId: product.productId,
        status: 1,
      };
      createPreorderApi.mutate(clientPreorderRequest);
    }
  };

  const handleAddToCartButton = () => {
    if (!user) {
      NotifyUtils.simple('Vui lòng đăng nhập để sử dụng chức năng');
    } else {
      const cartRequest: ClientCartRequest = {
        cartId: currentCartId,
        userId: user.id,
        cartItems: [
          {
            variantId: product.productVariants[selectedVariantIndex].variantId,
            quantity: quantity,
          },
        ],
        status: 1,
        updateQuantityType: UpdateQuantityType.INCREMENTAL,
      };
      saveCartApi.mutate(cartRequest, {
        onSuccess: () => NotifyUtils.simpleSuccess('Đã thêm sản phẩm vào giỏ hàng thành công'),
      });
    }
  };

  const handleBuyNowButton = () => {
    if (!user) {
      NotifyUtils.simple('Vui lòng đăng nhập để sử dụng chức năng');
    } else {
      const cartRequest: ClientCartRequest = {
        cartId: currentCartId,
        userId: user.id,
        cartItems: [
          {
            variantId: product.productVariants[selectedVariantIndex].variantId,
            quantity: quantity,
          },
        ],
        status: 1,
        updateQuantityType: UpdateQuantityType.INCREMENTAL,
      };
      saveCartApi.mutate(cartRequest, {
        onSuccess: () => {
          NotifyUtils.simpleSuccess('Đã thêm sản phẩm vào giỏ hàng');
          setTimeout(() => {
            navigate('/cart');
          }, 500);
        },
      });
    }
  };

  return (
    <div className="p-6 rounded-md shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-6">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Trang chủ
          </Link>
          {product.productCategory && MiscUtils.makeCategoryBreadcrumbs(product.productCategory).map(c => (
            <React.Fragment key={c.categorySlug}>
              <span className="text-gray-400">/</span>
              <Link to={'/category/' + c.categorySlug} className="text-blue-600 dark:text-blue-400 hover:underline">
                {c.categoryName}
              </Link>
            </React.Fragment>
          ))}
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-400">
            {product.productName}
          </span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {product.productImages.length > 0
              ? (
                <ClientCarousel>
                  {product.productImages.map(image => (
                    <img
                      key={image.id}
                      className="rounded-md w-full aspect-square object-cover"
                      src={image.path}
                      alt={product.productName}
                    />
                  ))}
                </ClientCarousel>
              )
              : (
                <div className="rounded-md w-full aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center">
                  <PhotoOff size={100} strokeWidth={1} className="text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Không có hình cho sản phẩm này</p>
                </div>
              )}
          </div>
          <div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 items-start">
                {!product.productSaleable && <span className="px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded mb-2">Hết hàng</span>}
                {product.productBrand && (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Thương hiệu:</span>
                    <Link to={'/brand/' + product.productBrand.brandId} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      {product.productBrand.brandName}
                    </Link>
                  </div>
                )}
                <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
                  {product.productName}
                </h1>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center gap-1">
                    <ReviewStarGroup ratingScore={product.productAverageRatingScore} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{product.productCountReviews} đánh giá</span>
                  </div>
                </div>
              </div>

              {product.productShortDescription && <p className="text-gray-600 dark:text-gray-400">{product.productShortDescription}</p>}

              <div className="bg-gray-100 dark:bg-gray-700/50 rounded-md p-4">
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    {MiscUtils.formatPrice(
                      MiscUtils.calculateDiscountedPrice(
                        product.productVariants[selectedVariantIndex]?.variantPrice,
                        product.productPromotion ? product.productPromotion.promotionPercent : 0
                      )
                    )} ₫
                  </p>
                  {product.productPromotion && (
                    <>
                      <p className="text-lg line-through text-gray-500 dark:text-gray-400">
                        {MiscUtils.formatPrice(product.productVariants[selectedVariantIndex]?.variantPrice)} ₫
                      </p>
                      <span className="px-2 py-1 text-sm font-medium bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 rounded">
                        -{product.productPromotion.promotionPercent}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-medium text-gray-900 dark:text-gray-100">Phiên bản</p>
                {product.productVariants.length > 0
                  ? product.productVariants.some(variant => variant.variantProperties)
                    ? (
                      <div className="flex flex-wrap gap-2">
                        {product.productVariants.map((variant, index) => (
                          <button
                            key={variant.variantId}
                            onClick={() => handleSelectVariantButton(index)}
                            disabled={selectedVariantIndex === index || variant.variantInventory === 0}
                            className={`rounded-md p-2 border-2 transition-colors ${
                              index === selectedVariantIndex
                                ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                            } ${variant.variantInventory === 0 ? 'opacity-50 cursor-not-allowed' : ''} ${selectedVariantIndex === index ? 'cursor-default' : 'cursor-pointer'}`}
                          >
                            <div className="flex flex-col gap-2">
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {variant.variantProperties?.content.map(property => (
                                  <React.Fragment key={property.id}>
                                    <span className="text-gray-600 dark:text-gray-400">{property.name}</span>
                                    <span className="text-right font-medium text-gray-900 dark:text-gray-100">
                                      {property.value}
                                    </span>
                                  </React.Fragment>
                                ))}
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">Tồn kho: {variant.variantInventory}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">Giá: {MiscUtils.formatPrice(
                                MiscUtils.calculateDiscountedPrice(
                                  variant.variantPrice,
                                  product.productPromotion ? product.productPromotion.promotionPercent : 0
                                )
                              )} ₫</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )
                    : <p className="text-sm text-gray-600 dark:text-gray-400">Sản phẩm chỉ có duy nhất một phiên bản mặc định</p>
                  : <p className="text-sm text-gray-600 dark:text-gray-400">Không có phiên bản nào</p>}
              </div>

              {product.productSaleable && (
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Số lượng</p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Minus size={16} />
                    </button>

                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const newQuantity = Number(e.target.value) || 1;
                        setQuantity(Math.min(product.productVariants[selectedVariantIndex].variantInventory, Math.max(1, newQuantity)));
                      }}
                      min={1}
                      max={product.productVariants[selectedVariantIndex].variantInventory}
                      className="w-14 h-9 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    <button
                      onClick={() => setQuantity(Math.min(product.productVariants[selectedVariantIndex].variantInventory, quantity + 1))}
                      className="w-9 h-9 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mt-4">
                {!product.productSaleable
                  ? (
                    <button
                      onClick={handleCreatePreorderButton}
                      className="px-6 py-3 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors"
                    >
                      <BellPlus size={20} />
                      Đặt trước
                    </button>
                  )
                  : (
                    <>
                      <button
                        onClick={handleBuyNowButton}
                        className="px-6 py-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                      >
                        <Bolt size={20} />
                        Mua ngay
                      </button>
                      <button
                        onClick={handleAddToCartButton}
                        className="px-6 py-3 flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md transition-colors"
                      >
                        <ShoppingCart size={20} />
                        Chọn mua
                      </button>
                    </>
                  )}
                <button
                  onClick={handleCreateWishButton}
                  className="px-6 py-3 flex items-center gap-2 border border-pink-300 dark:border-pink-600 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-md transition-colors"
                >
                  <Heart size={20} />
                  Yêu thích
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProductIntro;
