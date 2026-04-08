-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "hero_banner" (
    "id" TEXT NOT NULL,
    "badgeText" TEXT,
    "title" TEXT,
    "subtitle" TEXT,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buttonText1" TEXT,
    "buttonText2" TEXT,

    CONSTRAINT "hero_banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerPage" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "heroImage" TEXT NOT NULL DEFAULT '/career.jpg',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'We’re always looking for talented people. Explore opportunities and grow your career with us!',
    "heroTitle" TEXT NOT NULL DEFAULT 'Join Our Team',
    "jobsBadge" TEXT NOT NULL DEFAULT 'Join The Team',
    "jobsDescription" TEXT NOT NULL DEFAULT 'Discover the role that will challenge you, inspire you, and let you make a real impact.',
    "jobsTitle" TEXT NOT NULL DEFAULT 'Current Positions',
    "perksBadge" TEXT NOT NULL DEFAULT 'Employee Benefits',
    "perksDescription" TEXT NOT NULL DEFAULT 'We believe that when you feel your best, you do your best work. That''s why we''ve crafted a benefits package that supports you inside and outside the office.',
    "perksTitle" TEXT NOT NULL DEFAULT 'Everything You Need To Thrive.',
    "valuesBadge" TEXT NOT NULL DEFAULT 'Our Core Philosophy',
    "valuesDescription" TEXT NOT NULL DEFAULT 'At Geek Estate, we don''t just build properties; we build legacies. Our core values are the compass that guides every decision, ensuring we remain true to our mission of redefining modern living.',
    "valuesTitle" TEXT NOT NULL DEFAULT 'Driven by Purpose',

    CONSTRAINT "CareerPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerValue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerPerk" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerPerk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "responsibilities" TEXT[],
    "requirements" TEXT[],
    "salary" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "jobType" TEXT,
    "vacancies" TEXT,
    "category" TEXT,
    "gender" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT,
    "price" TEXT,
    "beds" INTEGER,
    "baths" INTEGER,
    "area" DOUBLE PRECISION,
    "category" TEXT,
    "status" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsPage" (
    "id" TEXT NOT NULL,
    "heroBadge" TEXT NOT NULL DEFAULT 'Exclusive Portfolio',
    "heroTitle" TEXT NOT NULL DEFAULT 'Curated Excellence',
    "heroDescription" TEXT NOT NULL DEFAULT 'Explore a world of architectural marvels. From modern villas to timeless estates, find the home that reflects your legacy.',
    "statsCount1" TEXT NOT NULL DEFAULT '140+',
    "statsLabel1" TEXT NOT NULL DEFAULT 'Properties',
    "statsCount2" TEXT NOT NULL DEFAULT '12',
    "statsLabel2" TEXT NOT NULL DEFAULT 'Cities',
    "heroImages" TEXT[] DEFAULT ARRAY['/outdoor-real-state/1.webp', '/outdoor-real-state/2.webp', '/outdoor-real-state/3.webp', '/outdoor-real-state/4.webp', '/outdoor-real-state/5.webp']::TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectsPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_section" (
    "id" TEXT NOT NULL,
    "journeyTag" TEXT,
    "title" TEXT NOT NULL,
    "emphasis" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "text_section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
