import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not defined.');
  }

  return databaseUrl;
}

const adapter = new PrismaPg({
  connectionString: getDatabaseUrl(),
});

const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  await prisma.restaurant.create({
    data: {
      name: 'Pasta Palace',
      description: 'Fresh Italian pasta, pizza and comfort food.',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      menuItems: {
        create: [
          {
            name: 'Spaghetti Carbonara',
            description: 'Classic carbonara with pancetta and parmesan.',
            price: 3490,
            imageUrl:
              'https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9',
          },
          {
            name: 'Margherita Pizza',
            description: 'Tomato sauce, mozzarella and fresh basil.',
            price: 2990,
            imageUrl:
              'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
          },
          {
            name: 'Tiramisu',
            description: 'Coffee-flavoured Italian dessert.',
            price: 1890,
            imageUrl:
              'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
          },
        ],
      },
    },
  });

  await prisma.restaurant.create({
    data: {
      name: 'Burger Hub',
      description: 'Juicy burgers, fries and homemade sauces.',
      imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
      menuItems: {
        create: [
          {
            name: 'Classic Cheeseburger',
            description: 'Beef patty, cheddar, pickles and house sauce.',
            price: 3290,
            imageUrl:
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
          },
          {
            name: 'Crispy Chicken Burger',
            description: 'Crispy chicken, lettuce and garlic mayo.',
            price: 3190,
            imageUrl:
              'https://images.unsplash.com/photo-1615297928064-24977384d0da',
          },
          {
            name: 'Loaded Fries',
            description: 'Fries with cheese, bacon and jalapeños.',
            price: 1990,
            imageUrl:
              'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
          },
        ],
      },
    },
  });

  await prisma.restaurant.create({
    data: {
      name: 'Sushi Street',
      description: 'Simple sushi sets and Japanese-inspired bowls.',
      imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
      menuItems: {
        create: [
          {
            name: 'Salmon Maki Set',
            description: 'Fresh salmon maki with soy sauce and wasabi.',
            price: 4290,
            imageUrl:
              'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351',
          },
          {
            name: 'Chicken Teriyaki Bowl',
            description:
              'Rice bowl with chicken, vegetables and teriyaki sauce.',
            price: 3690,
            imageUrl:
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
          },
          {
            name: 'Miso Soup',
            description: 'Traditional miso soup with tofu and seaweed.',
            price: 1290,
            imageUrl:
              'https://images.unsplash.com/photo-1607301405390-d831c242f59c',
          },
        ],
      },
    },
  });

  console.log('Database has been seeded.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
