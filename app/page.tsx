import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Services from "@/components/services/Services";
import Process from "@/components/process/Process";
import Sectors from "@/components/sectors/Sectors";
import Portfolio from "@/components/portfolio/Portfolio";
import Team from "@/components/team/Team";
import WhyChooseUs from "@/components/why/WhyChooseUs";
import Testimonials from "@/components/testimonials/Testimonials";
import ClientFeedback from "@/components/comments/ClientFeedback";
import Contact from "@/components/contact/Contact";
import FinalCTA from "@/components/cta/FinalCTA";
import Footer from "@/components/footer/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // Revalidate every 60s

async function getData() {
  try {
    const [services, projects, team, testimonials, comments] =
      await Promise.all([
        prisma.service.findMany({
          where: { isVisible: true },
          orderBy: { order: "asc" },
        }),
        prisma.portfolioProject.findMany({
          where: { status: "PUBLISHED" },
          include: {
            media: { orderBy: { order: "asc" } },
          },
          orderBy: [{ isFeatured: "desc" }, { order: "asc" }],
        }),
        prisma.teamMember.findMany({
          where: { isVisible: true },
          orderBy: { order: "asc" },
        }),
        prisma.testimonial.findMany({
          where: { isPublished: true },
          orderBy: { order: "asc" },
        }),
        prisma.comment.findMany({
          where: { status: "APPROVED" },
          orderBy: { createdAt: "desc" },
          take: 10,
        }),
      ]);

    return { services, projects, team, testimonials, comments };
  } catch (error) {
    console.error("Data fetch error:", error);
    return {
      services: [],
      projects: [],
      team: [],
      testimonials: [],
      comments: [],
    };
  }
}

export default async function HomePage() {
  const { services, projects, team, testimonials, comments } = await getData();

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services services={services} />
      <Process />
      <Sectors />
      <Portfolio projects={projects} />
      <Team members={team} />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <ClientFeedback approvedComments={comments} />
      <Contact />
      <FinalCTA />
      <Footer />
    </main>
  );
}
