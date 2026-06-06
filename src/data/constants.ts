// thoda zada ts ho gya idhar
export enum SkillNames {
  PY = "py",
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  NESTJS = "nestjs",
  DJANGO = "django",
  FLASK = "flask",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  REDIS = "redis",
  PRISMA = "prisma",
  GIT = "git",
  GITHUB = "github",
  NPM = "npm",
  LINUX = "linux",
  DOCKER = "docker",
  NGINX = "nginx",
  VERCEL = "vercel",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};
import portfolioData from "./portfolio-data.json";

export const SKILLS = {} as Record<SkillNames, Skill>;

export function updateSkills(newSkills: any[]) {
  if (!newSkills || !Array.isArray(newSkills)) return;
  // Clear the existing keys in SKILLS object
  Object.keys(SKILLS).forEach((key) => {
    delete SKILLS[key as SkillNames];
  });
  // Repopulate
  newSkills.forEach((skill: any, index: number) => {
    SKILLS[skill.name as SkillNames] = {
      id: index + 1,
      name: skill.name,
      label: skill.label,
      shortDescription: "", // loaded reactively from translation dictionary
      color: skill.color,
      icon: skill.icon,
    };
  });
}

// Initial population
updateSkills(portfolioData.skills);

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};

