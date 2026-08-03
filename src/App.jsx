import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import PageLoader from "./components/ui/PageLoader";

function App() {
  let router = useRoutes(routes);

  return <Suspense fallback={<PageLoader />}>{router}</Suspense>;
}

export default App;
