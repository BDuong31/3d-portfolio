import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language";
import { usePortfolio } from "@/contexts/portfolio";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaEnvelope } from "react-icons/fa6";
import { config } from "@/data/config";
import { BoxReveal } from "../reveal-animations";

const AboutSection = () => {
  const { t, language } = useLanguage();
  const { data } = usePortfolio();

  const avatarUrl = data?.config?.about?.avatar || "/assets/me.jpg";
  const role = data?.config?.about?.role?.[language] || t("about.role");
  const title = data?.config?.about?.title?.[language] || t("about.title");
  const desc1 = data?.config?.about?.desc1?.[language] || t("about.desc1");
  const desc2 = data?.config?.about?.desc2?.[language] || t("about.desc2");
  const isAvailable = data?.config?.about?.available !== false;

  return (
    <section id="about" className="relative w-full min-h-screen md:min-h-[120dvh] flex flex-col justify-center py-20">
      <div className="top-[70px] sticky mb-96">
        <Link href={"#about"}>
          <h2
            className={cn(
              "bg-clip-text text-4xl text-center text-transparent md:text-7xl",
              "bg-gradient-to-b from-black/80 to-black/50",
              "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50 "
            )}
          >
            {title}
          </h2>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 z-[2] mt-10 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full bg-white/80 dark:bg-zinc-950/75 backdrop-blur-xl border border-slate-200/50 dark:border-zinc-800/50 p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-100/40 dark:shadow-black/30"
          >
            {/* Profile Intro (Avatar, Name, Role, Availability) */}
            <div className="flex flex-row items-center justify-center gap-5 mb-8 pb-6 border-b border-slate-200/50 dark:border-zinc-800/50 w-full text-center">
              {/* Avatar with glow ring */}
              <div className="relative group/avatar flex-shrink-0">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-30 group-hover/avatar:opacity-65 transition duration-500" />
                <div className="relative w-16 h-16 md:w-22 md:h-22 rounded-full overflow-hidden border border-white/20 dark:border-zinc-800 bg-zinc-800 shadow-sm">
                  <img
                    src={avatarUrl}
                    alt={t("author")}
                    className="w-full h-full object-cover group-hover/avatar:scale-105 transition duration-500"
                  />
                </div>
              </div>

              {/* Name & Role details */}
              <div className="flex flex-col items-center">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-tight">
                  {t("author")}
                </h3>
                <p className="text-xs md:text-sm text-violet-600 dark:text-violet-400 font-semibold mt-1">
                  {role}
                </p>
                {/* Active status */}
                {isAvailable ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-2 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {language === "vi" ? "Sẵn sàng làm việc" : "Available for hire"}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs text-amber-600 dark:text-amber-400 font-medium mt-2 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {language === "vi" ? "Đang bận" : "Currently busy"}
                  </span>
                )}
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-4 text-slate-650 dark:text-zinc-300 leading-relaxed font-light text-sm md:text-base text-center">
              <p className="whitespace-pre-line">
                {desc1}
              </p>
              {desc2 && (
                <p className="whitespace-pre-line">
                  {desc2}
                </p>
              )}
            </div>

            {/* Contact Pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-zinc-900/50 hover:bg-violet-600 dark:hover:bg-violet-500 hover:text-white dark:hover:text-black border border-slate-200 dark:border-zinc-800/80 hover:border-violet-600 dark:hover:border-violet-500 shadow-sm transition-all duration-300 backdrop-blur-sm"
              >
                <FaEnvelope size={12} className="text-zinc-500 dark:text-zinc-400" />
                <span>Email</span>
              </a>
              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-zinc-900/50 hover:bg-violet-600 dark:hover:bg-violet-500 hover:text-white dark:hover:text-black border border-slate-200 dark:border-zinc-800/80 hover:border-violet-600 dark:hover:border-violet-500 shadow-sm transition-all duration-300 backdrop-blur-sm"
              >
                <SiLinkedin size={12} className="text-zinc-500 dark:text-zinc-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-zinc-900/50 hover:bg-violet-600 dark:hover:bg-violet-500 hover:text-white dark:hover:text-black border border-slate-200 dark:border-zinc-800/80 hover:border-violet-600 dark:hover:border-violet-500 shadow-sm transition-all duration-300 backdrop-blur-sm"
              >
                <SiGithub size={12} className="text-zinc-500 dark:text-zinc-400" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
