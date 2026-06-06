import portfolioData from "./portfolio-data.json";

const config = {
  title: portfolioData.config.title,
  description: {
    long: portfolioData.config.description.en,
    short: portfolioData.config.description.en.slice(0, 160) + "...",
  },
  keywords: [
    "Binh Duong",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "Coding Ducks",
    "The Booking Desk",
    "Ghostchat",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Spline",
    "Framer Motion",
  ],
  author: portfolioData.config.author.en,
  email: portfolioData.config.email,
  site: "https://binhduong-portfolio.netlify.app",
  resumeUrl: portfolioData.config.resumeUrl,

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: { ...portfolioData.config.social },
};

function updateConfig(newConfig: any) {
  if (!newConfig) return;
  if (newConfig.title) config.title = newConfig.title;
  if (newConfig.description) {
    if (newConfig.description.en) {
      config.description.long = newConfig.description.en;
      config.description.short = newConfig.description.en.slice(0, 160) + "...";
    }
  }
  if (newConfig.author && newConfig.author.en) config.author = newConfig.author.en;
  if (newConfig.email) config.email = newConfig.email;
  if (newConfig.resumeUrl) config.resumeUrl = newConfig.resumeUrl;
  if (newConfig.social) {
    Object.assign(config.social, newConfig.social);
  }
}

export { config, updateConfig };
