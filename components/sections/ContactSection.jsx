import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function ContactSection() {
  return <StaticMarkup html={markup.contact} />;
}
