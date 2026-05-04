import MastersIcon from "./MastersIcon";
import { useMastersContext } from "../../@context/mastersContext";
import Loading from "../Loading";
import { Activity } from "react";

const Masters = () => {
  const { masters, mastersLoading } = useMastersContext();

  return (
    <div data-testid="masters">
      <h1>Witaj naszych mistrzów</h1>
      <Activity mode={mastersLoading ? "visible" : "hidden"}>
        <Loading />
      </Activity>

      <Activity mode={mastersLoading ? "hidden" : "visible"}>
        <section className="tablet:grid-cols-3 mobile:grid-cols-2 grid grid-cols-1 gap-8">
          {masters.map((master) => (
            <MastersIcon key={master._id} master={master} />
          ))}
        </section>
      </Activity>
    </div>
  );
};

export default Masters;
