import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function Footer() {
  return <StaticMarkup html={markup.footer} />;
}
