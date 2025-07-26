export default function AuthMethod({
  title,
}: {
  title?: string;
  href?: string;
}) {
  return <div className="m-4 h-full rounded-xl p-4 bg-black">{title}</div>;
}
