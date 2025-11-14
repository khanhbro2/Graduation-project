import React, { useEffect, useState } from 'react';
import { VariantPropertyItem, VariantRequest } from 'models/Variant';
import { CollectionWrapper } from 'types';
import { ProductPropertyItem } from 'models/Product';
import { AddVariantsModal, ProductVariantRow } from 'components';
import MiscUtils from 'utils/MiscUtils';
import { Dialog } from '@headlessui/react';

interface ProductVariantsForUpdateProps {
  variants: VariantRequest[];
  setVariants: (variants: VariantRequest[]) => void;
  productProperties: CollectionWrapper<ProductPropertyItem> | null;
  setProductProperties: (productProperties: CollectionWrapper<ProductPropertyItem> | null) => void;
  selectedVariantIndexes: number[];
  setSelectedVariantIndexes: React.Dispatch<React.SetStateAction<number[]>>;
}

function ProductVariantsForUpdate({
  variants,
  setVariants,
  productProperties,
  setProductProperties,
  selectedVariantIndexes,
  setSelectedVariantIndexes,
}: ProductVariantsForUpdateProps) {
  const [propertyValueCombinations, setPropertyValueCombinations] = useState<string[][]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (productProperties) {
      const productPropertiesValues = productProperties.content.map(item => item.value);
      const currentPropertyValueCombinations = MiscUtils.recursiveFlatMap(productPropertiesValues);
      setPropertyValueCombinations(currentPropertyValueCombinations);
    }
    setSelectedVariantIndexes(Array.from(Array(variants.length).keys()));
  }, [variants]);

  const isDisabledOpenAddVariantsModalButton = propertyValueCombinations.length === 0
    || propertyValueCombinations.length === variants.length;

  const remainingPropertyValueCombinations = () => {
    const propertyValueCombinationStringsOfCurrentVariants = variants
      .map(variant => variant.properties?.content.map(property => property.value))
      .map(combination => JSON.stringify(combination));
    return propertyValueCombinations
      .map(combination => JSON.stringify(combination))
      .filter(combinationString => !propertyValueCombinationStringsOfCurrentVariants.includes(combinationString))
      .map(combinationString => JSON.parse(combinationString) as string[]);
  };

  const handleAddVariantsButton = (selectedRemainingPropertyValueCombinationIndexes: number[]) => {
    const defaultVariant: VariantRequest = { sku: '', cost: 0, price: 0, properties: null, status: 1 };
    const currentVariants: VariantRequest[] = [...variants];

    const selectedRemainingPropertyValueCombinations = remainingPropertyValueCombinations()
      .filter((_, index) => selectedRemainingPropertyValueCombinationIndexes.includes(index));

    for (const selectedRemainingPropertyValueCombination of selectedRemainingPropertyValueCombinations) {
      const variant = { ...defaultVariant };
      variant.properties = JSON.parse(JSON.stringify(productProperties)) as CollectionWrapper<VariantPropertyItem>;
      variant.properties.content.forEach((item, index) => (item.value = selectedRemainingPropertyValueCombination[index]));
      currentVariants.push(variant);
    }

    setVariants(currentVariants);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
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
                isNewable={!variant.id}
              />
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isDisabledOpenAddVariantsModalButton}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Thêm phiên bản sản phẩm {!isDisabledOpenAddVariantsModalButton && `(${propertyValueCombinations.length - variants.length})`}
      </button>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">Thêm phiên bản</Dialog.Title>
            <AddVariantsModal
              remainingPropertyValueCombinations={remainingPropertyValueCombinations()}
              handleAddVariantsButton={handleAddVariantsButton}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default ProductVariantsForUpdate;
