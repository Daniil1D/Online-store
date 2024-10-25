import { prisma } from "@/prisma/prisma-client"
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export const updateCartTotalAmount = async (token: string) => {

    //найдеть корзину по токену
    const userCart = await prisma.cart.findFirst({
        where: {
            token
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true
                        }
                    }
                }
            }
        }
    })

    if (!userCart) {
        return;
    }

    //считаем общую сумму
    const totalAmount = userCart.items.reduce((acc, item) => {
        return acc + calcCartItemTotalPrice(item);
    }, 0)

    //обновляем корзину
    return await prisma.cart.update({
        where: {
            //token
            id: userCart.id
        },
        data: {
            totalAmount
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true
                        }
                    }
                }
            }
        }
    })
}