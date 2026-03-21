import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/index.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const photographers = require('./data/photographer.json');
const medias = require('./data/media.json');

const adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.photographer.createMany({ data: photographers });
  await prisma.media.createMany({ data: medias });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });