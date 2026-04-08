import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async create(createAdminDto: CreateAdminDto) {
    const { email, password, name } = createAdminDto;

    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.prisma.admin.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Remove password from response
    const { password: _, ...result } = admin;
    return result;
  }

  async login(email: string, pass: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, admin.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin.id, email: admin.email, role: 'admin' };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    };
  }


  findAll() {
    return this.prisma.admin.findMany();
  }

  findOne(id: string) {
    return this.prisma.admin.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: string) {
    return this.prisma.admin.delete({
      where: { id },
    });
  }
}

