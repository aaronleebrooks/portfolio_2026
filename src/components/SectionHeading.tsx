type SectionHeadingProps = {
  number: string;
  title: string;
  id?: string;
};

export function SectionHeading({ number, title, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="mb-8 flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground"
    >
      <span className="font-mono text-sm font-normal text-primary">
        {number}.
      </span>
      <span>{title}</span>
      <span
        aria-hidden="true"
        className="ml-2 h-px flex-1 bg-gradient-to-r from-border to-transparent"
      />
    </h2>
  );
}
