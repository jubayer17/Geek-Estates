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
const homeDTO_1 = require("./homeDTO");
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
    create(dto) {
        return this.homeService.textSectionCreate(dto);
    }
    getAll() {
        return this.homeService.textSectionGetAll();
    }
    getById(id) {
        return this.homeService.textSectionGetById(id);
    }
    update(id, dto) {
        return this.homeService.textSectionUpdate(id, dto);
    }
    remove(id) {
        return this.homeService.textSectionRemove(id);
    }
    featuredImageCreate(files, data) {
        let parsedData;
        try {
            parsedData = JSON.parse(data);
        }
        catch {
            throw new common_1.BadRequestException('Invalid JSON in data field');
        }
        return this.homeService.featuredImageCreate(parsedData, files.image?.[0], files.icon?.[0]);
    }
    featuredImageGetAll() {
        return this.homeService.featuredImageGetAll();
    }
    featuredImageGetById(id) {
        return this.homeService.featuredImageGetById(id);
    }
    featuredImageUpdate(id, files, data) {
        let parsedData;
        try {
            parsedData = JSON.parse(data);
        }
        catch {
            throw new common_1.BadRequestException('Invalid JSON in data field');
        }
        return this.homeService.featuredImageUpdate(id, parsedData, files.image?.[0], files.icon?.[0]);
    }
    featuredImageDelete(id) {
        return this.homeService.featuredImageDelete(id);
    }
    getCompanyExperience() {
        return this.homeService.getCompanyExperience();
    }
    getCompanyExperienceByID(id) {
        return this.homeService.getCompanyExperienceById(id);
    }
    createCompanyExperience(body) {
        return this.homeService.createCompanyExperience(body);
    }
    updateCompanyExperience(id, body) {
        return this.homeService.updateCompanyExperience(id, body);
    }
    deleteCompanyExperience(id) {
        return this.homeService.deleteCompanyExperience(id);
    }
    parseData(data) {
        if (!data)
            return {};
        try {
            return JSON.parse(data);
        }
        catch {
            throw new common_1.BadRequestException('Invalid JSON in data field');
        }
    }
    property_search_stepCreate(data, files) {
        const parsedData = this.parseData(data);
        return this.homeService.property_search_stepCreate(parsedData, files);
    }
    property_search_stepsGetAll() {
        return this.homeService.property_search_stepsGetAll();
    }
    property_search_stepGetByID(id) {
        return this.homeService.property_search_stepGetByID(id);
    }
    property_search_stepUpdate(id, data, files) {
        const parsedData = this.parseData(data);
        return this.homeService.property_search_stepUpdate(id, parsedData, files);
    }
    property_search_stepDelete(id) {
        return this.homeService.property_search_stepDelete(id);
    }
    async getContactInfo() {
        return this.homeService.getContactInfo();
    }
    async postContactInfo(body) {
        return this.homeService.createContactInfo(body);
    }
    async updateContactInfo(id, body) {
        return this.homeService.updateContactInfo(id, body);
    }
    async deleteContactInfo(id) {
        return this.homeService.deleteContactInfo(id);
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
    (0, common_1.Put)('/heroBanner/:id'),
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
__decorate([
    (0, common_1.Post)("/text"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [homeDTO_1.CreateLegacySectionDto]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/text'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/text/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)('/text/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, homeDTO_1.UpdateLegacySectionDto]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/text/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("/featuredImage"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'image', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
    ], {
        storage: fileUploader_1.fileUploader.storage,
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "featuredImageCreate", null);
__decorate([
    (0, common_1.Get)("/featuredImage"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "featuredImageGetAll", null);
__decorate([
    (0, common_1.Get)('/featuredImage/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "featuredImageGetById", null);
__decorate([
    (0, common_1.Put)('/featuredImage/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'image', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
    ], {
        storage: fileUploader_1.fileUploader.storage,
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "featuredImageUpdate", null);
__decorate([
    (0, common_1.Delete)('/featuredImage/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "featuredImageDelete", null);
__decorate([
    (0, common_1.Get)("/companyExperienceText"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "getCompanyExperience", null);
__decorate([
    (0, common_1.Get)('/companyExperienceText/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "getCompanyExperienceByID", null);
__decorate([
    (0, common_1.Post)("/companyExperienceText"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "createCompanyExperience", null);
__decorate([
    (0, common_1.Put)('/companyExperienceText/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "updateCompanyExperience", null);
__decorate([
    (0, common_1.Delete)('/companyExperienceText/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "deleteCompanyExperience", null);
__decorate([
    (0, common_1.Post)('/propertySearch'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'image', maxCount: 1 },
        { name: 'icons', maxCount: 1 },
    ], { storage: fileUploader_1.fileUploader.storage })),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "property_search_stepCreate", null);
__decorate([
    (0, common_1.Get)('/propertySearch'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "property_search_stepsGetAll", null);
__decorate([
    (0, common_1.Get)('/propertySearch/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "property_search_stepGetByID", null);
__decorate([
    (0, common_1.Put)('/propertySearch/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'image', maxCount: 1 },
        { name: 'icons', maxCount: 1 },
    ], { storage: fileUploader_1.fileUploader.storage })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('data')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "property_search_stepUpdate", null);
__decorate([
    (0, common_1.Delete)('/propertySearch/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "property_search_stepDelete", null);
__decorate([
    (0, common_1.Get)("/contactInfo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getContactInfo", null);
__decorate([
    (0, common_1.Post)("/contactInfo"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "postContactInfo", null);
__decorate([
    (0, common_1.Put)('/contactInfo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "updateContactInfo", null);
__decorate([
    (0, common_1.Delete)('/contactInfo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "deleteContactInfo", null);
exports.HomeController = HomeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [home_service_1.HomeService])
], HomeController);
//# sourceMappingURL=home.controller.js.map