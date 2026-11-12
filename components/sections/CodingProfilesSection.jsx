import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function CodingProfilesSection() {
  return <StaticMarkup html={markup.cp} />;
}
