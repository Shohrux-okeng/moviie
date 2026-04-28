import { memo, useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { House, Clapperboard, Search, Menu, X, Bookmark, LogOut, User } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { authService } from "../../features/auth/services/authService";

interface Slide {
  id: number;
  title: string;
  banner: string;
  thumb: string;
}

const Header = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

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

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('[v0] Logout error:', err);
    }
    setProfileOpen(false);
  };

  return (
    <header className="bg-black text-white border-b border-gray-800">
      <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/95 z-50 h-16 border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center h-16 px-4 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="Logo" className="h-8 object-contain group-hover:scale-110 transition" />
            <span className="hidden sm:inline font-bold text-lg bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">Movies</span>
          </NavLink>

          <nav className="hidden md:flex gap-8">
            {[
              ["/", House],
              ["/movies", Clapperboard],
              ["/bookmarks", Bookmark],
              ["/search", Search],
            ].map(([to, Icon]) => (
              <NavLink
                key={to as string}
                to={to as string}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 text-sm transition relative group ${
                    isActive ? "text-red-500" : "text-gray-400 hover:text-white"
                  } ${isActive ? "after:absolute after:-bottom-3 after:w-6 after:h-1 after:bg-red-500 after:rounded-full" : ""}`
                }>
                <Icon size={22} />
              </NavLink>
            ))}
          </nav>

          {isAuthenticated ? (
            <div className="hidden md:block relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 transition"
              >
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <span className="text-sm text-gray-300">{user?.fullName || user?.email}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-gray-800 transition border-t border-gray-800"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:block bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-6 py-2 rounded-lg font-semibold transition duration-300"
            >
              Sign In
            </Link>
          )}

          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col items-start gap-2 py-4 px-4">
              {[
                ["/", House, "Главная"],
                ["/movies", Clapperboard, "Фильмы"],
                ["/bookmarks", Bookmark, "Закладки"],
                ["/search", Search, "Поиск"],
              ].map(([to, Icon, text]) => (
                <NavLink
                  key={to as string}
                  to={to as string}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-base w-full px-3 py-2 rounded-lg transition ${
                      isActive ? "text-red-500 bg-red-500/10" : "text-gray-400 hover:text-white hover:bg-gray-900"
                    }`
                  }>
                  <Icon size={20} />
                  {text as string}
                </NavLink>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 h-[40px] rounded-lg font-semibold transition mt-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="w-full text-center bg-gradient-to-r from-red-600 to-red-500 h-[40px] rounded-lg hover:shadow-lg hover:shadow-red-500/50 font-semibold transition mt-2 flex items-center justify-center"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>

      <div className="pt-16">
        {showBanner && (
          <>
            <div className="max-w-[1360px] mx-auto h-[250px] sm:h-[350px] md:h-[480px] lg:h-[620px] mt-4 rounded-2xl overflow-hidden group relative">
              <img
                src={slides[activeIndex].banner}
                alt={slides[activeIndex].title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition duration-300 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">{slides[activeIndex].title}</h3>
              </div>
            </div>

            <div className="max-w-[1360px] mx-auto flex justify-center items-center gap-2 sm:gap-4 py-6 flex-wrap px-4">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-20 h-12 sm:w-24 sm:h-14 overflow-hidden rounded-xl border-2 transition ${
                    index === activeIndex
                      ? "border-red-500 ring-2 ring-red-500/50 scale-105"
                      : "border-gray-700 hover:border-gray-500 hover:scale-110"
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
