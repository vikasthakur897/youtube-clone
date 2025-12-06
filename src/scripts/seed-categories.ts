import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "Technology",
  "Finance & Investing",
  "Business & Startups",
  "Motivation & Self-Improvement",
  "Travel & Lifestyle",
  "Education & Learning",
  "Coding & Programming",
  "Gaming",
  "Fitness & Health",
  "Food & Cooking",
  "News & Politics",
  "Science & Innovation",
  "Reviews & Unboxing",
  "How-To & Tutorials",
  "Personal Vlogs",
  "Comedy & Entertainment",
  "Music",
  "Sports",
  "Career & Skills",
  "Documentary & Storytelling",

  // More categories:
  "Artificial Intelligence",
  "Web Development",
  "Mobile Development",
  "Cybersecurity",
  "Data Science",
  "Machine Learning",
  "Crypto & Blockchain",
  "Stock Market Insights",
  "Real Estate & Property",
  "Entrepreneurship Tips",
  "Productivity Hacks",
  "Mindfulness & Mental Health",
  "Luxury Lifestyle",
  "Budget Travel",
  "Tech Gadgets",
  "Smartphone Reviews",
  "PC Building & Hardware",
  "Automobile Reviews",
  "Electric Vehicles",
  "Home Workouts",
  "Yoga & Meditation",
  "Healthy Recipes",
  "Street Food",
  "Startup Case Studies",
  "Motivational Stories",
  "Life Advice",
  "Study Tips",
  "Exam Preparation",
  "English Learning",
  "Career Guidance",
  "Freelancing & Side Hustles",
  "Digital Marketing",
  "Social Media Growth",
  "Photography & Videography",
  "Film & Cinematography",
  "Animation & VFX",
  "DIY Projects",
  "Home Renovation",
  "Parenting Tips",
  "Kids Learning",
  "Pet Care",
  "Relationship Advice",
  "Fashion & Styling",
  "Beauty & Skincare",
  "Makeup Tutorials",
  "Luxury Cars",
  "Gadgets Explainer",
  "Mythology & History",
  "True Crime",
  "Short Stories",
  "Interviews & Podcasts",
  "Spirituality",
  "Astrology & Horoscope"
];


async function main() {

    try {
      const values = categoryNames.map(name => ({ name , description: `Videos related to ${name.toLowerCase()}` }));
        await db.insert(categories).values(values).onConflictDoNothing().returning();
        console.log("Categories seeded successfully.");
        process.exit(0);
    } catch (error) {

        console.error("Error seeding categories:", error);
        process.exit(1);
        
    }
}

main()