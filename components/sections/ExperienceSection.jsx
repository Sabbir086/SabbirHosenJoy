import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function ExperienceSection() {
  return <StaticMarkup html={markup.experience} />;
}
