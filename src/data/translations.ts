export interface TranslationKeys {
  author: string;
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    blogs: string;
    contact: string;
    menu: string;
    close: string;
  };
  hero: {
    hi: string;
    title: string;
    resume: string;
    subtitle: string;
    devtoolsHint: string;
  };
  skills: {
    title: string;
    hint: string;
  };
  projects: {
    title: string;
    cancel: string;
    visit: string;
    frontend: string;
    backend: string;
    visitWebsite: string;
    github: string;
  };
  contact: {
    title: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    promise: string;
    send: string;
    wait: string;
    successTitle: string;
    successDesc: string;
    errorTitle: string;
    errorDesc: string;
    letsWorkTogether: string;
    contactFormTitle: string;
    contactDirect: string;
    orDropInfo: string;
  };
  about: {
    title: string;
    stuffIUse: string;
    role: string;
    desc1: string;
    desc2: string;
  };
  skillsDesc: Record<string, string>;
  themeDisclaimers: {
    light: string[];
    dark: string[];
  };
}

export const translations: Record<"en" | "vi", TranslationKeys> = {
  en: {
    author: "Baso",
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      blogs: "Blogs",
      contact: "Contact",
      menu: "Menu",
      close: "Close"
    },
    hero: {
      hi: "Hi, I am",
      title: "A Full-Stack & AI Developer",
      resume: "Resume",
      subtitle: "A Full-Stack & AI Developer",
      devtoolsHint: "there's something waiting for you in devtools"
    },
    skills: {
      title: "SKILLS",
      hint: "(hint: press a key)"
    },
    projects: {
      title: "Projects",
      cancel: "Cancel",
      visit: "Visit",
      frontend: "Frontend",
      backend: "Backend",
      visitWebsite: "Visit Website",
      github: "Github"
    },
    contact: {
      title: "Contact",
      fullName: "Full name",
      fullNamePlaceholder: "Your Name",
      email: "Email Address",
      emailPlaceholder: "you@example.com",
      message: "Your Message",
      messagePlaceholder: "Tell me about your project,",
      promise: "I'll never share your data with anyone else. Pinky promise!",
      send: "Send Message",
      wait: "Please wait",
      successTitle: "Thank you!",
      successDesc: "I'll get back to you as soon as possible.",
      errorTitle: "Error",
      errorDesc: "Something went wrong! Please check the fields.",
      letsWorkTogether: "LET'S WORK TOGETHER",
      contactFormTitle: "Contact Form",
      contactDirect: "Please contact me directly at",
      orDropInfo: "or drop your info here."
    },
    about: {
      title: "About me",
      stuffIUse: "Stuff I use",
      role: "Full-Stack & AI Developer",
      desc1: "Hey there! I'm Binh Duong, a Fullstack and AI developer passionate about creating meaningful digital experiences. With expertise in Web development and AI, I thrive on turning ideas into reality through coding and design. My journey began with a fascination for technology and a drive to make a positive impact.",
      desc2: "I am passionate about learning new things, enjoy playing chess, reading books and taking long walks with my dog."
    },
    skillsDesc: {
      py: "the go-to for data science and AI, no cap! 🐍💻",
      js: "yeeting code into the DOM since '95, no cap! 💯🚀",
      ts: "JavaScript's overachieving cousin who's always flexing 💯🔒",
      html: "the internet's granddad, still bussin' fr fr! 💀🔥",
      css: "styling with the ultimate drip, no cap 💁‍♂️🔥",
      react: `"use using" using use = useUsing("use")`,
      nextjs: "the drama queen of front-end frameworks, and we stan! 👑📜",
      tailwind: "utility classes hitting different fr fr 🌪️🔥",
      nodejs: "JavaScript said 'sike, I'm backend now', deadass! 🔙🔚",
      express: "middlewares go dummy hard, no cap! 🚂💨",
      nestjs: "Node.js but make it classy, fr fr! 🏰🤵",
      django: "the web framework that slaps, no cap! 🕸️🔥",
      flask: "micro but mighty, just like your morning coffee! ☕⚡",
      postgres: "SQL but make it fashion, purr 💅🐘",
      mongodb: "flexin' with that NoSQL drip, respectfully! 💪🍃",
      redis: "speeding up data like it's on roller skates, no cap! 🛼⚡",
      prisma: "ORM that makes databases feel like a breeze, fr fr! 🌬️💾",
      git: "the code's personal bodyguard, no cap! 🕵️‍♂️🔄",
      github: "sliding into those pull requests, IYKYK! 🐙",
      npm: "package manager said 'I gotchu fam', period! 📦💯",
      linux: "where 'chmod 777' is the ultimate flex 🔓🙌",
      docker: "The best containerization! 🐳🔥",
      nginx: "reverse proxy go zoom zoom, sheesh! 🚗💨",
      vercel: "The triangle company, helps you deploy and go touch grass! 🚀🌿"
    },
    themeDisclaimers: {
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
      ]
    }
  },
  vi: {
    author: "Vũ Thái Bình Dương",
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      skills: "Kỹ năng",
      projects: "Dự án",
      blogs: "Bài viết",
      contact: "Liên hệ",
      menu: "Menu",
      close: "Đóng"
    },
    hero: {
      hi: "Xin chào, tôi là",
      title: "Lập trình viên Full-Stack & AI",
      resume: "Tải CV",
      subtitle: "Lập trình viên Full-Stack & AI",
      devtoolsHint: "có điều gì đó đang chờ bạn trong devtools đấy"
    },
    skills: {
      title: "KỸ NĂNG",
      hint: "(gợi ý: nhấn một phím bất kỳ)"
    },
    projects: {
      title: "Dự án",
      cancel: "Hủy",
      visit: "Xem trang",
      frontend: "Frontend",
      backend: "Backend",
      visitWebsite: "Ghé thăm Website",
      github: "Github"
    },
    contact: {
      title: "Liên hệ",
      fullName: "Họ và tên",
      fullNamePlaceholder: "Tên của bạn",
      email: "Địa chỉ Email",
      emailPlaceholder: "you@example.com",
      message: "Lời nhắn của bạn",
      messagePlaceholder: "Hãy kể cho tôi nghe về dự án của bạn,",
      promise: "Tôi cam kết không bao giờ chia sẻ thông tin của bạn với bất kỳ ai!",
      send: "Gửi tin nhắn",
      wait: "Vui lòng đợi",
      successTitle: "Cảm ơn bạn!",
      successDesc: "Tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.",
      errorTitle: "Lỗi",
      errorDesc: "Đã xảy ra lỗi! Vui lòng kiểm tra lại thông tin các trường.",
      letsWorkTogether: "HÃY CÙNG HỢP TÁC!",
      contactFormTitle: "Mẫu liên hệ",
      contactDirect: "Vui lòng liên hệ trực tiếp qua email",
      orDropInfo: "hoặc để lại thông tin của bạn tại đây."
    },
    about: {
      title: "Về tôi",
      stuffIUse: "Công cụ tôi dùng",
      role: "Lập trình viên Full-Stack & AI",
      desc1: "Xin chào! Tôi là Bình Dương, một lập trình viên Fullstack và AI đầy nhiệt huyết với mong muốn tạo ra những trải nghiệm kỹ thuật số ý nghĩa. Bằng kiến thức chuyên môn về phát triển Web và AI, tôi luôn nỗ lực biến ý tưởng thành hiện thực thông qua lập trình và thiết kế. Hành trình của tôi bắt đầu từ sự đam mê công nghệ và mong muốn đóng góp giá trị tích cực.",
      desc2: "Tôi là người luôn ham học hỏi những điều mới, thích chơi cờ, đọc sách và dắt chó đi dạo."
    },
    skillsDesc: {
      py: "ngôn ngữ hàng đầu cho khoa học dữ liệu và AI! 🐍💻",
      js: "quăng code vào DOM từ năm 1995! 💯🚀",
      ts: "người anh em nghiêm túc của JavaScript, giúp code an toàn hơn! 💯🔒",
      html: "xương sườn của mọi trang web! 💀🔥",
      css: "styling với phong cách thiết kế cực đỉnh! 💁‍♂️🔥",
      react: `"use using" sử dụng use = useUsing("use")`,
      nextjs: "framework tối ưu SEO và trải nghiệm người dùng tuyệt vời! 👑📜",
      tailwind: "viết CSS cực nhanh với các class tiện ích! 🌪️🔥",
      nodejs: "mang JavaScript ra chạy ở backend! 🔙🔚",
      express: "viết API cực kỳ nhanh gọn và linh hoạt! 🚂💨",
      nestjs: "framework backend chuyên nghiệp, kiến trúc rõ ràng! 🏰🤵",
      django: "framework Python đầy đủ tính năng, mạnh mẽ! 🕸️🔥",
      flask: "nhỏ gọn nhưng cực kỳ linh hoạt cho API! ☕⚡",
      postgres: "hệ quản trị cơ sở dữ liệu quan hệ mạnh mẽ, đáng tin cậy! 💅🐘",
      mongodb: "lưu trữ dữ liệu dạng NoSQL linh hoạt! 💪🍃",
      redis: "bộ nhớ đệm tốc độ bàn thờ giúp tăng tốc ứng dụng! 🛼⚡",
      prisma: "ORM hiện đại giúp làm việc với DB dễ như ăn kẹo! 🌬️💾",
      git: "hệ thống quản lý phiên bản mã nguồn, bảo vệ code của bạn! 🕵️‍♂️🔄",
      github: "nơi lưu trữ và cộng tác phát triển phần mềm tuyệt vời! 🐙",
      npm: "kho quản lý thư viện khổng lồ cho Javascript! 📦💯",
      linux: "hệ điều hành của mọi lập trình viên chuyên nghiệp! 🔓🙌",
      docker: "đóng gói ứng dụng chạy mượt mà ở mọi môi trường! 🐳🔥",
      nginx: "web server và reverse proxy tốc độ cao! 🚗💨",
      vercel: "nền tảng tốt nhất để deploy ứng dụng Next.js! 🚀🌿"
    },
    themeDisclaimers: {
      light: [
        "Cảnh báo: Chế độ sáng phát ra hàng triệu lumen ánh sáng tinh khiết!",
        "Chú ý: Chế độ sáng phía trước! Vui lòng không thử tại nhà.",
        "Chỉ những người chuyên nghiệp mới chịu được độ sáng này. Hãy đeo kính râm!",
        "Chuẩn bị tinh thần! Chế độ sáng sắp chiếu sáng hơn cả tương lai của bạn.",
        "Đang bật chế độ sáng... Bạn chắc chắn mắt mình đã sẵn sàng chứ?",
      ],
      dark: [
        "Chế độ sáng? Tôi cứ tưởng bạn đã điên... nhưng chào mừng trở lại phe bóng tối!",
        "Đang chuyển sang chế độ tối... Cuộc sống bên phía ánh sáng thế nào?",
        "Chế độ tối đã kích hoạt! Cảm ơn bạn từ đáy lòng, và mắt của tôi cũng vậy.",
        "Chào mừng trở lại bóng đêm. Cuộc sống ngoài kia thế nào?",
        "Chế độ tối bật! Cuối cùng cũng có người hiểu được sự tinh tế đích thực.",
      ]
    }
  }
};
