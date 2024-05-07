import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      password: 'password123',
      email: 'john@example.com',
      category: {
        create: [{ name: 'Category A' }, { name: 'Category B' }],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      password: 'password456',
      email: 'jane@example.com',
      category: {
        create: [{ name: 'Category C' }, { name: 'Category D' }],
      },
    },
  });

  console.log('Users created:', user1, user2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
