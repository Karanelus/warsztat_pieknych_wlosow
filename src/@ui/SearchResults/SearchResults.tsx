import { SERVICE_QUERY_PARAM } from "@constants/searchParams";
import { useSearchParamsList } from "@hooks/useSearchParamsList.hook";
import { useUpdateSearchParams } from "@hooks/useUpdateSearchParams.hook";
import classNames from "classnames";

const SearchResults = () => {
  const { serviceQ } = useSearchParamsList();
  const updateParams = useUpdateSearchParams();

  const handleClickClearParams = () => {
    updateParams({ [SERVICE_QUERY_PARAM]: undefined });
  };

  if (!serviceQ) return null;

  return (
    <hgroup className="flex flex-col gap-y-2.5">
      <h3>Wyniki wyszukiwania po haśle: {serviceQ}</h3>
      <button
        type="button"
        onClick={handleClickClearParams}
        className={classNames(
          "w-fit rounded-md bg-black px-2 py-1 text-white",
          "duration-300 hover:bg-gray-600",
        )}
      >
        Wyczyść wyszukiwanie
      </button>
    </hgroup>
  );
};

export default SearchResults;
