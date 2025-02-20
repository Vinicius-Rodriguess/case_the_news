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
    level: "",
  } as User);

  const levelMessages: { [key: string]: string } = {
    "Café Expresso":
      "Você está começando essa nova jornada! Não desanime, pegue sua xícara de café e venha conosco explorar o mundo das notícias!",
    Macchiato:
      "Você já está com um bom hábito de leitura e aprendizado. Nada melhor que aprender enquanto toma um café!",
    "Barista Mestre":
      "Agora que você já é um mestre em notícias e café, está na hora de ajudar outros em sua jornada. Compartilhe o The News!",
  };

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
    <div className="flex min-h-screen w-full flex-col items-center gap-10 p-4 shadow">
      <div className="flex w-full flex-col items-center gap-4 p-4">
        <h1 className="text-center text-5xl font-bold sm:text-6xl">
          Jornada Diária
        </h1>
        <p className="text-center text-2xl">
          Café na Mão, Notícias na Cabeça: Seu Combustível Matinal
        </p>
      </div>

      <div className="grid w-full max-w-6xl gap-4 p-4 sm:grid-cols-3 sm:items-center sm:justify-center">
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

      <div className="flex w-full justify-center py-5">
        <div className="flex w-full max-w-6xl flex-col gap-10 rounded-lg bg-gray-50 p-4 shadow-sm transition-all hover:scale-101">
          <h2 className="text-center text-4xl font-semibold">
            Nivel: {user.level} ☕
          </h2>
          <p className="text-center text-2xl">
            {levelMessages[user.level] ||
              "Continue sua jornada e descubra novos níveis!"}
          </p>
        </div>
      </div>

      <div className="flex w-full justify-center pt-8">
        <div className="flex w-full max-w-6xl items-center justify-center gap-5">
          <EnvelopeOpen size={50} className="hidden sm:flex" />
          <h2 className="text-center text-4xl sm:text-4xl">
            Seu Histórico de Leituras
          </h2>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-6xl justify-center">
          <div className="rounded-2xl bg-black p-4 shadow-xl transition-all hover:scale-102">
            <CalendarComponent markedDates={dateOpenings} />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center pb-5">
        <div className="flex w-full max-w-6xl items-center justify-center gap-5">
          <Coffee size={32} className="hidden sm:flex" />
          <h2 className="text-center text-2xl">
            Não deixe para amanhã o que você pode ler hoje!
          </h2>
        </div>
      </div>
    </div>
  );
};
