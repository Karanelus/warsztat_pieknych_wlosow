/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from "react";
import { getMasters } from "../@api/masters.api";
import { useQuery } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
};

const useMasters = () => {
  const {
    data: masters = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["masters"],
    queryFn: getMasters,
  });

  return {
    masters,
    mastersLoading: isPending,
    mastersError: error,
  };
};

type MastersContentProps = ReturnType<typeof useMasters>;

const MastersContext = createContext({} as MastersContentProps);

export const useMastersContext = () => {
  const context = useContext(MastersContext);

  if (!context) throw new Error("Context must be used within ServicesContext");

  return context;
};

export const MastersContextContainer = ({ children }: Props) => {
  const value = useMasters();

  return (
    <MastersContext.Provider value={value}>{children}</MastersContext.Provider>
  );
};
