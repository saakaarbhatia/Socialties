"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:51214/template1";
const pool = new pg_1.default.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log("Seeding started...");
    // 1. Roles and Permissions
    const permissionsList = [
        "campaigns.write",
        "campaigns.read",
        "team.write",
        "team.read",
        "leads.write",
        "leads.read",
        "leads.export",
        "settings.write",
        "users.write",
    ];
    console.log("Creating permissions...");
    const dbPermissions = [];
    for (const key of permissionsList) {
        const perm = await prisma.permission.upsert({
            where: { key },
            update: {},
            create: { key },
        });
        dbPermissions.push(perm);
    }
    console.log("Creating roles...");
    // SUPER_ADMIN
    const superAdminRole = await prisma.role.upsert({
        where: { name: "SUPER_ADMIN" },
        update: {
            permissions: {
                connect: dbPermissions.map((p) => ({ id: p.id })),
            },
        },
        create: {
            name: "SUPER_ADMIN",
            permissions: {
                connect: dbPermissions.map((p) => ({ id: p.id })),
            },
        },
    });
    // ADMIN
    const adminRole = await prisma.role.upsert({
        where: { name: "ADMIN" },
        update: {
            permissions: {
                connect: dbPermissions
                    .filter((p) => p.key !== "users.write")
                    .map((p) => ({ id: p.id })),
            },
        },
        create: {
            name: "ADMIN",
            permissions: {
                connect: dbPermissions
                    .filter((p) => p.key !== "users.write")
                    .map((p) => ({ id: p.id })),
            },
        },
    });
    // EDITOR
    const editorRole = await prisma.role.upsert({
        where: { name: "EDITOR" },
        update: {
            permissions: {
                connect: dbPermissions
                    .filter((p) => ["campaigns.write", "campaigns.read", "team.write", "team.read", "leads.read"].includes(p.key))
                    .map((p) => ({ id: p.id })),
            },
        },
        create: {
            name: "EDITOR",
            permissions: {
                connect: dbPermissions
                    .filter((p) => ["campaigns.write", "campaigns.read", "team.write", "team.read", "leads.read"].includes(p.key))
                    .map((p) => ({ id: p.id })),
            },
        },
    });
    // 2. Default Super Admin User
    console.log("Creating default super admin...");
    const adminEmail = "admin@socialties.in";
    const passwordHash = await bcryptjs_1.default.hash("admin123", 12);
    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            roleId: superAdminRole.id,
            isActive: true,
        },
        create: {
            name: "Super Admin",
            email: adminEmail,
            passwordHash,
            roleId: superAdminRole.id,
            isActive: true,
        },
    });
    // 3. Services
    console.log("Creating services...");
    const services = [
        {
            slug: "influencer-marketing",
            title: "Influencer Marketing",
            description: "Partner with top creators to drive brand awareness, organic engagement, and conversions across Instagram and YouTube.",
            icon: "Megaphone",
            sortOrder: 1,
        },
        {
            slug: "digital-advertising",
            title: "Digital Advertising",
            description: "Performance-driven paid campaigns across Google, Meta, and social ad networks optimized for ROI.",
            icon: "TrendingUp",
            sortOrder: 2,
        },
        {
            slug: "content-creation",
            title: "Content Creation",
            description: "Engaging vertical videos, reels, copy, and graphics tailored for modern platform algorithms.",
            icon: "Video",
            sortOrder: 3,
        },
        {
            slug: "product-photography",
            title: "Product Photography",
            description: "Stunning, high-end product photos and lifestyle shoots designed to make your catalog shine.",
            icon: "Camera",
            sortOrder: 4,
        },
        {
            slug: "website-development",
            title: "Website Development",
            description: "Custom, lightning-fast web applications designed with modern UX/UI and robust features.",
            icon: "Globe",
            sortOrder: 5,
        },
        {
            slug: "app-development",
            title: "App Development",
            description: "Tailored native and cross-platform mobile apps built for performance and high conversion.",
            icon: "Smartphone",
            sortOrder: 6,
        },
    ];
    for (const service of services) {
        await prisma.service.upsert({
            where: { slug: service.slug },
            update: {
                title: service.title,
                description: service.description,
                icon: service.icon,
                sortOrder: service.sortOrder,
            },
            create: service,
        });
    }
    // 4. Settings
    console.log("Creating settings...");
    const existingSettings = await prisma.homepageSettings.findFirst();
    if (!existingSettings) {
        await prisma.homepageSettings.create({
            data: {
                heroHeadline: "Where Brands Meet Real Influence.",
                heroSubheading: "We pair data-driven strategy with authentic storytelling to take your brand from just online to absolutely unforgettable.",
                statCampaigns: 150,
                statBrands: 50,
                statCreators: 500,
                statReach: BigInt("50000000"),
                trustedBrandLogos: [
                    { name: "Amazon", logoUrl: "/brands/amazon.svg" },
                    { name: "Paytm", logoUrl: "/brands/paytm.svg" },
                    { name: "Sugar", logoUrl: "/brands/sugar.svg" },
                    { name: "Myntra", logoUrl: "/brands/myntra.svg" },
                    { name: "OnePlus", logoUrl: "/brands/oneplus.svg" },
                ],
            },
        });
    }
    // 5. SEO Settings
    console.log("Creating default SEO settings...");
    const seoPages = [
        { pagePath: "/", title: "Socialties | Leading Influencer Marketing Agency India", description: "Grow your brand with Socialties, India's premier influencer marketing and digital creative agency. Strategy meets storytelling." },
        { pagePath: "/campaigns", title: "Our Campaigns | Socialties Case Studies", description: "Explore how Socialties drives real ROI for top brands. Check out our influencer marketing and advertising case studies." },
        { pagePath: "/team", title: "Meet the Team | Socialties", description: "Meet the strategists, creators, and developers behind Socialties. Our people make influence happen." },
        { pagePath: "/creators", title: "For Creators | Join Socialties Network", description: "Are you a creator? Monetize your audience, land premium brand campaigns, and grow with Socialties representation." },
        { pagePath: "/brands", title: "For Brands | Launch Campaigns with Socialties", description: "Scale your customer acquisition. Partner with Socialties to build end-to-end influencer marketing campaigns." },
        { pagePath: "/contact", title: "Contact Us | Socialties Delhi Office", description: "Get in touch with Socialties. Start your campaign today. Located in Azadpur, New Delhi." }
    ];
    for (const seo of seoPages) {
        await prisma.seoSetting.upsert({
            where: { pagePath: seo.pagePath },
            update: {
                title: seo.title,
                description: seo.description,
            },
            create: seo,
        });
    }
    console.log("Seeding complete successfully!");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
