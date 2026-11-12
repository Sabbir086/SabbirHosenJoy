import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function Navbar() {
  return <StaticMarkup html={markup.navbar} />;
}
