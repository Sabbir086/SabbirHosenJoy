import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function SkillsSection() {
  return <StaticMarkup html={markup.skills} />;
}
