import { useMemo } from "react";
import {
  CATEGORY_PARAM,
  SELECTED_DATE_PARAM,
  SERVICE_PARAM,
  SERVICE_QUERY_PARAM,
} from "../@constants/searchParams";
import { useSearchParams } from "react-router";

export const useSearchParamsList = () => {
  const [searchParam] = useSearchParams();

  const params = useMemo(
    () => ({
      [SELECTED_DATE_PARAM]: searchParam.get(SELECTED_DATE_PARAM) ?? undefined,
      [CATEGORY_PARAM]: searchParam.get(CATEGORY_PARAM) ?? undefined,
      [SERVICE_PARAM]: searchParam.get(SERVICE_PARAM) ?? undefined,
      [SERVICE_QUERY_PARAM]: searchParam.get(SERVICE_QUERY_PARAM) ?? undefined,
    }),
    [searchParam],
  );

  return params;
};
