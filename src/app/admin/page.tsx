"use client";

import React, { useState, useEffect } from "react";
import { 
  Lock, LogIn, Save, Plus, Trash2, 
  Settings, Code, FolderGit2, Link2, 
  Info, ExternalLink, RefreshCw, ArrowLeft,
  ChevronRight, Eye, FileText, Newspaper
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

type Tab = "config" | "social" | "skills" | "projects" | "blogs" | "press";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("config");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>(null);

  // For Skills editor
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null);
  const [newSkill, setNewSkill] = useState({ name: "", label: "", color: "#38bdf8", icon: "" });

  // For Projects editor
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [newProject, setNewProject] = useState({
    id: "",
    title: "",
    category: "",
    src: "",
    screenshots: [] as string[],
    live: "",
    github: "",
    skills: { frontend: [] as string[], backend: [] as string[] },
    blocks: [] as any[]
  });

  // For Blogs editor
  const [activeBlogIndex, setActiveBlogIndex] = useState<number | null>(null);
  const [newBlog, setNewBlog] = useState({
    slug: "",
    title: { en: "", vi: "" },
    excerpt: { en: "", vi: "" },
    date: "",
    readTime: { en: "", vi: "" },
    coverImage: "",
    tags: [] as string[],
    content: { en: [] as any[], vi: [] as any[] }
  });

  // For Press editor
  const [activePressIndex, setActivePressIndex] = useState<number | null>(null);
  const [newPressItem, setNewPressItem] = useState({
    title: "",
    publisher: "",
    url: "",
    imageUrl: "",
    date: ""
  });
  const [fetchingMetadata, setFetchingMetadata] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const savedPassword = sessionStorage.getItem("admin_password");
    if (savedPassword) {
      setPassword(savedPassword);
      fetchData(savedPassword);
    }
  }, []);

  const fetchData = async (pwd = password) => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const json = await res.json();
        setData(json);
        if (pwd) {
          // Verify password works
          const checkRes = await fetch("/api/portfolio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: pwd, data: json })
          });
          if (checkRes.ok) {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_password", pwd);
          }
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load portfolio data.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      const json = await res.json();
      
      const checkRes = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data: json })
      });

      if (checkRes.ok) {
        setIsAuthenticated(true);
        setData(json);
        sessionStorage.setItem("admin_password", password);
        toast({
          title: "Success",
          description: "Authenticated successfully!",
        });
      } else {
        toast({
          title: "Access Denied",
          description: "Incorrect password. Please try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Authentication failed. Server error.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data })
      });
      if (res.ok) {
        toast({
          title: "Saved Successfully",
          description: "Portfolio changes have been written to files.",
        });
      } else {
        const errJson = await res.json();
        toast({
          title: "Error Saving",
          description: errJson.error || "Save failed.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error Saving",
        description: "Network or server error occurred.",
        variant: "destructive"
      });
    }
    setSaving(false);
  };

  const updateConfig = (key: string, value: any, lang?: "en" | "vi") => {
    if (!data) return;
    const newData = { ...data };
    if (lang) {
      newData.config[key] = {
        ...newData.config[key],
        [lang]: value
      };
    } else {
      newData.config[key] = value;
    }
    setData(newData);
  };

  const updateAboutConfig = (key: string, value: any, lang?: "en" | "vi") => {
    if (!data) return;
    const newData = { ...data };
    if (!newData.config.about) {
      newData.config.about = {
        avatar: "/assets/me.jpg",
        role: { en: "", vi: "" },
        title: { en: "", vi: "" },
        desc1: { en: "", vi: "" },
        desc2: { en: "", vi: "" }
      };
    }
    if (lang) {
      newData.config.about[key] = {
        ...newData.config.about[key],
        [lang]: value
      };
    } else {
      newData.config.about[key] = value;
    }
    setData(newData);
  };

  const updateSocial = (key: string, value: string) => {
    if (!data) return;
    const newData = { ...data };
    newData.config.social[key] = value;
    setData(newData);
  };

  // Skill Methods
  const addSkill = () => {
    if (!newSkill.name || !newSkill.label) {
      toast({ description: "Please fill in Name and Label", variant: "destructive" });
      return;
    }
    const newData = { ...data };
    newData.skills.push({ ...newSkill });
    setData(newData);
    setNewSkill({ name: "", label: "", color: "#38bdf8", icon: "" });
    toast({ description: "Skill added!" });
  };

  const removeSkill = (index: number) => {
    const newData = { ...data };
    newData.skills.splice(index, 1);
    setData(newData);
    toast({ description: "Skill removed." });
  };

  // Project Methods
  const selectProject = (index: number) => {
    setActiveProjectIndex(index);
    setNewProject({ ...data.projects[index] });
  };

  const saveProjectChanges = () => {
    if (activeProjectIndex === null || !data) return;
    const newData = { ...data };
    newData.projects[activeProjectIndex] = { ...newProject };
    setData(newData);
    toast({ description: "Project changes updated locally. Don't forget to Save Changes to disk!" });
  };

  const deleteProject = (index: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const newData = { ...data };
      newData.projects.splice(index, 1);
      setData(newData);
      setActiveProjectIndex(null);
      toast({ description: "Project deleted." });
    }
  };

  const createNewProject = () => {
    const defaultProject = {
      id: "new-project-" + Date.now().toString().slice(-4),
      title: "New Project",
      category: "Web Development",
      src: "/assets/projects-screenshots/placeholder.png",
      screenshots: ["landing.png"],
      live: "",
      github: "",
      skills: { frontend: [] as string[], backend: [] as string[] },
      blocks: [
        { type: "paragraph", en: "Write your description here...", vi: "Viết mô tả ở đây..." }
      ]
    };
    const newData = { ...data };
    newData.projects.push(defaultProject);
    setData(newData);
    setActiveProjectIndex(newData.projects.length - 1);
    setNewProject(defaultProject);
    toast({ description: "New project draft added!" });
  };

  const addProjectBlock = (type: "paragraph" | "heading" | "slideshow" | "links") => {
    let block: any = { type };
    if (type === "paragraph" || type === "heading") {
      block.en = "New text";
      block.vi = "Văn bản mới";
    } else if (type === "slideshow") {
      block.images = ["/assets/projects-screenshots/placeholder.png"];
    }
    const updatedBlocks = [...newProject.blocks, block];
    setNewProject({ ...newProject, blocks: updatedBlocks });
  };

  const updateProjectBlock = (index: number, key: string, value: any) => {
    const updatedBlocks = [...newProject.blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      [key]: value
    };
    setNewProject({ ...newProject, blocks: updatedBlocks });
  };

  const removeProjectBlock = (index: number) => {
    const updatedBlocks = [...newProject.blocks];
    updatedBlocks.splice(index, 1);
    setNewProject({ ...newProject, blocks: updatedBlocks });
  };

  // Blog Methods
  const selectBlog = (index: number) => {
    setActiveBlogIndex(index);
    setNewBlog({ 
      slug: data.blogs[index].slug || "",
      title: { en: data.blogs[index].title?.en || "", vi: data.blogs[index].title?.vi || "" },
      excerpt: { en: data.blogs[index].excerpt?.en || "", vi: data.blogs[index].excerpt?.vi || "" },
      date: data.blogs[index].date || "",
      readTime: { en: data.blogs[index].readTime?.en || "", vi: data.blogs[index].readTime?.vi || "" },
      coverImage: data.blogs[index].coverImage || "",
      tags: data.blogs[index].tags || [],
      content: {
        en: data.blogs[index].content?.en || [],
        vi: data.blogs[index].content?.vi || []
      }
    });
  };

  const saveBlogChanges = () => {
    if (activeBlogIndex === null || !data) return;
    const newData = { ...data };
    if (!newData.blogs) newData.blogs = [];
    newData.blogs[activeBlogIndex] = { ...newBlog };
    setData(newData);
    toast({ description: "Blog changes updated locally. Don't forget to Save Changes to disk!" });
  };

  const deleteBlog = (index: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const newData = { ...data };
      newData.blogs.splice(index, 1);
      setData(newData);
      setActiveBlogIndex(null);
      toast({ description: "Blog post deleted." });
    }
  };

  const createNewBlog = () => {
    const defaultBlog = {
      slug: "new-blog-" + Date.now().toString().slice(-4),
      title: { en: "New Blog Post", vi: "Bài viết mới" },
      excerpt: { en: "Write a short summary here...", vi: "Viết tóm tắt ngắn ở đây..." },
      date: new Date().toISOString().split("T")[0],
      readTime: { en: "5 min read", vi: "5 phút đọc" },
      coverImage: "bg-gradient-to-br from-indigo-600 to-purple-900",
      tags: ["Tech"],
      content: {
        en: [{ type: "paragraph" as const, text: "Write the article content in English here..." }],
        vi: [{ type: "paragraph" as const, text: "Viết nội dung bài viết bằng tiếng Việt ở đây..." }]
      }
    };
    const newData = { ...data };
    if (!newData.blogs) newData.blogs = [];
    newData.blogs.push(defaultBlog);
    setData(newData);
    setActiveBlogIndex(newData.blogs.length - 1);
    setNewBlog(defaultBlog);
    toast({ description: "New blog post draft created!" });
  };

  const addBlogBlock = (lang: "en" | "vi", type: "paragraph" | "heading" | "code" | "list") => {
    let block: any = { type };
    if (type === "paragraph" || type === "heading") {
      block.text = "New text";
    } else if (type === "code") {
      block.code = "// write code here";
      block.language = "javascript";
    } else if (type === "list") {
      block.items = ["New item"];
    }
    const updatedContent = {
      ...newBlog.content,
      [lang]: [...(newBlog.content[lang] || []), block]
    };
    setNewBlog({ ...newBlog, content: updatedContent });
  };

  const updateBlogBlock = (lang: "en" | "vi", index: number, key: string, value: any) => {
    const updatedContentLang = [...(newBlog.content[lang] || [])];
    updatedContentLang[index] = {
      ...updatedContentLang[index],
      [key]: value
    };
    setNewBlog({
      ...newBlog,
      content: {
        ...newBlog.content,
        [lang]: updatedContentLang
      }
    });
  };

  const removeBlogBlock = (lang: "en" | "vi", index: number) => {
    const updatedContentLang = [...(newBlog.content[lang] || [])];
    updatedContentLang.splice(index, 1);
    setNewBlog({
      ...newBlog,
      content: {
        ...newBlog.content,
        [lang]: updatedContentLang
      }
    });
  };

  // Press Methods
  const selectPress = (index: number) => {
    setActivePressIndex(index);
    setNewPressItem({
      title: data.press[index].title || "",
      publisher: data.press[index].publisher || "",
      url: data.press[index].url || "",
      imageUrl: data.press[index].imageUrl || "",
      date: data.press[index].date || ""
    });
  };

  const savePressChanges = () => {
    if (activePressIndex === null || !data) return;
    const newData = { ...data };
    if (!newData.press) newData.press = [];
    newData.press[activePressIndex] = { ...newPressItem };
    setData(newData);
    toast({ description: "Press changes updated locally. Don't forget to Save Changes to disk!" });
  };

  const deletePress = (index: number) => {
    if (confirm("Are you sure you want to delete this press mention?")) {
      const newData = { ...data };
      newData.press.splice(index, 1);
      setData(newData);
      setActivePressIndex(null);
      toast({ description: "Press mention deleted." });
    }
  };

  const createNewPress = () => {
    const defaultPress = {
      title: "New Article Title",
      publisher: "Publisher Name",
      url: "",
      imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800",
      date: new Date().toISOString().split("T")[0]
    };
    const newData = { ...data };
    if (!newData.press) newData.press = [];
    newData.press.push(defaultPress);
    setData(newData);
    setActivePressIndex(newData.press.length - 1);
    setNewPressItem(defaultPress);
    toast({ description: "New press mention draft created!" });
  };

  const autofillPressMetadata = async () => {
    if (!newPressItem.url) {
      toast({ description: "Please enter a URL first", variant: "destructive" });
      return;
    }
    setFetchingMetadata(true);
    try {
      const res = await fetch(`/api/metadata?url=${encodeURIComponent(newPressItem.url)}`);
      if (res.ok) {
        const metadata = await res.json();
        setNewPressItem({
          ...newPressItem,
          title: metadata.title || newPressItem.title,
          publisher: metadata.publisher || newPressItem.publisher,
          imageUrl: metadata.imageUrl || newPressItem.imageUrl
        });
        toast({ description: "Metadata fetched successfully!" });
      } else {
        toast({ description: "Failed to fetch metadata. Please enter details manually.", variant: "destructive" });
      }
    } catch (e) {
      toast({ description: "Failed to fetch metadata. Please enter details manually.", variant: "destructive" });
    }
    setFetchingMetadata(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-6 text-white font-sans selection:bg-indigo-500 selection:text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />
        
        <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
              <Lock className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Portfolio Admin Panel
            </h1>
            <p className="text-xs text-zinc-500 mt-2">
              Enter your administration password to edit details
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800/60 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3 font-semibold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Authenticate</span>
                </>
              )}
            </Button>
          </form>
        </div>

        <Link href="/" className="mt-8 text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-2 relative z-10">
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans pb-24 relative selection:bg-indigo-500 selection:text-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.08),rgba(255,255,255,0))] pointer-events-none" />

      {/* Admin Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
              AD
            </div>
            <div>
              <h1 className="font-bold text-sm text-white">Console Admin</h1>
              <p className="text-[10px] text-zinc-500">Live Config Mode</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button variant="ghost" size="sm" className="text-xs gap-2 hover:bg-zinc-900 text-zinc-400 hover:text-white">
                <Eye className="w-4 h-4" />
                <span>Preview Site</span>
                <ExternalLink className="w-3 h-3" />
              </Button>
            </Link>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 rounded-lg flex items-center gap-2 shadow-lg shadow-indigo-600/10"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Changes</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab("config")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "config"
                ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-400"
                : "hover:bg-zinc-900 border border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Info className="w-5 h-5" />
            <span>General Config</span>
          </button>

          <button
            onClick={() => setActiveTab("social")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "social"
                ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-400"
                : "hover:bg-zinc-900 border border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Link2 className="w-5 h-5" />
            <span>Social Profiles</span>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "skills"
                ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-400"
                : "hover:bg-zinc-900 border border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Code className="w-5 h-5" />
            <span>Skills List</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "projects"
                ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-400"
                : "hover:bg-zinc-900 border border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FolderGit2 className="w-5 h-5" />
            <span>Projects Editor</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "blogs"
                ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-400"
                : "hover:bg-zinc-900 border border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Blogs Editor</span>
          </button>

          <button
            onClick={() => setActiveTab("press")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "press"
                ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-400"
                : "hover:bg-zinc-900 border border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Newspaper className="w-5 h-5" />
            <span>Press Mentions</span>
          </button>
        </aside>

        {/* Content Pane */}
        <section className="lg:col-span-3">
          {loading ? (
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-3xl p-12 flex flex-col justify-center items-center gap-4 text-zinc-500">
              <RefreshCw className="w-8 h-8 animate-spin text-indigo-500" />
              <p className="text-xs font-mono">Synchronizing state...</p>
            </div>
          ) : !data ? (
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-3xl p-12 text-center text-zinc-500">
              <p className="text-sm">Failed to connect to Local DB. Please run `yarn dev` on local computer.</p>
            </div>
          ) : (
            <div className="bg-zinc-900/20 border border-zinc-800/40 p-8 rounded-3xl backdrop-blur-md">
              {/* CONFIG TAB */}
              {activeTab === "config" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">General Configurations</h2>
                    <p className="text-xs text-zinc-500">Metadata, identity details, and CV links.</p>
                  </div>
                  
                  <hr className="border-zinc-900" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400">Author Name (English)</label>
                      <input
                        type="text"
                        value={data.config.author.en}
                        onChange={(e) => updateConfig("author", e.target.value, "en")}
                        className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400">Author Name (Vietnamese)</label>
                      <input
                        type="text"
                        value={data.config.author.vi}
                        onChange={(e) => updateConfig("author", e.target.value, "vi")}
                        className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400">Email Address</label>
                      <input
                        type="email"
                        value={data.config.email}
                        onChange={(e) => updateConfig("email", e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400">Title SEO</label>
                      <input
                        type="text"
                        value={data.config.title}
                        onChange={(e) => updateConfig("title", e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400">Resume Link (CV File URL)</label>
                    <input
                      type="text"
                      value={data.config.resumeUrl}
                      onChange={(e) => updateConfig("resumeUrl", e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400">Long Description (English)</label>
                    <textarea
                      rows={4}
                      value={data.config.description.en}
                      onChange={(e) => updateConfig("description", e.target.value, "en")}
                      className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400">Long Description (Vietnamese)</label>
                    <textarea
                      rows={4}
                      value={data.config.description.vi}
                      onChange={(e) => updateConfig("description", e.target.value, "vi")}
                      className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Explicit About details configuration */}
                  <div className="pt-6 border-t border-zinc-900 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">About Me Section Details</h3>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400">Profile Avatar Image URL</label>
                      <input
                        type="text"
                        value={data.config.about?.avatar || ""}
                        onChange={(e) => updateAboutConfig("avatar", e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none font-mono"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800/80 rounded-xl">
                      <div>
                        <label className="text-sm font-semibold text-zinc-200 block">Trạng thái sẵn sàng làm việc (Availability Status)</label>
                        <span className="text-xs text-zinc-500">Bật để hiển thị &quot;Sẵn sàng làm việc&quot; (Available for hire), tắt để hiển thị &quot;Đang bận&quot; (Currently busy).</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={data.config.about?.available !== false}
                          onChange={(e) => updateAboutConfig("available", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-650 after:border-zinc-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400">About Title (English)</label>
                        <input
                          type="text"
                          value={data.config.about?.title?.en || ""}
                          onChange={(e) => updateAboutConfig("title", e.target.value, "en")}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400">About Title (Vietnamese)</label>
                        <input
                          type="text"
                          value={data.config.about?.title?.vi || ""}
                          onChange={(e) => updateAboutConfig("title", e.target.value, "vi")}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400">Role Title (English)</label>
                        <input
                          type="text"
                          value={data.config.about?.role?.en || ""}
                          onChange={(e) => updateAboutConfig("role", e.target.value, "en")}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400">Role Title (Vietnamese)</label>
                        <input
                          type="text"
                          value={data.config.about?.role?.vi || ""}
                          onChange={(e) => updateAboutConfig("role", e.target.value, "vi")}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400">Paragraph 1 Description (English)</label>
                      <textarea
                        rows={3}
                        value={data.config.about?.desc1?.en || ""}
                        onChange={(e) => updateAboutConfig("desc1", e.target.value, "en")}
                        className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400">Paragraph 1 Description (Vietnamese)</label>
                      <textarea
                        rows={3}
                        value={data.config.about?.desc1?.vi || ""}
                        onChange={(e) => updateAboutConfig("desc1", e.target.value, "vi")}
                        className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400">Paragraph 2 Description (English)</label>
                      <textarea
                        rows={3}
                        value={data.config.about?.desc2?.en || ""}
                        onChange={(e) => updateAboutConfig("desc2", e.target.value, "en")}
                        className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400">Paragraph 2 Description (Vietnamese)</label>
                      <textarea
                        rows={3}
                        value={data.config.about?.desc2?.vi || ""}
                        onChange={(e) => updateAboutConfig("desc2", e.target.value, "vi")}
                        className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SOCIAL TAB */}
              {activeTab === "social" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">Social Networks</h2>
                    <p className="text-xs text-zinc-500">Provide direct profile links.</p>
                  </div>

                  <hr className="border-zinc-900" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.keys(data.config.social).map((key) => (
                      <div key={key} className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 capitalize">{key}</label>
                        <input
                          type="text"
                          value={data.config.social[key]}
                          onChange={(e) => updateSocial(key, e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === "skills" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">Skills Configuration</h2>
                    <p className="text-xs text-zinc-500">Add, update, or remove interactive keyboard skills.</p>
                  </div>

                  <hr className="border-zinc-900" />

                  {/* Add skill form */}
                  <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-4">
                    <h3 className="text-sm font-semibold text-white">Create New Skill</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Code name (e.g. `py` or `nextjs` key)</label>
                        <input
                          type="text"
                          placeholder="nextjs"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Display label</label>
                        <input
                          type="text"
                          placeholder="Next.js"
                          value={newSkill.label}
                          onChange={(e) => setNewSkill({ ...newSkill, label: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Brand Color (Hex)</label>
                        <input
                          type="text"
                          placeholder="#ffffff"
                          value={newSkill.color}
                          onChange={(e) => setNewSkill({ ...newSkill, color: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Icon URL (SVG link)</label>
                        <input
                          type="text"
                          placeholder="https://devicons..."
                          value={newSkill.icon}
                          onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white text-ellipsis font-mono"
                        />
                      </div>
                    </div>
                    <Button onClick={addSkill} size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Skill</span>
                    </Button>
                  </div>

                  {/* Skills lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.skills.map((skill: any, idx: number) => (
                      <div key={skill.name + idx} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-xl">
                        <div className="flex items-center gap-3">
                          {skill.icon && (
                            <img src={skill.icon} alt="" className="w-8 h-8 object-contain" />
                          )}
                          <div>
                            <p className="text-sm font-semibold text-white">{skill.label}</p>
                            <p className="text-[10px] text-zinc-500 font-mono">Code: {skill.name} | Color: {skill.color}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSkill(idx)}
                          className="text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PROJECTS TAB */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-white mb-1">Projects Management</h2>
                      <p className="text-xs text-zinc-500">Edit, structure details, or delete dynamic projects.</p>
                    </div>
                    <Button onClick={createNewProject} size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>New Project</span>
                    </Button>
                  </div>

                  <hr className="border-zinc-900" />

                  {/* Projects List Selection */}
                  <div className="flex flex-wrap gap-2">
                    {data.projects.map((proj: any, idx: number) => (
                      <button
                        key={proj.id}
                        onClick={() => selectProject(idx)}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                          activeProjectIndex === idx
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10"
                            : "bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-800"
                        }`}
                      >
                        {proj.title}
                      </button>
                    ))}
                  </div>

                  {activeProjectIndex !== null && (
                    <div className="border-t border-zinc-900 pt-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white">Editing: {newProject.title}</h3>
                        <Button
                          onClick={() => deleteProject(activeProjectIndex)}
                          variant="ghost"
                          size="sm"
                          className="text-xs text-red-500 hover:bg-red-500/10 hover:text-red-400 font-semibold gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Project</span>
                        </Button>
                      </div>

                      {/* General fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Project ID (unique URL key)</label>
                          <input
                            type="text"
                            value={newProject.id}
                            onChange={(e) => setNewProject({ ...newProject, id: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Project Title</label>
                          <input
                            type="text"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Category</label>
                          <input
                            type="text"
                            value={newProject.category}
                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Preview Thumbnail Image URL</label>
                          <input
                            type="text"
                            value={newProject.src}
                            onChange={(e) => setNewProject({ ...newProject, src: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Live Website URL</label>
                          <input
                            type="text"
                            value={newProject.live}
                            onChange={(e) => setNewProject({ ...newProject, live: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Github Repository URL</label>
                          <input
                            type="text"
                            value={newProject.github}
                            onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      {/* Frontend Skills */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 block">Frontend Skills (comma separated names e.g. ts,next,tailwind)</label>
                        <input
                          type="text"
                          value={newProject.skills.frontend.join(",")}
                          onChange={(e) => setNewProject({
                            ...newProject,
                            skills: {
                              ...newProject.skills,
                              frontend: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                            }
                          })}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                        />
                      </div>

                      {/* Backend Skills */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 block">Backend Skills (comma separated names e.g. node,nest,postgres)</label>
                        <input
                          type="text"
                          value={newProject.skills.backend.join(",")}
                          onChange={(e) => setNewProject({
                            ...newProject,
                            skills: {
                              ...newProject.skills,
                              backend: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                            }
                          })}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                        />
                      </div>

                      {/* Project Blocks Editor */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-white uppercase tracking-wider block">Walkthrough Details Blocks</label>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => addProjectBlock("paragraph")} variant="outline" className="border-zinc-800 text-xs gap-1">
                              <Plus className="w-3 h-3" />
                              <span>Paragraph</span>
                            </Button>
                            <Button size="sm" onClick={() => addProjectBlock("heading")} variant="outline" className="border-zinc-800 text-xs gap-1">
                              <Plus className="w-3 h-3" />
                              <span>Heading</span>
                            </Button>
                            <Button size="sm" onClick={() => addProjectBlock("slideshow")} variant="outline" className="border-zinc-800 text-xs gap-1">
                              <Plus className="w-3 h-3" />
                              <span>Slideshow</span>
                            </Button>
                            <Button size="sm" onClick={() => addProjectBlock("links")} variant="outline" className="border-zinc-800 text-xs gap-1">
                              <Plus className="w-3 h-3" />
                              <span>Links</span>
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {newProject.blocks.map((block, bIdx) => (
                            <div key={bIdx} className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl relative">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                                  Block {bIdx + 1}: {block.type}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeProjectBlock(bIdx)}
                                  className="w-6 h-6 text-zinc-600 hover:text-red-500 rounded-md"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>

                              {(block.type === "paragraph" || block.type === "heading") && (
                                <div className="space-y-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[9px] uppercase font-bold text-zinc-500">English Text</label>
                                      <textarea
                                        rows={block.type === "paragraph" ? 3 : 1}
                                        value={block.en || ""}
                                        onChange={(e) => updateProjectBlock(bIdx, "en", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[9px] uppercase font-bold text-zinc-500">Vietnamese Text</label>
                                      <textarea
                                        rows={block.type === "paragraph" ? 3 : 1}
                                        value={block.vi || ""}
                                        onChange={(e) => updateProjectBlock(bIdx, "vi", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {block.type === "slideshow" && (
                                <div className="space-y-2">
                                  <label className="text-[9px] uppercase font-bold text-zinc-500">Image URLs (comma separated)</label>
                                  <textarea
                                    rows={2}
                                    value={block.images.join(",")}
                                    onChange={(e) => updateProjectBlock(bIdx, "images", e.target.value.split(",").map(i => i.trim()).filter(Boolean))}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white font-mono"
                                  />
                                </div>
                              )}

                              {block.type === "links" && (
                                <p className="text-[10px] text-zinc-500 font-mono">Automatically renders dynamic Git/Live links matching parent project URLs.</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex gap-3 justify-end">
                        <Button
                          onClick={() => {
                            setActiveProjectIndex(null);
                          }}
                          variant="ghost"
                          className="hover:bg-zinc-900 text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={saveProjectChanges}
                          className="bg-zinc-200 hover:bg-white text-zinc-950 text-xs font-semibold px-4 rounded-lg"
                        >
                          Update Project
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* BLOGS TAB */}
              {activeTab === "blogs" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-white mb-1">Blogs Management</h2>
                      <p className="text-xs text-zinc-500">Add, edit, or delete dynamic articles and blog posts.</p>
                    </div>
                    <Button onClick={createNewBlog} size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>New Blog Post</span>
                    </Button>
                  </div>

                  <hr className="border-zinc-900" />

                  {/* Blogs List Selection */}
                  <div className="flex flex-wrap gap-2">
                    {(data.blogs || []).map((blog: any, idx: number) => (
                      <button
                        key={blog.slug || idx}
                        onClick={() => selectBlog(idx)}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                          activeBlogIndex === idx
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10"
                            : "bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-800"
                        }`}
                      >
                        {blog.title?.en || "Untitled"}
                      </button>
                    ))}
                  </div>

                  {activeBlogIndex !== null && (
                    <div className="border-t border-zinc-900 pt-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white">Editing: {newBlog.title.en}</h3>
                        <Button
                          onClick={() => deleteBlog(activeBlogIndex)}
                          variant="ghost"
                          size="sm"
                          className="text-xs text-red-500 hover:bg-red-500/10 hover:text-red-400 font-semibold gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Post</span>
                        </Button>
                      </div>

                      {/* General fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Slug (unique URL path)</label>
                          <input
                            type="text"
                            value={newBlog.slug}
                            onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Published Date</label>
                          <input
                            type="text"
                            placeholder="YYYY-MM-DD"
                            value={newBlog.date}
                            onChange={(e) => setNewBlog({ ...newBlog, date: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Title (English)</label>
                          <input
                            type="text"
                            value={newBlog.title.en}
                            onChange={(e) => setNewBlog({
                              ...newBlog,
                              title: { ...newBlog.title, en: e.target.value }
                            })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Title (Vietnamese)</label>
                          <input
                            type="text"
                            value={newBlog.title.vi}
                            onChange={(e) => setNewBlog({
                              ...newBlog,
                              title: { ...newBlog.title, vi: e.target.value }
                            })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Read Time (English)</label>
                          <input
                            type="text"
                            placeholder="5 min read"
                            value={newBlog.readTime.en}
                            onChange={(e) => setNewBlog({
                              ...newBlog,
                              readTime: { ...newBlog.readTime, en: e.target.value }
                            })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Read Time (Vietnamese)</label>
                          <input
                            type="text"
                            placeholder="5 phút đọc"
                            value={newBlog.readTime.vi}
                            onChange={(e) => setNewBlog({
                              ...newBlog,
                              readTime: { ...newBlog.readTime, vi: e.target.value }
                            })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Cover Gradient Class</label>
                          <input
                            type="text"
                            placeholder="bg-gradient-to-br from-indigo-600 to-purple-900"
                            value={newBlog.coverImage}
                            onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-zinc-400">Tags (comma separated)</label>
                          <input
                            type="text"
                            value={newBlog.tags.join(",")}
                            onChange={(e) => setNewBlog({
                              ...newBlog,
                              tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean)
                            })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400">Excerpt / Description Summary (English)</label>
                        <textarea
                          rows={2}
                          value={newBlog.excerpt.en}
                          onChange={(e) => setNewBlog({
                            ...newBlog,
                            excerpt: { ...newBlog.excerpt, en: e.target.value }
                          })}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400">Excerpt / Description Summary (Vietnamese)</label>
                        <textarea
                          rows={2}
                          value={newBlog.excerpt.vi}
                          onChange={(e) => setNewBlog({
                            ...newBlog,
                            excerpt: { ...newBlog.excerpt, vi: e.target.value }
                          })}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                        />
                      </div>

                      {/* Content Blocks (Localized tabs) */}
                      <div className="space-y-6 font-sans">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider block">Article Body Content</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* ENGLISH BLOCKS */}
                          <div className="space-y-4 bg-zinc-900/10 p-4 border border-zinc-900 rounded-2xl">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-zinc-300">English Blocks</span>
                              <div className="flex flex-wrap gap-1">
                                <Button size="sm" onClick={() => addBlogBlock("en", "paragraph")} variant="outline" className="border-zinc-850 text-[10px] px-2 py-0.5 h-auto">
                                  + Paragraph
                                </Button>
                                <Button size="sm" onClick={() => addBlogBlock("en", "heading")} variant="outline" className="border-zinc-850 text-[10px] px-2 py-0.5 h-auto">
                                  + Heading
                                </Button>
                                <Button size="sm" onClick={() => addBlogBlock("en", "code")} variant="outline" className="border-zinc-850 text-[10px] px-2 py-0.5 h-auto">
                                  + Code
                                </Button>
                                <Button size="sm" onClick={() => addBlogBlock("en", "list")} variant="outline" className="border-zinc-850 text-[10px] px-2 py-0.5 h-auto">
                                  + List
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-3">
                              {(newBlog.content.en || []).map((block, bIdx) => (
                                <div key={bIdx} className="bg-zinc-950/60 border border-zinc-900/80 p-3 rounded-lg relative">
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[9px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                                      {bIdx + 1}: {block.type}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeBlogBlock("en", bIdx)}
                                      className="w-5 h-5 text-zinc-600 hover:text-red-500 rounded"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>

                                  {(block.type === "paragraph" || block.type === "heading") && (
                                    <textarea
                                      rows={block.type === "paragraph" ? 3 : 1}
                                      value={block.text || ""}
                                      onChange={(e) => updateBlogBlock("en", bIdx, "text", e.target.value)}
                                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white"
                                    />
                                  )}

                                  {block.type === "code" && (
                                    <div className="space-y-2">
                                      <input
                                        type="text"
                                        placeholder="Language (e.g. javascript)"
                                        value={block.language || ""}
                                        onChange={(e) => updateBlogBlock("en", bIdx, "language", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-1 text-xs text-white font-mono"
                                      />
                                      <textarea
                                        rows={3}
                                        value={block.code || ""}
                                        onChange={(e) => updateBlogBlock("en", bIdx, "code", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                                      />
                                    </div>
                                  )}

                                  {block.type === "list" && (
                                    <textarea
                                      rows={2}
                                      placeholder="List items (comma separated)"
                                      value={(block.items || []).join(",")}
                                      onChange={(e) => updateBlogBlock("en", bIdx, "items", e.target.value.split(",").map(i => i.trim()).filter(Boolean))}
                                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* VIETNAMESE BLOCKS */}
                          <div className="space-y-4 bg-zinc-900/10 p-4 border border-zinc-900 rounded-2xl">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-zinc-300">Vietnamese Blocks</span>
                              <div className="flex flex-wrap gap-1">
                                <Button size="sm" onClick={() => addBlogBlock("vi", "paragraph")} variant="outline" className="border-zinc-850 text-[10px] px-2 py-0.5 h-auto">
                                  + Đoạn văn
                                </Button>
                                <Button size="sm" onClick={() => addBlogBlock("vi", "heading")} variant="outline" className="border-zinc-850 text-[10px] px-2 py-0.5 h-auto">
                                  + Tiêu đề
                                </Button>
                                <Button size="sm" onClick={() => addBlogBlock("vi", "code")} variant="outline" className="border-zinc-850 text-[10px] px-2 py-0.5 h-auto">
                                  + Mã code
                                </Button>
                                <Button size="sm" onClick={() => addBlogBlock("vi", "list")} variant="outline" className="border-zinc-850 text-[10px] px-2 py-0.5 h-auto">
                                  + Danh sách
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-3">
                              {(newBlog.content.vi || []).map((block, bIdx) => (
                                <div key={bIdx} className="bg-zinc-950/60 border border-zinc-900/80 p-3 rounded-lg relative">
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[9px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                                      {bIdx + 1}: {block.type}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeBlogBlock("vi", bIdx)}
                                      className="w-5 h-5 text-zinc-600 hover:text-red-500 rounded"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>

                                  {(block.type === "paragraph" || block.type === "heading") && (
                                    <textarea
                                      rows={block.type === "paragraph" ? 3 : 1}
                                      value={block.text || ""}
                                      onChange={(e) => updateBlogBlock("vi", bIdx, "text", e.target.value)}
                                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white"
                                    />
                                  )}

                                  {block.type === "code" && (
                                    <div className="space-y-2">
                                      <input
                                        type="text"
                                        placeholder="Ngôn ngữ (VD: typescript)"
                                        value={block.language || ""}
                                        onChange={(e) => updateBlogBlock("vi", bIdx, "language", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-1 text-xs text-white font-mono"
                                      />
                                      <textarea
                                        rows={3}
                                        value={block.code || ""}
                                        onChange={(e) => updateBlogBlock("vi", bIdx, "code", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                                      />
                                    </div>
                                  )}

                                  {block.type === "list" && (
                                    <textarea
                                      rows={2}
                                      placeholder="Phần tử (ngăn cách bằng dấu phẩy)"
                                      value={(block.items || []).join(",")}
                                      onChange={(e) => updateBlogBlock("vi", bIdx, "items", e.target.value.split(",").map(i => i.trim()).filter(Boolean))}
                                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex gap-3 justify-end">
                        <Button
                          onClick={() => {
                            setActiveBlogIndex(null);
                          }}
                          variant="ghost"
                          className="hover:bg-zinc-900 text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={saveBlogChanges}
                          className="bg-zinc-200 hover:bg-white text-zinc-950 text-xs font-semibold px-4 rounded-lg"
                        >
                          Update Blog Post
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PRESS TAB */}
              {activeTab === "press" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-white mb-1">Press Mentions</h2>
                      <p className="text-xs text-zinc-500">Manage links to news articles and external press coverage.</p>
                    </div>
                    <Button onClick={createNewPress} size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>New Press Link</span>
                    </Button>
                  </div>

                  <hr className="border-zinc-900" />

                  {/* Press list selection */}
                  <div className="flex flex-wrap gap-2">
                    {(data.press || []).map((item: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => selectPress(idx)}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                          activePressIndex === idx
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10"
                            : "bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-800"
                        }`}
                      >
                        {item.publisher || "Article"} - {item.title ? item.title.slice(0, 30) + "..." : "Untitled"}
                      </button>
                    ))}
                  </div>

                  {activePressIndex !== null && (
                    <div className="border-t border-zinc-900 pt-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white">Editing Press Mention</h3>
                        <Button
                          onClick={() => deletePress(activePressIndex)}
                          variant="ghost"
                          size="sm"
                          className="text-xs text-red-500 hover:bg-red-500/10 hover:text-red-400 font-semibold gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Press Link</span>
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {/* URL input with autofill details button */}
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-zinc-400 block">Article Website URL</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="https://vnexpress.net/..."
                              value={newPressItem.url}
                              onChange={(e) => setNewPressItem({ ...newPressItem, url: e.target.value })}
                              className="flex-grow bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                            />
                            <Button
                              onClick={autofillPressMetadata}
                              disabled={fetchingMetadata}
                              variant="outline"
                              className="border-zinc-800 text-xs shrink-0 flex items-center gap-1.5"
                            >
                              {fetchingMetadata ? (
                                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <RefreshCw className="h-3.5 w-3.5" />
                              )}
                              <span>Fetch Info</span>
                            </Button>
                          </div>
                          <p className="text-[10px] text-zinc-500">Enter a URL and click &quot;Fetch Info&quot; to automatically download the Title, Source, and Cover Image!</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-zinc-400">Article Title / Headline</label>
                          <input
                            type="text"
                            value={newPressItem.title}
                            onChange={(e) => setNewPressItem({ ...newPressItem, title: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-zinc-400">Publisher Name (e.g. VnExpress)</label>
                            <input
                              type="text"
                              value={newPressItem.publisher}
                              onChange={(e) => setNewPressItem({ ...newPressItem, publisher: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-zinc-400">Publication Date</label>
                            <input
                              type="text"
                              placeholder="YYYY-MM-DD"
                              value={newPressItem.date}
                              onChange={(e) => setNewPressItem({ ...newPressItem, date: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-zinc-400">Cover Image URL</label>
                          <input
                            type="text"
                            value={newPressItem.imageUrl}
                            onChange={(e) => setNewPressItem({ ...newPressItem, imageUrl: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex gap-3 justify-end">
                        <Button
                          onClick={() => {
                            setActivePressIndex(null);
                          }}
                          variant="ghost"
                          className="hover:bg-zinc-900 text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={savePressChanges}
                          className="bg-zinc-200 hover:bg-white text-zinc-950 text-xs font-semibold px-4 rounded-lg"
                        >
                          Update Press Link
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
