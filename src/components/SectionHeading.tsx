type SectionHeadingProps = {
  title: string;
  id?: string;
};

export function SectionHeading({ title, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="mb-8 font-heading text-3xl font-semibold tracking-tight text-foreground"
    >
      {title}
    </h2>
  );
}
