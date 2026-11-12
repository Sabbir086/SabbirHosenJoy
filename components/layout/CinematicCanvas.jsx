import StaticMarkup from "../StaticMarkup";
import markup from "@/content/portfolio-markup.json";

export default function CinematicCanvas() {
  return <StaticMarkup html={markup.canvas} />;
}
