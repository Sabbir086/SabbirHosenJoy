import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function AchievementsSection() {
  return <StaticMarkup html={markup.achievements} />;
}
