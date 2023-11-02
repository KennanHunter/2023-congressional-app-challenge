import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="grid h-full" style={{ gridTemplateRows: "auto 1fr" }}>
      <header>
        <nav className="flex border-gray-200 bg-gray-900 px-4 py-4 lg:px-6">
          <a href="/">
            <h1 className=" text-white">BHSS Coffee Shop Ordering Software</h1>
          </a>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);
