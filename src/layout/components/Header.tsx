import { memo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { House, Clapperboard, Search, Menu, X, Bookmark } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  banner: string;
  thumb: string;
}

const Header = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const slides: Slide[] = [
    {
      id: 1,
      title: "Spider-Man",
      banner: "/spiderman.png",
      thumb: "/spiderman.png",
    },
    { id: 2, title: "Avengers", banner: "/image.png", thumb: "/image.png" },
    { id: 3, title: "Batman", banner: "/batman.png", thumb: "/batman.png" },
    {
      id: 4,
      title: "Kung Fu Panda",
      banner: "/kungfu.png",
      thumb: "/kungfu.png",
    },
  ];

  const showBanner = location.pathname === "/";

  return (
    <header className="bg-black text-white">
      <div className="fixed top-0 left-0 w-full bg-black z-50 h-16">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center h-16 px-4">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 object-contain" />
          </NavLink>

          <nav className="hidden md:flex gap-6">
            {[
              ["/", House],
              ["/movies", Clapperboard],
              ["/bookmark", Bookmark],
              ["/search", Search],
            ].map(([to, Icon]) => (
              <NavLink
                key={to as string}
                to={to as string}
                className={({ isActive }) =>
                  `flex flex-col items-center text-sm ${
                    isActive ? "text-red-500" : "hover:text-red-500"
                  }`
                }>
                <Icon size={22} />
              </NavLink>
            ))}
          </nav>

          <button className="hidden md:block bg-red-600 w-[140px] h-[44px] rounded-[10px] hover:bg-red-700 duration-200">
            Войти
          </button>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-black border-t border-gray-700">
            <nav className="flex flex-col items-center gap-4 py-4">
              {[
                ["/", House, "Главная"],
                ["/movies", Clapperboard, "Фильмы"],
                ["/bookmark", Bookmark, "Закладки"],
                ["/search", Search, "Поиск"],
              ].map(([to, Icon, text]) => (
                <NavLink
                  key={to as string}
                  to={to as string}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-base ${
                      isActive ? "text-red-500" : "hover:text-red-500"
                    }`
                  }>
                  <Icon size={20} />
                  {text as string}
                </NavLink>
              ))}
              <button className="bg-red-600 w-[120px] h-[40px] rounded-[10px] hover:bg-red-700 duration-200">
                Войти
              </button>
            </nav>
          </div>
        )}
      </div>

      <div className="pt-16">
        {showBanner && (
          <>
            <div className="max-w-[1360px] mx-auto h-[250px] sm:h-[350px] md:h-[480px] lg:h-[620px] mt-4 rounded overflow-hidden">
              <img
                src={slides[activeIndex].banner}
                alt={slides[activeIndex].title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="max-w-[1360px] mx-auto flex justify-center items-center gap-2 sm:gap-4 py-4 flex-wrap">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-20 h-12 sm:w-24 sm:h-14 overflow-hidden rounded-lg border-2 transition ${
                    index === activeIndex
                      ? "border-red-500"
                      : "border-transparent hover:border-white"
                  }`}>
                  <img
                    src={slide.thumb}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
