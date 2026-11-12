import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function LoadingScreen() {
  return <StaticMarkup html={markup.loader} />;
}
