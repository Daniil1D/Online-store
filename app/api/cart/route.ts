import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ totalAmout: 0, items: []});
        }//если токена нету, то мы возвращаем пустую корзину

        const userCart = await prisma.cart.findFirst({
            where: {//Указывает условия, по которым происходит поиск корзины.
                OR: [//оператор или
                    {
                        token
                    }
                ]//Таким образом, корзина может быть найдена либо по userId, либо по token.
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

        return NextResponse.json(userCart);
    } catch (error) {
        console.log('[CART_GET] Server error', error)
        return NextResponse.json({ message: 'Не удалось получить корзину'}, { status: 500})
    }
}

export async function POST(req: NextRequest) {
    try {
      let token = req.cookies.get('cartToken')?.value;
  
      if (!token) {
        token = crypto.randomUUID();
      }
  
      const userCart = await findOrCreateCart(token);
  
      const data = (await req.json()) as CreateCartItemValues;
  
      const findCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: userCart.id,
          productItemId: data.productItemId,
        },
      });
  
      // Если товар был найден, делаем +1
      if (findCartItem) {
        await prisma.cartItem.update({
          where: {
            id: findCartItem.id,
          },
          data: {
            quantity: findCartItem.quantity + 1,
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            productItemId: data.productItemId,
            quantity: 1,
          },
        });
      }
  
      const updatedUserCart = await updateCartTotalAmount(token);
  
      const resp = NextResponse.json(updatedUserCart);
      resp.cookies.set('cartToken', token);
      return resp;
    } catch (error) {
      console.log('[CART_POST] Server error', error);
      return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
    }
}
