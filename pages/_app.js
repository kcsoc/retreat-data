import "../styles/globals.css";
import "../styles/water.css";
import { withPasswordProtect } from "@storyofams/next-password-protect";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// Before: export default App;
export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(MyApp, {
      // Options go here (optional)
      loginApiUrl: "/login",
    })
  : MyApp;

// export default MyApp;
