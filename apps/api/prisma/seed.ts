import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  await prisma.restaurant.create({
    data: {
      name: 'Pasta Palace',
      slug: 'pasta-palace',
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
      slug: 'burger-hub',
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
      slug: 'sushi-street',
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

  await prisma.restaurant.create({
    data: {
      name: 'Taco Town',
      slug: 'taco-town',
      description: 'Mexican-inspired tacos, burritos and fresh sides.',
      imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
      menuItems: {
        create: [
          {
            name: 'Beef Tacos',
            description: 'Soft tortillas with seasoned beef, salsa and lime.',
            price: 3290,
            imageUrl:
              'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
          },
          {
            name: 'Chicken Burrito',
            description:
              'Large tortilla filled with chicken, rice, beans and cheese.',
            price: 3790,
            imageUrl:
              'https://images.unsplash.com/photo-1626700051175-6818013e1d4f',
          },
          {
            name: 'Nachos Supreme',
            description:
              'Crispy nachos with cheese sauce, jalapeños and salsa.',
            price: 2490,
            imageUrl:
              'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d',
          },
        ],
      },
    },
  });

  await prisma.restaurant.create({
    data: {
      name: 'Green Garden',
      slug: 'green-garden',
      description: 'Fresh salads, bowls and vegetarian-friendly meals.',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      menuItems: {
        create: [
          {
            name: 'Avocado Salad',
            description:
              'Mixed greens with avocado, cherry tomatoes and seeds.',
            price: 2990,
            imageUrl:
              'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
          },
          {
            name: 'Falafel Bowl',
            description:
              'Falafel with hummus, rice, cucumber, tomato and tahini sauce.',
            price: 3490,
            imageUrl:
              'https://images.unsplash.com/photo-1543339308-43e59d6b73a6',
          },
          {
            name: 'Smoothie Cup',
            description: 'Berry smoothie with banana, granola and coconut.',
            price: 1990,
            imageUrl:
              'https://images.unsplash.com/photo-1505252585461-04db1eb84625',
          },
        ],
      },
    },
  });

  await prisma.restaurant.create({
    data: {
      name: 'Curry Corner',
      slug: 'curry-corner',
      description: 'Warm Indian-style curries, rice dishes and naan breads.',
      imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe',
      menuItems: {
        create: [
          {
            name: 'Butter Chicken',
            description: 'Creamy tomato-based chicken curry with basmati rice.',
            price: 4190,
            imageUrl:
              'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
          },
          {
            name: 'Vegetable Curry',
            description: 'Mixed vegetables in a mild curry sauce with rice.',
            price: 3490,
            imageUrl:
              'https://images.unsplash.com/photo-1631292784640-2b24be784d5d',
          },
          {
            name: 'Garlic Naan',
            description: 'Soft naan bread with garlic butter.',
            price: 1190,
            imageUrl:
              'https://images.unsplash.com/photo-1673545518947-ddf3240090b1',
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
