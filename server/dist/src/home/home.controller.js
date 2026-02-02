"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const home_service_1 = require("./home.service");
const fileUploader_1 = require("../helper/fileUploader");
let HomeController = class HomeController {
    homeService;
    constructor(homeService) {
        this.homeService = homeService;
    }
    async createHeroBanner(file, data) {
        if (!data) {
            throw new common_1.BadRequestException('Data field is missing');
        }
        let parsedData;
        try {
            parsedData = JSON.parse(data);
        }
        catch {
            throw new common_1.BadRequestException('Invalid JSON format');
        }
        return this.homeService.createHeroBanner(parsedData, file);
    }
    async getHeroBanners() {
        return this.homeService.getHeroBanners();
    }
    async getHeroBannerById(id) {
        return this.homeService.getHeroBannerById(id);
    }
    async updateHeroBanner(id, file, data) {
        let parsedData = {};
        if (data) {
            try {
                parsedData = JSON.parse(data);
            }
            catch {
                throw new common_1.BadRequestException('Invalid JSON format');
            }
        }
        return this.homeService.updateHeroBanner(id, parsedData, file);
    }
    async deleteHeroBanner(id) {
        return this.homeService.deleteHeroBanner(id);
    }
};
exports.HomeController = HomeController;
__decorate([
    (0, common_1.Post)('/heroBanner'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: fileUploader_1.fileUploader.storage,
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "createHeroBanner", null);
__decorate([
    (0, common_1.Get)('/heroBanner'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHeroBanners", null);
__decorate([
    (0, common_1.Get)('/heroBanner/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHeroBannerById", null);
__decorate([
    (0, common_1.Patch)('/heroBanner/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: fileUploader_1.fileUploader.storage,
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "updateHeroBanner", null);
__decorate([
    (0, common_1.Delete)('/heroBanner/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "deleteHeroBanner", null);
exports.HomeController = HomeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [home_service_1.HomeService])
], HomeController);
//# sourceMappingURL=home.controller.js.map