import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function HeroSection() {
  return <StaticMarkup html={markup.hero} />;
}
