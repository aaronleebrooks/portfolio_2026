type SectionHeadingProps = {
  title: string;
  id?: string;
};

export function SectionHeading({ title, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="mb-8 text-2xl font-semibold tracking-tight text-foreground"
    >
      {title}
    </h2>
  );
}
