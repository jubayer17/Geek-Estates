"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_1 = require("./helper/prisma");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(process.env.PORT ?? 5000);
    try {
        const result = await prisma_1.prisma.$queryRaw `SELECT 1+1 AS result`;
        console.log("DB connected:", result);
    }
    catch (err) {
        console.error("DB connection failed:", err);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map