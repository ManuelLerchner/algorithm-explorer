import { useLocation, useNavigate } from "react-router-dom";
import { mapUrlToBreadcrumbs } from "./BreadcrumbHelper";

import { ReactComponent as MoonIcon } from "../../assets/moon.svg";
import { ReactComponent as SunIcon } from "../../assets/sun.svg";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";

function NavBar({ toggleIsDark }: { toggleIsDark: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { validUntil, breadcrumbs } = mapUrlToBreadcrumbs(location.pathname);

  return (
    <div className="h-12 flex flex-row items-center justify-between px-16 bg-neutral-200 dark:bg-gray-800 drop-shadow-md text-2xl dark:text-white">
      <button
        className="md:hidden"
        onClick={() => {
          navigate(breadcrumbs[breadcrumbs.length - 2].url);
        }}
      >
        {breadcrumbs.length > 1 && (
          <ArrowLeft className="w-10 h-10 dark:invert" />
        )}
      </button>

      <div className="hidden md:flex items-center justify-center">
        {breadcrumbs.map((breadCrumb, i) => (
          <div key={"breadcrumb-" + i}>
            <span className="mx-1">/</span>
            <button
              className={
                "mx-1 hover:scale-105 transition-all ease-out cursor-pointer " +
                (i === breadcrumbs.length - 1 &&
                  " underline underline-offset-8 dark:decoration-orange-600 decoration-cyan-700 scale-[1.05]") +
                (i > validUntil && "  dark:text-neutral-400 text-neutral-600")
              }
              onClick={() => navigate(breadCrumb.url)}
            >
              {breadCrumb.name}
            </button>
          </div>
        ))}
      </div>
      <button
        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1"
        onClick={toggleIsDark}
      >
        <MoonIcon className="w-10 h-10 dark:hidden hover:scale-105 hover:-hue-rotate-270 hover:contrast-200 transition-all ease-out" />
        <SunIcon
          className="w-10 h-10 hidden dark:block hover:scale-105 hover:-hue-rotate-180 hover:contrast-200
         transition-all ease-out"
        />
      </button>
    </div>
  );
}

export default NavBar;
