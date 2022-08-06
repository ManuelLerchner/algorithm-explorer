import { useLocation, useNavigate } from "react-router-dom";

function NavBar({ toggleIsDark }: { toggleIsDark: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  const breadcrumbs = ("home/" + location.pathname).split("/").filter(Boolean);

  function goToRoute(breadcrumbs: string[], index: number) {
    breadcrumbs[0] = "";
    let res = breadcrumbs.splice(0, index + 1).join("/");

    navigate(res);
  }

  function formatBreadcrumbs(crumb: string) {
    let words = crumb.split("-");

    return words
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("-");
  }

  return (
    <div className="h-12 flex flex-row items-center justify-between px-16 bg-neutral-200 dark:bg-gray-800 drop-shadow-md text-2xl dark:text-white">
      <button
        className="md:hidden"
        onClick={() => goToRoute(breadcrumbs, breadcrumbs.length - 2)}
      >
        {breadcrumbs.length > 1 && "Back"}
      </button>

      <div className="hidden md:flex items-center justify-center">
        {breadcrumbs.map((name, i) => (
          <div key={"breadcrumb-" + i}>
            <span className="mx-1">/</span>
            <button
              className={
                "mx-1 hover:scale-105 transition-all ease-out cursor-pointer " +
                (i === breadcrumbs.length - 1
                  ? " underline underline-offset-8 dark:decoration-orange-600 decoration-cyan-700 scale-[1.05]"
                  : "")
              }
              onClick={() => goToRoute(breadcrumbs, i)}
            >
              {formatBreadcrumbs(name)}
            </button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={toggleIsDark}>Toggle light & dark</button>
      </div>
    </div>
  );
}

export default NavBar;
