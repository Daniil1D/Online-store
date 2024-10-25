import { CartStateItem } from "@/shared/lib/get-cart-details"
import { CheckoutItem } from "../checkout-item"
import { WhiteBlock } from "../white-block"
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";


interface Props {
    items: CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
    removeCartItem: (id: number) => void;
    loading?: boolean;
    className?: string
}

export const CheckoutCart: React.FC<Props> = ({
    items,
    onClickCountButton,
    removeCartItem,
    loading,
    className
}) => {
    return (
        <WhiteBlock title="1. Корзина" className={className}>
            <div className="flex flex-col gap-5">
                { loading 
                    ? loading && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index}/>)
                    :   items.map((item) => (
                            <CheckoutItem 
                                key={item.id}
                                id={item.id}
                                imageUrl={item.imageUrl}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                disabled={item.disabled}
                                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                onClickRemove={() => removeCartItem(item.id)}/>
                    ))
                } 
            </div>
        </WhiteBlock>
    )
}