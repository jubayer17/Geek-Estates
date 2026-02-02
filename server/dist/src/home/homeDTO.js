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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFeaturedImageDto = exports.CreateFeaturedImageDto = exports.UpdateLegacySectionDto = exports.CreateLegacySectionDto = exports.CreateHeroBannerDto = void 0;
const class_validator_1 = require("class-validator");
class CreateHeroBannerDto {
    badgeText;
    title;
    subtitle;
    button1Text;
    button2Text;
    isActive;
}
exports.CreateHeroBannerDto = CreateHeroBannerDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHeroBannerDto.prototype, "badgeText", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHeroBannerDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHeroBannerDto.prototype, "subtitle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHeroBannerDto.prototype, "button1Text", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHeroBannerDto.prototype, "button2Text", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHeroBannerDto.prototype, "isActive", void 0);
class CreateLegacySectionDto {
    journeyTag;
    title;
    emphasis;
    description;
}
exports.CreateLegacySectionDto = CreateLegacySectionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLegacySectionDto.prototype, "journeyTag", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLegacySectionDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLegacySectionDto.prototype, "emphasis", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLegacySectionDto.prototype, "description", void 0);
class UpdateLegacySectionDto {
    journeyTag;
    title;
    emphasis;
    description;
}
exports.UpdateLegacySectionDto = UpdateLegacySectionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegacySectionDto.prototype, "journeyTag", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegacySectionDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegacySectionDto.prototype, "emphasis", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegacySectionDto.prototype, "description", void 0);
class CreateFeaturedImageDto {
    order;
    label;
    title;
    description;
}
exports.CreateFeaturedImageDto = CreateFeaturedImageDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateFeaturedImageDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFeaturedImageDto.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFeaturedImageDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFeaturedImageDto.prototype, "description", void 0);
class UpdateFeaturedImageDto {
    order;
    label;
    title;
    description;
}
exports.UpdateFeaturedImageDto = UpdateFeaturedImageDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateFeaturedImageDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFeaturedImageDto.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFeaturedImageDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFeaturedImageDto.prototype, "description", void 0);
//# sourceMappingURL=homeDTO.js.map