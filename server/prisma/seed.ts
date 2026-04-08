import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // --- JOBS ---
  const jobs = [
    {
      title: 'Senior Frontend Developer',
      description: 'We are looking for an experienced Frontend Developer to join our team.',
      longDescription: 'As a Senior Frontend Developer, you will be responsible for building high-quality, responsive web applications using React and Next.js. You will work closely with our design and backend teams to deliver exceptional user experiences.',
      responsibilities: [
        'Develop new user-facing features using React.js and Next.js',
        'Build reusable code and libraries for future use',
        'Ensure the technical feasibility of UI/UX designs',
        'Optimize application for maximum speed and scalability',
        'Collaborate with other team members and stakeholders'
      ],
      requirements: [
        '5+ years of experience in frontend development',
        'Strong proficiency in JavaScript, TypeScript, HTML, and CSS',
        'Experience with React.js and Next.js',
        'Familiarity with state management libraries (Redux, Zustand, etc.)',
        'Understanding of server-side rendering and its benefits'
      ],
      salary: '$80,000 - $120,000',
      experience: '5+ Years',
      location: 'Remote',
      deadline: new Date('2026-03-01'),
      jobType: 'Full-time',
      vacancies: '2',
      category: 'Engineering',
      gender: 'Any'
    },
    {
      title: 'Backend Developer',
      description: 'Join our backend team to build robust and scalable APIs.',
      longDescription: 'We are seeking a skilled Backend Developer to design and implement server-side logic. You will be working with Node.js, NestJS, and PostgreSQL to build performant and secure APIs.',
      responsibilities: [
        'Design and implementation of low-latency, high-availability, and performant applications',
        'Implementation of security and data protection',
        'Integration of data storage solutions (PostgreSQL, Redis, etc.)',
        'Write unit and integration tests',
        'Participate in code reviews and architectural discussions'
      ],
      requirements: [
        '3+ years of experience in backend development',
        'Proficiency in Node.js and TypeScript',
        'Experience with NestJS or Express',
        'Strong knowledge of SQL and database design',
        'Familiarity with Docker and containerization'
      ],
      salary: '$70,000 - $100,000',
      experience: '3+ Years',
      location: 'New York, NY',
      deadline: new Date('2026-02-28'),
      jobType: 'Full-time',
      vacancies: '3',
      category: 'Engineering',
      gender: 'Any'
    },
    {
      title: 'UI/UX Designer',
      description: 'Create beautiful and intuitive user interfaces for our products.',
      longDescription: 'We are looking for a creative UI/UX Designer to turn complex problems into simple, elegant, and user-centric solutions. You will be involved in the entire design process from user research to high-fidelity prototyping.',
      responsibilities: [
        'Gather and evaluate user requirements in collaboration with product managers and engineers',
        'Illustrate design ideas using storyboards, process flows and sitemaps',
        'Design graphic user interface elements, like menus, tabs and widgets',
        'Build page navigation buttons and search fields',
        'Develop UI mockups and prototypes that clearly illustrate how sites function and look like'
      ],
      requirements: [
        '3+ years of experience as a UI/UX Designer',
        'Portfolio of design projects',
        'Knowledge of wireframe tools (e.g. Wireframe.cc and InVision)',
        'Up-to-date knowledge of design software like Adobe Illustrator and Photoshop',
        'Team spirit; strong communication skills to collaborate with various stakeholders'
      ],
      salary: '$60,000 - $90,000',
      experience: '3+ Years',
      location: 'London, UK',
      deadline: new Date('2026-03-15'),
      jobType: 'Contract',
      vacancies: '1',
      category: 'Design',
      gender: 'Any'
    },
     {
      title: 'Product Manager',
      description: 'Lead the product vision and strategy for our core products.',
      longDescription: 'As a Product Manager, you will be responsible for defining the product roadmap and strategy. You will work closely with engineering, design, and marketing teams to deliver products that customers love.',
      responsibilities: [
        'Define the product strategy and roadmap',
        'Deliver MRDs and PRDs with prioritized features and corresponding justification',
        'Work with external third parties to assess partnerships and licensing opportunities',
        'Run beta and pilot programs with early-stage products and samples',
        'Be an expert with respect to the competition'
      ],
      requirements: [
        '3+ years of experience in product management',
        'Proven track record of managing all aspects of a successful product throughout its lifecycle',
        'Proven ability to develop product and marketing strategies and effectively communicate recommendations to executive management',
        'Solid technical background with understanding and/or hands-on experience in software development and web technologies',
        'Strong problem solving skills and willingness to roll up one’s sleeves to get the job done'
      ],
      salary: '$90,000 - $130,000',
      experience: '3+ Years',
      location: 'San Francisco, CA',
      deadline: new Date('2026-04-01'),
      jobType: 'Full-time',
      vacancies: '1',
      category: 'Product',
      gender: 'Any'
    }
  ];

  console.log('Seeding Jobs...');
  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }

  // --- PROJECTS ---
  console.log('Seeding Projects...');
  const projects = [
    {
      title: 'Modern Seaside Villa',
      description: 'A stunning villa with panoramic ocean views, featuring modern architecture and luxurious amenities.',
      location: 'Malibu, California',
      date: '2024',
      price: '$4,500,000',
      beds: 5,
      baths: 4,
      area: 4500,
      category: 'Residential',
      status: 'For Sale',
      featured: true,
      image: 'https://res.cloudinary.com/ddysafn4k/image/upload/v1770026910/3_a4jmqe.webp'
    },
    {
      title: 'Urban Chic Apartment',
      description: 'Located in the heart of the city, this apartment offers convenience and style with high-end finishes.',
      location: 'New York, NY',
      date: '2023',
      price: '$1,200,000',
      beds: 2,
      baths: 2,
      area: 1200,
      category: 'Residential',
      status: 'For Sale',
      featured: false,
      image: 'https://res.cloudinary.com/ddysafn4k/image/upload/v1770026910/4_nl4ihw.webp'
    },
    {
      title: 'Cozy Mountain Retreat',
      description: 'Escape to nature in this cozy cabin, perfect for weekend getaways or year-round living.',
      location: 'Aspen, Colorado',
      date: '2022',
      price: '$850,000',
      beds: 3,
      baths: 2,
      area: 2100,
      category: 'Residential',
      status: 'Sold',
      featured: false,
      image: 'https://res.cloudinary.com/ddysafn4k/image/upload/v1770026910/5_mzgxvu.webp'
    },
    {
      title: 'Luxury Commercial Space',
      description: 'Prime office space in a bustling business district, designed for modern companies.',
      location: 'London, UK',
      date: '2025',
      price: '$3,000,000',
      beds: 0,
      baths: 4,
      area: 5000,
      category: 'Commercial',
      status: 'For Rent',
      featured: true,
      image: 'https://res.cloudinary.com/ddysafn4k/image/upload/v1770026910/6_fdinjm.webp'
    },
    {
      title: 'Contemporary Family Home',
      description: 'Spacious family home with a large backyard and open-concept living areas.',
      location: 'Austin, Texas',
      date: '2024',
      price: '$950,000',
      beds: 4,
      baths: 3,
      area: 3200,
      category: 'Residential',
      status: 'For Sale',
      featured: true,
      image: 'https://res.cloudinary.com/ddysafn4k/image/upload/v1770026910/2_tm1tmz.webp'
    },
    {
      title: 'Minimalist Studio',
      description: 'A sleek and efficient studio apartment ideal for young professionals.',
      location: 'Tokyo, Japan',
      date: '2023',
      price: '$400,000',
      beds: 1,
      baths: 1,
      area: 600,
      category: 'Residential',
      status: 'For Rent',
      featured: false,
      image: 'https://res.cloudinary.com/ddysafn4k/image/upload/v1770026911/7_sftioz.webp'
    },
    {
      title: 'Historic Townhouse',
      description: 'Beautifully restored townhouse with original architectural details and modern updates.',
      location: 'Boston, Massachusetts',
      date: '2021',
      price: '$2,100,000',
      beds: 4,
      baths: 3,
      area: 2800,
      category: 'Residential',
      status: 'Sold',
      featured: true,
      image: 'https://res.cloudinary.com/ddysafn4k/image/upload/v1770026911/9_u2fpka.webp'
    },
    {
      title: 'Lakefront Cottage',
      description: 'Charming cottage right on the water, offering peaceful views and private dock access.',
      location: 'Lake Tahoe, Nevada',
      date: '2022',
      price: '$1,500,000',
      beds: 3,
      baths: 2,
      area: 1800,
      category: 'Residential',
      status: 'For Sale',
      featured: false,
      image: 'https://res.cloudinary.com/ddysafn4k/image/upload/v1770026911/8_wlannv.webp'
    },
    {
      title: 'Industrial Loft',
      description: 'Converted warehouse loft with high ceilings, exposed brick, and large windows.',
      location: 'Berlin, Germany',
      date: '2023',
      price: '$750,000',
      beds: 2,
      baths: 2,
      area: 1500,
      category: 'Residential',
      status: 'For Rent',
      featured: true,
      image: 'https://res.cloudinary.com/ddysafn4k/image/upload/v1770026911/10_aptriy.webp'
    }
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }

  // --- PROJECTS PAGE ---
  console.log('Seeding Projects Page...');
  // Check if it already exists to avoid duplicates if re-running (though seed usually clears or we should be careful)
  // But for simple seed, create is fine if we assume empty DB or just want to add it.
  // Ideally upsert or deleteMany first.
  // Given this is a dev seed, I'll just create.
  
  await prisma.projectsPage.create({
    data: {
      heroBadge: "Exclusive Portfolio",
      heroTitle: "Curated Excellence",
      heroDescription: "Explore a world of architectural marvels. From modern villas to timeless estates, find the home that reflects your legacy.",
      statsCount1: "140+",
      statsLabel1: "Properties",
      statsCount2: "12",
      statsLabel2: "Cities",
      heroImages: [
        "https://res.cloudinary.com/ddysafn4k/image/upload/v1770026910/3_a4jmqe.webp",
        "https://res.cloudinary.com/ddysafn4k/image/upload/v1770026910/4_nl4ihw.webp",
        "https://res.cloudinary.com/ddysafn4k/image/upload/v1770026910/5_mzgxvu.webp",
        "https://res.cloudinary.com/ddysafn4k/image/upload/v1770026910/6_fdinjm.webp",
        "https://res.cloudinary.com/ddysafn4k/image/upload/v1770026910/2_tm1tmz.webp"
      ]
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
