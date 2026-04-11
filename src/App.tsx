import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { lazy, Suspense, useEffect } from "react";
import Loading from "./components/Loading.tsx";
import { motion, useScroll } from "motion/react";
import usePageHeight from "./@hooks/usePageHeight.hook.ts";
import { useLocation } from "react-router";
import Notifications from "./@ui/Notifications/Notifications.tsx";
import ContextsContainer from "./@context/contextsContainer/ContextsContainer.tsx";

const Layout = lazy(() => import("./components/Layout.tsx"));

function App() {
  const { scrollYProgress } = useScroll();

  const fits = usePageHeight();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ContextsContainer>
      {fits && (
        <motion.div
          data-testid="scroll-progress-bar"
          className="fixed top-0 left-0 z-30 h-1 w-full bg-gray-200"
          style={{
            scaleX: scrollYProgress,
            originX: 0,
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      <Header />
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
      <Notifications />
      <Footer />
    </ContextsContainer>
  );
}

export default App;
