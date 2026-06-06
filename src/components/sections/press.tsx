"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, Newspaper } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import { usePortfolio } from "@/contexts/portfolio";
import { cn } from "@/lib/utils";
import { BoxReveal } from "../reveal-animations";

const PressSection = () => {
  const { language } = useLanguage();
  const { data, loading } = usePortfolio();

  if (loading) return null;

  const pressList = data?.press || [];

  // If there are no press items, don't render this section
  if (pressList.length === 0) return null;

  return (
    <section id="press" className="max-w-7xl mx-auto md:h-[130vh]">
      <Link href="#press">
        <h2 className={cn(
          "bg-clip-text text-4xl text-center text-transparent md:text-7xl pt-16",
          "bg-gradient-to-b from-black/80 to-black/50",
          "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50 mb-16"
        )}>
          {language === "vi" ? "Báo chí & Truyền thông" : "Featured Press & Media"}
        </h2>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {pressList.map((item: any, idx: number) => (
          <motion.a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative w-full max-w-[400px] rounded-lg overflow-hidden group/press-card shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            style={{ aspectRatio: "3/2" }}
          >
            {/* Card Cover Image */}
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute w-full h-full top-0 left-0 object-cover group-hover/press-card:scale-[1.05] transition-all duration-500 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/projects-screenshots/placeholder.png";
                }}
              />
            ) : (
              <div className="absolute w-full h-full top-0 left-0 bg-slate-900 flex items-center justify-center">
                <Newspaper size={40} className="text-zinc-600" />
              </div>
            )}

            {/* Bottom Gradient Overlay (like projects) */}
            <div className="absolute w-full h-2/3 bottom-0 left-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none" />

            {/* Bottom-left Content */}
            <div className="relative h-full flex flex-col justify-end p-6 text-white z-10 pointer-events-none">
              {item.date && (
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 mb-1 font-mono">
                  <Calendar size={10} />
                  <span>{item.date}</span>
                </div>
              )}
              <h3 className="text-sm md:text-base font-bold text-left line-clamp-2 leading-snug text-white mb-2 drop-shadow">
                {item.title}
              </h3>
              {item.publisher && (
                <span className="text-xs bg-white text-black font-semibold rounded-lg w-fit px-2 shadow-md uppercase tracking-wider">
                  {item.publisher}
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default PressSection;
