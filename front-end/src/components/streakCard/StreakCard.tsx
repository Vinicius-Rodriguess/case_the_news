import { ReactNode } from "react";

interface StreakCardProps {
  icon: ReactNode;
  value: number;
  title: string;
}

export const StreakCard = ({ icon, value, title }: StreakCardProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col p-4 rounded-2xl w-full max-w-80 bg-yellow-news border-1 border-gray-600 shadow-xl hover:scale-102 transition-all">
        <div className="flex justify-between p-2">
          {icon}
          <p className="text-6xl">{value}</p>
        </div>
        <div className="p-2">
          <p className="font-semibold text-lg">{title}</p>
        </div>
      </div>
    </div>
  );
};
