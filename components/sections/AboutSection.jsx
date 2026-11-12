import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function AboutSection() {
  return <StaticMarkup html={markup.about} />;
}
