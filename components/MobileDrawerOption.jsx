export default function MobileDrawerOption({ href, text }) {
  return (
    <a href={href} className="w-full">
      <h1>{text}</h1>
    </a>
  );
}
