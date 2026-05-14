const portfolioData = {
  personalInfo: {
    logoName: "Fady Tamer",
    greeting: "Hi, my name is",
    name: "Fady Tamer",
    role: "Software Engineer & Frontend Developer",
    email: "fadytamer2018@gmail.com",
    cvLink: "data/CV.pdf",
    about: `Dedicated and detail-oriented Computer Science student with strong <span>problem-solving</span> skills and hands-on experience in <span>web development</span>. <br><br>
<span>Education:</span> Bachelor's Degree in Computer Science from <span>Modern Academy, Cairo, Egypt</span>.`,
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/fady-tamer/",
    facebook: "https://www.facebook.com/fadytamer444/",
    instagram: "https://www.instagram.com/_fady_tamer_/",
    github: "https://github.com/Fady-tamer",
  },
  certifications: [
    {
      title: "The Web Front End Learning Guide",
      image: "img/UC-b53d84ba-69f8-4821-81bd-82d88a619b35.jpg",
      credentialId: "UC-b53d84ba-69f8-4821-81bd-82d88a619b35",
      date: "6/12/25",
      skills: ["HTML", "CSS", "JavaScript"],
    },
  ],
  projects: [
    {
      title: "E-Book Store",
      image: "img/images.png",
      github: "https://github.com/Fady-tamer/E-Book-project",
      live: "",
      description:
        "Java-based desktop application designed to manage an E-Book Store. GUI for managing books, publishers, and authors.",
      skills: ["Java", "Microsoft-SQL-Server"],
    },
    {
      title: "Rentals",
      image: "img/rentels.png",
      github: "https://github.com/Fady-tamer/Rentels",
      live: "",
      description:
        "Real Estate Marketplace. Provided a fantastic experience in database design, backend logic, and frontend performance.",
      skills: ["HTML", "CSS", "JavaScript", "PHP"],
    },
    {
      title: "Artist Gallery",
      image: "img/artist-gallery.png",
      github: "https://github.com/Fady-tamer/Rana-gallery",
      live: "https://artist-rana-gallery.vercel.app/",
      description:
        "A custom gallery website built to showcase the artwork of an artist named Rana. The project features a clean, responsive layout and is deployed via Vercel for fast, reliable access.",
      skills: ["HTML", "CSS", "JavaScript", "Firebase"],
    },
    {
      title: "ALL-IN-ONE",
      image: "img/all-in-one-store.png",
      github: "https://github.com/Fady-tamer/all-in-one-store",
      description:
        "online grocery store where customers can browse products, manage their cart, and place orders in real time. It also includes an admin panel for managing inventory and tracking incoming orders.",
      skills: ["HTML", "CSS", "JavaScript", "Firebase"],
    },
  ],
  skills: [
    {
      category: "Languages",
      icon: "fa-solid fa-terminal",
      items: [
        { name: "C++", image: "img/c-.png" },
        { name: "JavaScript", image: "img/js.png" },
        { name: "PHP", image: "img/php.png" },
      ],
    },
    {
      category: "Frontend",
      icon: "fa-solid fa-palette",
      items: [
        { name: "HTML", image: "img/html-5.png" },
        { name: "CSS", image: "img/css-3.png" },
        { name: "JavaScript", image: "img/js.png" },
      ],
    },
    {
      category: "Frameworks",
      icon: "fa-solid fa-layer-group",
      items: [
        { name: "Bootstrap", icon: "fa-brands fa-bootstrap", color: "#7952b3" },
      ],
    },
    {
      category: "Backend & Database",
      icon: "fa-solid fa-database",
      items: [
        { name: "PHP", image: "img/php.png" },
        { name: "MySQL", image: "img/mysql.png" },
      ],
    },
  ],
};
