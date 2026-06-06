"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { updateConfig } from "@/data/config";
import { updateSkills } from "@/data/constants";
import { updateProjects } from "@/data/projects";
import { updateBlogs } from "@/data/blogs";
import { translations } from "@/data/translations";

interface PortfolioContextType {
  data: any;
  loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const json = await res.json();
          setData(json);
          
          // Apply dynamic updates to static references
          if (json.config) {
            updateConfig(json.config);
            
            // Update translation author
            if (json.config.author) {
              translations.en.author = json.config.author.en;
              translations.vi.author = json.config.author.vi;
            }
            
            // Update translation bio
            if (json.config.description) {
              const descEn = json.config.description.en;
              const descVi = json.config.description.vi;
              
              if (descEn) {
                const paragraphsEn = descEn.split(/\n\s*\n/);
                translations.en.about.desc1 = paragraphsEn[0] || "";
                translations.en.about.desc2 = paragraphsEn.slice(1).join("\n\n") || "";
              }
              
              if (descVi) {
                const paragraphsVi = descVi.split(/\n\s*\n/);
                translations.vi.about.desc1 = paragraphsVi[0] || "";
                translations.vi.about.desc2 = paragraphsVi.slice(1).join("\n\n") || "";
              }
            }

            // Explicit about sections config overrides
            if (json.config.about) {
              const ab = json.config.about;
              if (ab.role?.en) translations.en.about.role = ab.role.en;
              if (ab.role?.vi) translations.vi.about.role = ab.role.vi;
              if (ab.title?.en) translations.en.about.title = ab.title.en;
              if (ab.title?.vi) translations.vi.about.title = ab.title.vi;
              if (ab.desc1?.en) translations.en.about.desc1 = ab.desc1.en;
              if (ab.desc1?.vi) translations.vi.about.desc1 = ab.desc1.vi;
              if (ab.desc2?.en) translations.en.about.desc2 = ab.desc2.en;
              if (ab.desc2?.vi) translations.vi.about.desc2 = ab.desc2.vi;
            }
          }
          
          if (json.skills) {
            updateSkills(json.skills);
          }
          
          if (json.projects) {
            updateProjects(json.projects);
          }

          if (json.blogs) {
            updateBlogs(json.blogs);
          }
        }
      } catch (error) {
        console.error("Failed to load portfolio data from Supabase/API:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
