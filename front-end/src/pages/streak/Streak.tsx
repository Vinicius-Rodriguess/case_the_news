import {
  BookOpenText,
  Coffee,
  Crown,
  EnvelopeOpen,
  Fire,
} from "@phosphor-icons/react";
import CalendarComponent from "../../components/calendar/Calendar";
import { getUserOpenings } from "../../services/userService";
import { Opening } from "../../interfaces/Opening";
import { User } from "../../interfaces/User";
import { useEffect, useState } from "react";
import { StreakCard } from "../../components/streakCard/StreakCard";
import { useParams } from "react-router-dom";

export const Streak = () => {
  const [dateOpenings, setDateOpenings] = useState<Date[]>([]);
  const { email } = useParams<{ email?: string }>();
  const [user, setUser] = useState({
    consecutiveStreak: 0,
    totalStreak: 0,
    highestConsecutiveStreak: 0,
  } as User);

  useEffect(() => {
    if (email) {
      const fetchUser = async (email: string) => {
        try {
          const user = await getUserOpenings(email);
          const dateOpenings = user.openings.map(
            (opening: Opening) => new Date(opening.openedAt)
          );

          setUser(user);
          setDateOpenings(dateOpenings);
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
        }
      };

      fetchUser(email);
    }
  }, [email]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-10 p-4 items-center shadow">
      <div className="flex flex-col gap-4 w-full items-center p-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-center">
          Jornada Diária
        </h1>
        <p className="text-2xl text-center">
          Café na Mão, Notícias na Cabeça: Seu Combustível Matinal
        </p>
      </div>

      <div className=" w-full grid sm:grid-cols-3 sm:justify-center sm:items-center p-4 max-w-6xl gap-4">
        <StreakCard
          icon={<Fire size={60} className="text-red-600" />}
          value={user.consecutiveStreak}
          title="Dias Seguidos"
        />
        <StreakCard
          icon={<Crown size={60} className="text-black" />}
          value={user.highestConsecutiveStreak}
          title="Recorde Pessoal"
        />
        <StreakCard
          icon={<BookOpenText size={60} className="text-blue-700" />}
          value={user.totalStreak}
          title="Total de Leituras"
        />
      </div>
      <div className="w-full flex justify-center pt-8">
        <div className="max-w-6xl w-full flex justify-center items-center gap-5">
          <EnvelopeOpen size={50} className="hidden sm:flex" />
          <h2 className="text-4xl sm:text-4xl text-center">
            Seu Histórico de Leituras
          </h2>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="max-w-6xl w-full flex justify-center">
          <div className="bg-black p-4 rounded-2xl shadow-xl hover:scale-102 transition-all">
            <CalendarComponent markedDates={dateOpenings} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center pb-5">
        <div className="max-w-6xl w-full flex justify-center items-center gap-5">
          <Coffee size={32} className="hidden sm:flex" />
          <h2 className="text-2xl text-center">
            Não deixe para amanhã o que você pode ler hoje!
          </h2>
        </div>
      </div>
    </div>
  );
};
