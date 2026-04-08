import { prisma } from "src/helper/prisma"


async function testDB() {
  try {
    await prisma.$connect()
    const result = await prisma.$queryRaw`SELECT 1`
    console.log('✅ Neon DB connected:', result)
  } catch (error) {
    console.error('❌ Neon DB connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDB()