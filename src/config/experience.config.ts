import type { Experience } from "@/types";

export const experiencesConfig: Experience[] = [
  {
    title: "Fullstack Developer",
    employmentType: "Freelance",
    company: {
      name: "Betmium",
      url: "https://betmium.com",
    },
    location: {
      name: "Remote",
    },
    start: "March 2025",
    end: "Continuing",
    description: [
      "Designed and implemented a secure authentication system for a gaming Betting platform using ReactJS, ensuring smooth and reliable user access.",
      "Developed a real-time two-player Dice Game using SocketIO, enabling interactive gameplay between remote users.",
      "Built and deployed a fully functional Higher-Lower Game, including game logic and user interface.",
      "Currently engineering a Multiplayer Betting Algorithm to enhance fairness and engagement in live betting scenarios.",
      "Leading the development of a Multiplayer Battle Round Game, focusing on real-time synchronization and scalable gameplay mechanics."
    ],
  },
  {
    title: "SDE Intern",
    employmentType: "Full time",
    company: {
      name: "Groclic(Textr AI)",
      url: "https://grocliq.com/",
    },
    location: {
      name: "Remote",
    },
    start: "Oct 2024",
    end: "Feb 2025",
    description: [
      "Implemented Google Search Console (GSC) integration to fetch and process metrics like clicks, and impressions enabling advanced SEO performance tracking.",
      "Designed and built a feature to retrieve and analyze backlinks for websites, utilizing APIs and custom data pipelines to generate actionable SEO insights.",
      "Developed an AI-driven article writer, integrating gpt models to generate high-quality content optimized for SEO keywords and natural language flow.",
      "Developed multiple features for an SEO analytics platform, using FastAPI for backend services, Tortoise ORM for database management, and React.js for dynamic and interactive frontend components."
    ],
  },
  
];
