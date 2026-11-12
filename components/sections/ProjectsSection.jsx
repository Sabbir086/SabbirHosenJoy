import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function ProjectsSection() {
  return <StaticMarkup html={markup.projects} />;
}
