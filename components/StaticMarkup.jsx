export default function StaticMarkup({ html, className = "contents" }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
