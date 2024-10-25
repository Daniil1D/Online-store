'use client'

import { ChooseProductForm } from "@/shared/components/shared";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction
}
export const ProductForm: React.FC<Props> = ({
    product,
    onSubmit: _onSubmit
}) => {
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);
  
  const firstItem = product.items[0]

  const onAddProduct = async () => {
    try {
      await addCartItem({
        productItemId: firstItem.id
      }),
      toast.success(product.name + " успешно добавлен!")
      _onSubmit?.();
    } catch(err) {
      toast.error("Не удалось добавить " + product.name)
      console.log(err)
    }
  }

  return (
    <ChooseProductForm 
        imageUrl={product.imageUrl} 
        name={product.name} 
        price={firstItem.price} 
        onSubmit={onAddProduct}
        loading={loading}
    />
  );
}
