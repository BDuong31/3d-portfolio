const config = {
  title: "Vu Thai Binh Duong | Full-Stack Developer",
  description: {
    long: "Explore the portfolio of Vu Thai Binh Duong, a full-stack developer and creative technologist specializing in interactive web experiences, 3D animations, and innovative projects. Discover my latest work, including Coding Ducks, The Booking Desk, Ghostchat, and more. Let's build something amazing together!",
    short:
      "Discover the portfolio of Vu Thai Binh Duong, a full-stack developer creating interactive web experiences and innovative projects.",
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
  author: "Vu Thai Binh Duong",
  email: "binhduong31725@gmail.com",
  site: "https://binhduong-portfolio.netlify.app",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/BnhDngVThi1",
    linkedin: "https://www.linkedin.com/in/bduonng/",
    instagram: "https://www.instagram.com/bduuong/",
    facebook: "https://www.facebook.com/BDuonng/",
    github: "https://github.com/BDuong31",
  },
};
export { config };
