import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function DocumentariesSection() {
  return <StaticMarkup html={markup.documentaries} />;
}
