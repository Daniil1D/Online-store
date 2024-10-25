import { Prisma } from '@prisma/client';
import { categories, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from 'bcrypt';

// Random number generator for prices
const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

// Generate product items without attributes
const generateProductItem = ({productId}: {productId: number}) => {
    return {
        productId,
        price: randomNumber(190, 5000),
        stock: randomNumber(10, 50),
        
    } as Prisma.ProductItemUncheckedCreateInput;
};

// Seeding function
async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User1',
                email: 'user1@gmail.com',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin1',
                email: 'admin1@gmail.com',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
            }
        ],
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.product.createMany({
        data: products,
    });

    await prisma.productItem.createMany({
        data: [
          // Остальные продукты
          generateProductItem({ productId: 1 }),
          generateProductItem({ productId: 2 }),
          generateProductItem({ productId: 3 }),
          generateProductItem({ productId: 4 }),
          generateProductItem({ productId: 5 }),
          generateProductItem({ productId: 6 }),
          generateProductItem({ productId: 7 }),
          generateProductItem({ productId: 8 }),
          generateProductItem({ productId: 9 }),
          generateProductItem({ productId: 10 }),
          generateProductItem({ productId: 11 }),
          generateProductItem({ productId: 12 }),
          generateProductItem({ productId: 13 }),
          generateProductItem({ productId: 14 }),
          generateProductItem({ productId: 15 }),
          generateProductItem({ productId: 16 }),
          generateProductItem({ productId: 17 }),
          generateProductItem({ productId: 18 }),
        ],
      });

    await prisma.cart.createMany({
        data: [
            { userId: 1, totalAmount: 0, token: '111' },
            { userId: 2, totalAmount: 0, token: '222' }
        ]
    });

    // Add test products to the cart
    await prisma.cartItem.createMany({
        data: [
            { cartId: 1, productItemId: 1, quantity: 2 },
            { cartId: 1, productItemId: 2, quantity: 1 },
            { cartId: 1, productItemId: 3, quantity: 1 },
            { cartId: 1, productItemId: 4, quantity: 5 }
        ]
    });
}

// Reset database
async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}

// Main function
async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.log(e);
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
