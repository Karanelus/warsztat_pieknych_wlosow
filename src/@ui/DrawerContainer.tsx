import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  isVisible: boolean;
  children: ReactNode;
};

const newServiceVariants: Variants = {
  initial: { opacity: 0, scale: 1.05 },
  exit: { opacity: 0, scale: 1.05 },
  animate: { opacity: 1, scale: 1 },
};

const DrawerContainer = ({ isVisible, children }: Props) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          variants={newServiceVariants}
          initial="initial"
          exit="exit"
          animate="animate"
          transition={{
            duration: 0.3,
          }}
          className="module"
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default DrawerContainer;
