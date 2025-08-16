import { memo } from "react";
import { FaInstagram, FaFacebook, FaYoutube, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start space-y-4">
          <img src="/LOGOTYPE.png" alt="Logo" className="w-10 h-10" />
          <a href="#" className="w-40">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
            />
          </a>
          <a href="#" className="w-40">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
            />
          </a>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">О нас</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2 hover:text-red-500 cursor-pointer">
              <img src="/1.png" alt="" className="w-5 h-5" /> Публичная оферта
            </li>
            <li className="flex items-center gap-2 hover:text-red-500 cursor-pointer">
              <img src="/2.png" alt="" className="w-5 h-5" /> Реклама
            </li>
            <li className="flex items-center gap-2 hover:text-red-500 cursor-pointer">
              <img src="/3.png" alt="" className="w-5 h-5" /> F.A.Q
            </li>
            <li className="flex items-center gap-2 hover:text-red-500 cursor-pointer">
              <img src="/4.png" alt="" className="w-5 h-5" /> Контакты
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Категории</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2 hover:text-red-500 cursor-pointer">
              <img src="/5.png" alt="" className="w-5 h-5" /> Кино
            </li>
            <li className="flex items-center gap-2 hover:text-red-500 cursor-pointer">
              <img src="/6.png" alt="" className="w-5 h-5" /> Театр
            </li>
            <li className="flex items-center gap-2 hover:text-red-500 cursor-pointer">
              <img src="/7.png" alt="" className="w-5 h-5" /> Концерты
            </li>
            <li className="flex items-center gap-2 hover:text-red-500 cursor-pointer">
              <img src="/4.png" alt="" className="w-5 h-5" /> Спорт
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Связаться с нами</h3>
          <p className="text-red-500 font-bold mb-4">+998 (95) 897-33-38</p>
          <h3 className="font-semibold text-lg mb-3">Социальные сети</h3>
          <div className="flex space-x-4 text-red-500 text-2xl">
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
            <a href="#">
              <FaTelegram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
