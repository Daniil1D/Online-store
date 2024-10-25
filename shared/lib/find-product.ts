import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    priceFrom?: string;
    priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 20000;

export const findProduct = async (params: GetSearchParams) => {
    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

    const categories = await prisma.category.findMany({
        include: {
          products: {
            orderBy: {
                id: 'desc'
            },
            where: {
                items: {
                    some: {
                        price: {
                            gte: minPrice,
                            lte: maxPrice
                        }
                    }
                }
            },
            include: {
              items: {
                where: {
                    price: {
                        gte: minPrice,
                        lte: maxPrice
                    }
                },
                orderBy: {
                    price: 'asc'
                }
              }
            },
          },
        },
    });

    return categories;
}