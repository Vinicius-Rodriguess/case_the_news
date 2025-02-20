import { useEffect, useState } from "react";
import { MetricCard } from "../../components/metricCard/MetricCard";
import { Graphic } from "../../components/graphic/Graphic";
import { Metrics } from "../../interfaces/Metrics";
import { getMetrics } from "../../services/metricService";

export default function Admin() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState({
    allUniqueOpenings: [],
    engagementMetrics: {
      avgStreak: 1,
      totalOpenings: 1,
      totalUsers: 1,
      totalUniqueOpenings: 1,
    },
    topOpenings: [],
    topUsers: [],
  } as Metrics);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const metrics = await getMetrics();
        setData(metrics);
      } catch (error) {
        console.error("Erro ao buscar metricas:", error);
      }
    };

    fetchMetrics();
  }, []);

  const parseDate = (dateStr: string) => new Date(dateStr);

  // Filtrando os posts dentro do intervalo de datas selecionado
  const filteredPosts = data.allUniqueOpenings.filter((opening) => {
    const postDate = parseDate(opening.publicationDate);
    const start = startDate ? parseDate(startDate) : null;
    const end = endDate ? parseDate(endDate) : null;
    return (!start || postDate >= start) && (!end || postDate <= end);
  });

  return (
    <div className="p-6 max-w-6xl mx-auto ">
      {/* MÉTRICAS GERAIS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Usuários Totais"
          value={data.engagementMetrics.totalUsers}
        />
        <MetricCard
          title="Aberturas Totais"
          value={data.engagementMetrics.totalOpenings}
        />
        <MetricCard
          title="Média Streak"
          value={data.engagementMetrics.avgStreak}
        />
        <MetricCard
          title="Newsletters Publicadas"
          value={data.engagementMetrics.totalUniqueOpenings}
        />
      </div>

      {/* RANKING DOS USUÁRIOS */}
      <div className="bg-gray-news p-4 rounded-lg shadow-sm mb-6 hover:scale-101 transition-all">
        <h2 className="text-xl font-semibold mb-3 text-white">
          Top 5 - Usuários
        </h2>
        <table className="w-full text-left border bg-white">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-2">Email</th>
              <th className="p-2">Streak</th>
            </tr>
          </thead>
          <tbody>
            {data.topUsers.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{user.email}</td>
                <td className="p-2">🔥 {user.consecutiveStreak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RANKING DOS Openings */}
      <div className="p-4 rounded-lg shadow-sm mb-6 bg-gray-news hover:scale-101 transition-all">
        <h2 className="text-xl font-semibold mb-3 text-white">Top 5 - Posts</h2>
        <table className="w-full text-left border bg-white">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-2">Posts</th>
              <th className="p-2 text-center">Leituras</th>
            </tr>
          </thead>
          <tbody>
            {data.topOpenings.map((opening, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{opening.newsletterId}</td>
                <td className="p-2 text-center">🔥 {opening.openingsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RANKING DOS POSTS (FILTRADOS) */}
      <div className="p-4 rounded-lg shadow-sm mb-6 flex flex-col gap-4 bg-gray-news hover:scale-101 transition-all">
        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">
            Filtrar por Período
          </h2>
          <div className="flex gap-2">
            <input
              type="date"
              className="border rounded p-2 w-full bg-white"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="border rounded p-2 w-full bg-white"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <table className="w-full text-left border bg-white">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-2">Posts</th>
              <th className="p-2 text-center">Leituras</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((opening, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{opening.newsletterId}</td>
                  <td className="p-2 text-center">
                    🔥 {opening.openingsCount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-2 text-center text-gray-500">
                  Nenhum post encontrado no período selecionado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 rounded-lg shadow-sm mb-6 bg-gray-news hover:scale-101 transition-all">
        <Graphic data={data.allUniqueOpenings} />
      </div>
    </div>
  );
}
