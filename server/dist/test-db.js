"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./src/helper/prisma");
async function testDB() {
    try {
        await prisma_1.prisma.$connect();
        const result = await prisma_1.prisma.$queryRaw `SELECT 1`;
        console.log('✅ Neon DB connected:', result);
    }
    catch (error) {
        console.error('❌ Neon DB connection failed:', error);
    }
    finally {
        await prisma_1.prisma.$disconnect();
    }
}
testDB();
//# sourceMappingURL=test-db.js.map