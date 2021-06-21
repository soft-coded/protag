import "./section-header.scss";

interface ChildrenType {
  title: string;
}

export default function SectionHeader({ title }: ChildrenType) {
  return (
    <header className="section-header">
      <h1>{title}</h1>
    </header>
  );
}
