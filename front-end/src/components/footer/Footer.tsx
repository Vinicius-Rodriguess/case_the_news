import {
  Envelope,
  InstagramLogo,
  LinkedinLogo,
  Rss,
  TiktokLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";

export const Footer = () => {
  return (
    <footer className="w-full text-xl p-4">
      <div className="flex flex-col sm:flex-row items-center gap-8 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4 item justify-center text-center w-full">
          <div className="flex items-center gap-4 justify-center">
            <img
              src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/publication/logo/ce78b549-5923-439b-be24-3f24c454bc12/ICONE_the_news_com_AMARELO.png"
              alt="Logo The News - Caneca de Café com fundo Amarelo"
              className="w-12"
            />
            <p className="font-semibold">the news</p>
          </div>
          <p>tudo que você precisa saber pra começar seu dia bem e informado</p>
          <p>© 2025 Grupo waffle.</p>
        </div>
        <div className="hidden md:flex flex-col gap-4 item w-10/12">
          <p className="font-semibold">Início</p>
          <a href="https://thenewscc.beehiiv.com/" target="_blank">
            Posts
          </a>
          <a href="https://thenewscc.beehiiv.com/publications" target="_blank">
            Newsletters
          </a>
        </div>
        <div className="hidden md:flex flex-col gap-4 item w-10/12">
          <p className="font-semibold">fale conosco</p>
          <a
            href="https://thenewscc.typeform.com/to/twCcjRbQ"
            target="_blank"
            className="font-semibold"
          >
            anuncie no the news
          </a>
        </div>
        <div className="flex flex-col gap-4 item w-full">
          <div className="border-4 border-yellow-news p-1 bg-gray-50 rounded-xl flex items-center">
            <Envelope size={40} className="text-yellow-news pl-1" />
            <input
              type="text"
              placeholder="Coloque seu email"
              className="pl-2 focus:outline-none w-full"
            />
            <a href="https://thenewscc.beehiiv.com/c/welcome" target="_blank">
              <button className="bg-yellow-news p-1 rounded-xl text-white font-semibold cursor-pointer w-full">
                inscreva-se
              </button>
            </a>
          </div>
          <div className="flex justify-between">
            <a href="https://x.com/thenews_br?mx=2" target="_blank">
              <XLogo
                size={40}
                weight="bold"
                className="text-white bg-black rounded-full p-2"
              />
            </a>

            <a href="https://www.linkedin.com/company/thenewscc/">
              <LinkedinLogo
                size={40}
                weight="bold"
                className="text-white bg-black rounded-full p-2"
              />
            </a>

            <a href="https://www.instagram.com/thenews.cc/#">
              <InstagramLogo
                size={40}
                weight="bold"
                className="text-white bg-black rounded-full p-2"
              />
            </a>

            <a
              href="https://www.youtube.com/channel/UCHAHidiEnsFjEiAhw3FQ41w"
              target="_blank"
            >
              <YoutubeLogo
                size={40}
                weight="bold"
                className="text-white bg-black rounded-full p-2"
              />
            </a>

            <a href="https://www.tiktok.com/@grupowaffle" target="_blank">
              <TiktokLogo
                size={40}
                weight="bold"
                className="text-white bg-black rounded-full p-2"
              />
            </a>

            <a
              href="https://rss.beehiiv.com/feeds/j9teVW9Qmi.xml"
              target="_blank"
            >
              <Rss
                size={40}
                weight="bold"
                className="text-white bg-black rounded-full p-2"
              />
            </a>
          </div>
          <div className="flex gap-4 text-sm text-end justify-end">
            <a
              href="https://www.beehiiv.com/privacy"
              target="_blank"
              className="border-b-1"
            >
              Politica de privacidade
            </a>
            <a
              href="https://www.beehiiv.com/tou"
              target="_blank"
              className="border-b-1"
            >
              Termos de uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
