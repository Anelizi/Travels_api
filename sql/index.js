import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const NUM_OF_VALUES = 100_000;

(async () => {
  const start = Date.now();
  for (let i = 1; i <= NUM_OF_VALUES; i++) {
    console.log(`CREATING PASSENGER ${i} of ${NUM_OF_VALUES}`);
    await prisma.passenger.create({
      data: {
        fullName: faker.person.fullName(),
        travels: {
          create: [
            {
              travel: {
                create: {
                  origin: faker.location.country(),
                  destination: faker.location.country()
                }
              },
              date: faker.date.anytime()
            }
          ]
        }
      }
    })
  }
  const end = Date.now();
  console.log(`OPERATION FINISHED IN ${(end - start) / 1000} SECONDS`);
})()