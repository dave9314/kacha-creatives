import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const passwordHash = await bcrypt.hash("KachaAdmin2024!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@kachacreatives.com" },
    update: {},
    create: {
      name: "Kacha Admin",
      email: "admin@kachacreatives.com",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Seed team members
  const teamMembers = [
    { name: "Biniyam Wondem", role: "Co-Founder & Project Manager", order: 1 },
    { name: "Brook Wondem", role: "Co-Founder & Creative Director", order: 2 },
    { name: "Erkara Abebe", role: "Photographer/Videographer", order: 3 },
    { name: "Merone Tsegaye", role: "Social Media Manager", order: 4 },
    { name: "Yoseph Arega", role: "Graphic Designer", order: 5 },
    { name: "Surafel Biyna", role: "Video Editor & Animator", order: 6 },
    { name: "Kirubel Fekadu", role: "Web Developer", order: 7 },
    { name: "Amanuel Desta", role: "Content Writer & Caption Creator", order: 8 },
    { name: "Hirut Zerihun", role: "Analytics & Strategy Expert", order: 9 },
    { name: "Henok Birhanu", role: "Marketing Interviewer/Host", order: 10 },
    { name: "Happy Wozeka", role: "Digital Campaign Manager", order: 11 },
    { name: "Tinat Wondinu", role: "Marketing Interviewer/Host", order: 12 },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        id: member.name.toLowerCase().replace(/\s+/g, "-"),
        ...member,
        isVisible: true,
      },
    });
  }
  console.log("✅ Team members seeded");

  // Seed services
  const services = [
    {
      id: "digital-marketing",
      name: "Digital Marketing & Social Media",
      description:
        "Drive growth and visibility across all major social platforms with data-driven strategies and consistent brand presence.",
      icon: "TrendingUp",
      items: [
        "Daily Page Management",
        "Facebook & Instagram",
        "TikTok & Telegram",
        "Analytics & Reporting",
        "Growth Optimization",
      ],
      order: 1,
    },
    {
      id: "content-creation",
      name: "Content Creation & Media Production",
      description:
        "Professional-grade video and photo production that captures your brand story and engages your target audience.",
      icon: "Video",
      items: [
        "Commercial Video Production",
        "Photo Production",
        "Testimonials & Documentaries",
        "Event Coverage",
        "Product & Brand Shoots",
        "Scriptwriting & Direction",
        "Post-Production",
      ],
      order: 2,
    },
    {
      id: "branding-design",
      name: "Branding & Graphic Design",
      description:
        "Create a powerful visual identity that reflects your brand values and resonates with your audience.",
      icon: "Palette",
      items: [
        "Logo Design",
        "Visual Identity Systems",
        "Flyers & Brochures",
        "Business Cards",
        "Social Media Graphics",
        "Digital Templates",
        "Company Profiles",
        "Custom Pitch Decks",
      ],
      order: 3,
    },
    {
      id: "consulting",
      name: "Consulting & Creative Direction",
      description:
        "Strategic guidance and creative direction to position your brand for maximum impact in competitive markets.",
      icon: "Lightbulb",
      items: [
        "Brand Positioning",
        "Brand Messaging",
        "Market Engagement Strategy",
        "Visual Consultation",
        "Storytelling Consultation",
        "Social Media Training for In-House Teams",
      ],
      order: 4,
    },
    {
      id: "strategy-planning",
      name: "Strategy Development & Content Planning",
      description:
        "Develop aligned strategies based on your brand objectives, target audience, and digital platform goals.",
      icon: "Target",
      items: [
        "Brand Strategy",
        "Content Planning",
        "Audience Targeting",
        "Campaign Goals",
        "Content Calendar",
        "Platform Strategy",
      ],
      order: 5,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: { ...service, isVisible: true },
    });
  }
  console.log("✅ Services seeded");

  // Seed testimonials
  const testimonials = [
    {
      id: "loza-nutrition",
      clientName: "Loza Nutrition",
      company: "Loza Nutrition",
      quote:
        "We've seen consistent growth and engagement since partnering with Kacha Creative. Their management of our social media and creative direction brought clarity and cohesion to our brand.",
      authorName: "Prof. Muluken Fekadie",
      isPublished: true,
      order: 1,
    },
    {
      id: "melhk-consultancy",
      clientName: "Melhk Consultancy",
      company: "Melhk Consultancy",
      quote:
        "Kacha Creative has been instrumental in our visual branding. From high-quality video production to timely edits, the results speak for themselves.",
      authorName: "Tsegaye Asefa",
      isPublished: true,
      order: 2,
    },
    {
      id: "barkonal-travel",
      clientName: "Barkonal Travel Agent",
      company: "Barkonal Travel Agent",
      quote:
        "Their modern, youth-oriented content style helped us better connect with our target audience. We love the creativity they bring.",
      authorName: "Barkonal Management Team",
      isPublished: true,
      order: 3,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: {},
      create: testimonial,
    });
  }
  console.log("✅ Testimonials seeded");

  // Seed site settings
  const settings = [
    { key: "company_name", value: "Kacha Creatives" },
    { key: "tagline", value: "IGNITE YOUR BRAND. INSPIRE YOUR AUDIENCE." },
    { key: "mission", value: "To craft compelling digital marketing content that drives visibility, builds brand identity, and connects businesses with their audiences across digital platforms." },
    { key: "vision", value: "To become one of Ethiopia's most trusted creative firms by delivering result-driven digital strategies, professional content, and exceptional client service—powered by a flexible, multidisciplinary team." },
    { key: "phone_1", value: "+2519 2076 6374" },
    { key: "phone_2", value: "+2519 1645 1065" },
    { key: "email", value: "biniyamwondem2006@gmail.com" },
    { key: "address", value: "Addis Ababa, Ethiopia" },
    { key: "founded", value: "2023" },
  ];

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("✅ Site settings seeded");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
