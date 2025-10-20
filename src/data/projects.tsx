import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  nest: {
    title: "NestJS",
    bg: "black",
    fg: "white",
    icon: <SiNestjs />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "basospark",
    category: "Social network",
    title: "Baso Spark (Social Network)",
    src: "/assets/projects-screenshots/basospark/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.reactQuery,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.nest,
        PROJECT_SKILLS.prisma,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.sockerio,
      ],
    },
    live: "",
    github: "https://github.com/BDuong31/Baso-Spark.git",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Baso Spark - Connect, Share, and Spark Conversations!
          </TypographyP>
          <TypographyP className="font-mono ">
            Baso Spark is a dynamic social networking platform designed to bring
            people together. Whether you&apos;re looking to share your thoughts,
            connect with friends, or discover new interests, Baso Spark has got
            you covered.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Auth </TypographyH3>
          <p className="font-mono mb-2">
            Securely sign up and log in using email or social media accounts.
            Your data is protected with industry-standard encryption.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/basospark/Register.png`,
              `${BASE_PATH}/basospark/Login.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Home </TypographyH3>
          <p className="font-mono mb-2">
            Stay updated with a personalized feed of posts from your friends
            and communities you follow.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/basospark/Home.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Notifications </TypographyH3>

          <p className="font-mono mb-2">
            Stay informed with real-time notifications for likes, comments, and
            new followers.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/basospark/Notification.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Messages </TypographyH3>
          <p className="font-mono mb-2">
            Connect with friends through instant messaging and group chats.
          </p>
          <SlideShow images={[`${BASE_PATH}/basospark/Message.png`]} />
          <TypographyH3 className="my-4 mt-8">Bookmarks </TypographyH3>
          <p className="font-mono mb-2">
            Save your favorite posts and access them anytime from your
            bookmarks.
          </p>
          <SlideShow images={[`${BASE_PATH}/basospark/Bookmark.png`]} />
          <TypographyH3 className="my-4 mt-8">Explore </TypographyH3>

          <p className="font-mono mb-2">
            Discover new content, trending topics, and communities tailored to
            your interests.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/basospark/Explore.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Profile </TypographyH3>
          <p className="font-mono mb-2">
            Customize your profile, share your story, and showcase your posts
            and achievements.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/basospark/Profile.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Follow </TypographyH3>
          <p className="font-mono mb-2">
            Connect with friends and influencers by following their profiles to
            see their latest updates.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/basospark/Followers.png`,
              `${BASE_PATH}/basospark/Following.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Settings </TypographyH3>
          <p className="font-mono mb-2">
            Manage your account settings, privacy preferences, and notification
            preferences.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/basospark/Setting.png`,
            ]}
          />
        </div>
      );
    },
  },
];
export default projects;
