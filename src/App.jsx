import { useEffect, useState } from "react";
import MainComponent from "./components/MainComponent";

const THEME_KEY = "todo-key-theme";

const DARKTHEMECOLOR = {
  bg: "bg-gray-900",
  textcl: "text-gray-200",
};

const LIGHTTHEMECOLOR = {
  bg: "white",
  textcl: "text-gray-800",
};

function App() {
  const [theme, setTheme] = useState(
    localStorage?.getItem(THEME_KEY) ?? "light",
  );

  const isDark = () => theme === "dark";


  function changeTheme() {
    if (isDark()) {
      localStorage.setItem(THEME_KEY,'light');
      setTheme('light')
      return
    }
    localStorage.setItem(THEME_KEY,'dark');
    setTheme('dark')
    return;
  }

  useEffect(() => {
    function initSetup() {
      if (localStorage?.getItem(THEME_KEY)) {
        localStorage.setItem(THEME_KEY, "light");
        setTheme("light");
        return;
      }
      setTheme(localStorage?.getItem(THEME_KEY));
      return;
    }

    initSetup();
  }, []);

  return (
    <div
      className={`w-full h-screen absolute left-0 top-0 ${theme === "dark" ? `${DARKTHEMECOLOR?.bg} ${DARKTHEMECOLOR?.textcl}` : `${LIGHTTHEMECOLOR?.bg} ${LIGHTTHEMECOLOR?.textcl}`}`}
    >
      <header className=" w-full flex items-center justify-between py-5 h-13">
        <div className="flex items-center justify-center pl-2">
          <h4 className="text-sm font-black">
            {"Setup your day".toUpperCase()}
          </h4>
        </div>
        <div className="pr-2 cursor-pointer" title={!isDark() ? 'dark' : 'light'} 
        onClick={()=>changeTheme()}
        >
          {!isDark() ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-brightness-down"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M12 5l0 .01" />
              <path d="M17 7l0 .01" />
              <path d="M19 12l0 .01" />
              <path d="M17 17l0 .01" />
              <path d="M12 19l0 .01" />
              <path d="M7 17l0 .01" />
              <path d="M5 12l0 .01" />
              <path d="M7 7l0 .01" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-sun-off"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 3l18 18" />
              <path d="M16 12a4 4 0 0 0 -4 -4m-2.834 1.177a4 4 0 0 0 5.66 5.654" />
              <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
            </svg>
          )}
        </div>
      </header>


    <MainComponent />
    </div>
  );
}

export default App;
