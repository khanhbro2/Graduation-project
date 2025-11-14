import React, { useEffect } from 'react';
import { VariantRequest } from 'models/Variant';
import { CollectionWrapper } from 'types';
import { ProductPropertyItem } from 'models/Product';
import MiscUtils from 'utils/MiscUtils';
import { ProductVariantRow } from 'components';

interface ProductVariantsProps {
  variants: VariantRequest[];
  setVariants: (variants: VariantRequest[]) => void;
  productProperties: CollectionWrapper<ProductPropertyItem> | null;
  setProductProperties: (productProperties: CollectionWrapper<ProductPropertyItem> | null) => void;
  selectedVariantIndexes: number[];
  setSelectedVariantIndexes: React.Dispatch<React.SetStateAction<number[]>>;
}

function ProductVariants({
  variants,
  setVariants,
  productProperties,
  setProductProperties,
  selectedVariantIndexes,
  setSelectedVariantIndexes,
}: ProductVariantsProps) {

  useEffect(() => {
    const defaultVariant: VariantRequest = { sku: '', cost: 0, price: 0, properties: null, status: 1 };
    const currentVariants: VariantRequest[] = [];
    const currentSelectedVariantIndexes: number[] = [];

    if (productProperties && productProperties.content.some(item => item.value.length !== 0)) {
      const productPropertiesValues = productProperties.content
        .filter(item => item.value.length !== 0)
        .map(item => item.value);
      const propertyValueCombinations = MiscUtils.recursiveFlatMap(productPropertiesValues);

      for (const propertyValueCombination of propertyValueCombinations) {
        const variant = { ...defaultVariant };
        variant.properties = new CollectionWrapper(productProperties.content
          .filter(item => item.value.length !== 0)
          .map(item => ({ ...item, value: '' })));
        variant.properties.content.forEach((item, index) => (item.value = propertyValueCombination[index]));
        currentVariants.push(variant);
      }

      currentSelectedVariantIndexes.push(...Array.from(Array(propertyValueCombinations.length).keys()));
    } else {
      currentVariants.push(defaultVariant);
      currentSelectedVariantIndexes.push(0);
    }

    setVariants(currentVariants);
    setSelectedVariantIndexes(currentSelectedVariantIndexes);
  }, [productProperties]);

  return (
    <div className="rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phiên bản</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">SKU</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Giá vốn</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Giá bán</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {variants.map((variant, index) => (
            <ProductVariantRow
              key={index}
              variant={variant}
              index={index}
              variants={variants}
              setVariants={setVariants}
              selectedVariantIndexes={selectedVariantIndexes}
              setSelectedVariantIndexes={setSelectedVariantIndexes}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductVariants;
