interface MetricCardProps {
  value: number;
  title: string;
}

export const MetricCard = ({ title, value }: MetricCardProps) => {
  return (
    <div className="bg-yellow-news p-4 rounded-lg shadow-sm text-center hover:scale-102 transition-all">
      <h3 className="text-black text-lg">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};
