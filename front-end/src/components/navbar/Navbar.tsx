export const Navbar = () => {
  return (
    <nav className="gap-4 p-4 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-8 mx-auto max-w-7xl">
        <a
          href="https://thenewscc.beehiiv.com/"
          target="_blank"
          className="flex gap-4 justify-center items-center hover:bg-gray-200 px-2 py-1 rounded-lg"
        >
          <img
            src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/publication/logo/ce78b549-5923-439b-be24-3f24c454bc12/ICONE_the_news_com_AMARELO.png"
            alt="Logo The News - Caneca de Café com fundo Amarelo"
            className="w-12 rounded-xl"
          />
          <p className="text-xl ">the news</p>
        </a>

        <a
          href="https://thenewscc.typeform.com/to/twCcjRbQ"
          target="_blank"
          className="text-xl hidden sm:flex hover:bg-gray-200 px-2 py-1 rounded-lg"
        >
          anuncie no the news
        </a>
      </div>
    </nav>
  );
};
