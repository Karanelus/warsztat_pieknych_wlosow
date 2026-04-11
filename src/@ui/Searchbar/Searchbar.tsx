import { ChangeEvent, useState } from "react";
import Lupe from "/Lupe.svg";

type Props = {
  name: string;
  placeholder: string;
  onSubmit: (query: string) => void;
};

const Searchbar = ({ name, placeholder, onSubmit }: Props) => {
  const [searchText, setSearchText] = useState<string>("");
  const [isFocused, setFocused] = useState(false);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = () => {
    if (searchText) {
      onSubmit(searchText);
      setSearchText("");
    }
  };

  return (
    <form
      className="h-10 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className="relative h-full">
        <input
          type="text"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          name={name}
          value={searchText}
          onChange={handleChangeText}
          className="border-none bg-gray-100 px-4 py-2"
        />
        {isFocused && (
          <button
            type="submit"
            onMouseDown={handleSubmit}
            className="absolute top-1/2 right-2 aspect-square h-8 -translate-y-1/2 rounded-full bg-white p-0.5"
          >
            <img src={Lupe} className="size-full" />
          </button>
        )}
      </label>
    </form>
  );
};

export default Searchbar;
