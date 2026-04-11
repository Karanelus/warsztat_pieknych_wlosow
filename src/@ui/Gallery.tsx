/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, Transition } from "framer-motion";
import { useEffect, useState } from "react";
import ImageMain from "./ImageMain";

type Props = {
  gallery: string[];
  scrollDirection: "X" | "Y";
};

const variantX = {
  animation: {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
  },
  transition: {
    x: { type: "spring", stiffness: 250, damping: 25 },
    opacity: { duration: 0.1716 },
  },
};

const variantY = {
  animation: {
    enter: (direction: number) => {
      return {
        y: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
    center: {
      y: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: number) => {
      return {
        y: direction < 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
  },
  transition: {
    y: { type: "spring", stiffness: 250, damping: 25 },
    opacity: { duration: 0.1716 },
  },
};

const wrap = (min: number, max: number, value: number) => {
  return ((((value - min) % (max - min)) + (max - min)) % (max - min)) + min;
};

const Gallery = ({ gallery, scrollDirection }: Props) => {
  const [[image, direction], setImage] = useState([0, 0]);

  const imageIndex = wrap(0, gallery.length, image);
  const intervalDuration = Math.random() * 6000 + 2000;
  const pagination = Math.round(
    Math.random() * (gallery.length - 1) * (Math.random() < 0.5 ? -1 : 1),
  );
  const handleAutoPaginate = (newDirection: number) => {
    setImage(([prev]) => [prev + newDirection, newDirection]);
  };

  const variantsOption = scrollDirection === "X" ? variantX : variantY;

  useEffect(() => {
    const interval = setTimeout(() => {
      handleAutoPaginate(pagination);
    }, intervalDuration);

    return () => clearTimeout(interval);
  }, [pagination, image]);

  return (
    <section className="pointer-events-none relative aspect-square size-full overflow-hidden rounded-2xl">
      <AnimatePresence initial={false} custom={direction}>
        <ImageMain
          key={image}
          src={gallery[imageIndex] ?? ""}
          direction={direction}
          alt={gallery[imageIndex] ?? ""}
          variants={variantsOption.animation}
          transition={variantsOption.transition as Transition}
        />
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
