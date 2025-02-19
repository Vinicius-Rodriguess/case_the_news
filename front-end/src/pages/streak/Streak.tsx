import {
  Coffee,
  EnvelopeOpen,
} from "@phosphor-icons/react";

export const Streak = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-10 p-4 items-center shadow">
      <div className="flex flex-col gap-4 w-full items-center p-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-center">Jornada Diária</h1>
        <p className="text-2xl text-center">
          Café na Mão, Notícias na Cabeça: Seu Combustível Matinal
        </p>
      </div>
      <div className=" w-full grid sm:grid-cols-3 sm:justify-center sm:items-center p-4 max-w-7xl gap-4"></div>
      <div className="w-full flex justify-center pt-8">
        <div className="max-w-7xl w-full flex justify-center items-center gap-5">
          <EnvelopeOpen size={50} className="hidden sm:flex"/>
          <h2 className="text-4xl sm:text-4xl text-center">Seu Histórico de Leituras</h2>
        </div>
      </div>
      <div className="w-full flex justify-center pb-5">
        <div className="max-w-7xl w-full flex justify-center items-center gap-5">
          <Coffee size={32} className="hidden sm:flex"/>
          <h2 className="text-2xl text-center">
            Não deixe para amanhã o que você pode ler hoje!
          </h2>
        </div>
      </div>
    </div>
  );
};
