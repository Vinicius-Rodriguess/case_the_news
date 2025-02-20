import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Opening } from "../../interfaces/Opening";

interface NewsletterChartProps {
  data: Opening[];
}

export const Graphic = ({ data }: NewsletterChartProps) => {
  // Formatar os dados para exibir apenas a data
  const formattedData = data.map((item) => ({
    date: item.publicationDate.replace("T00:00:00.000Z", ""),
    openings: item.openingsCount,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3 text-center">
        Aberturas por Dia
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="openings"
            stroke="#000"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
