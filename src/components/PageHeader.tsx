interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl opacity-90">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
