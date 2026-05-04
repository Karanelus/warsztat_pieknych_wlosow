import { ChangeEvent, FormEvent, useState } from "react";
import { postService } from "@api/services.api";
import Confirm from "/Confirm.svg";
import Cancel from "/Cancel.svg";
import { produce } from "immer";
import { useNotificationContext } from "@context/notificationContent";
import { useServicesContext } from "@context/servicesContext";
import { useMutation } from "@tanstack/react-query";
import ButtonServices from "@ui/ServicesManagement/ButtonServices";
import InputServicesString from "@ui/ServicesManagement/Inputs/InputServicesString";
import InputServicesFile from "@ui/ServicesManagement/Inputs/InputServicesFile";
import OptionsMultiple from "@ui/ServicesManagement/Inputs/Option/OptionsMultiple/OptionsMultiple";
import OptionsSingle from "@ui/ServicesManagement/Inputs/Option/OptionsSingle/OptionsSingle";
import InputServiceTime from "@ui/ServicesManagement/Inputs/InputServiceTime";
import { useKeydown } from "@hooks/useKeydown.hook";
import Masters from "@ui/ServicesManagement/Inputs/Masters/Masters";
import DrawerContainer from "@ui/DrawerContainer";
import { Services } from "@models/services.type";

type Props = {
  isVisible: boolean;
  onClickAddNewService: () => void;
};

const INPUT_TEXT: ["name" | "category", string][] = [
  ["name", "Nazwa"],
  ["category", "Kategoria"],
];

type ServiceData = Omit<Services, "_id" | "image">;

const NewServiceAdding = ({ isVisible, onClickAddNewService }: Props) => {
  const { addServiceToCache } = useServicesContext();
  const { addNewNotification } = useNotificationContext();
  const [isChecked, setIsChecked] = useState(false);

  useKeydown("Escape", onClickAddNewService);

  const [newForm, setNewForm] = useState<ServiceData & { image: File | null }>({
    name: "",
    category: "",
    cost: 0,
    options: [],
    masters: ["Master name"],
    last: 1,
    image: null,
  });

  const { name, category, last, cost, options, masters, image } = newForm;

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewForm((prev) => ({
      ...prev,
      [name]: name === "cost" ? Number(value) : value,
    }));
  };

  const { mutate: mutateAdd, isPending: addLoading } = useMutation({
    mutationFn: (form: ServiceData & { image: File | null }) =>
      postService(form),
    onSuccess: (updated: Services) => {
      addServiceToCache(updated);

      addNewNotification(
        "added",
        "Dodano usługę",
        `Usługa "${updated.name}" zoztała poprawnie zaktualizowana.`,
      );

      onClickAddNewService();
    },
    onError: (err) => {
      console.error(err);
      addNewNotification(
        "error",
        "Wystąpił błąd",
        "Coś poszło nie tak, spróbuj ponownie",
      );
    },
  });

  const handleChangeChecked = () => {
    setIsChecked((prev) => {
      const nextChecked = !prev;

      setNewForm((prev) => ({
        ...prev,
        options: nextChecked ? ["Nowa opcja 1", "Nowa opcja 2"] : [],
        cost: nextChecked ? [0, 0] : 0,
      }));

      return nextChecked;
    });
  };

  const handleCLickCancel = () => {
    onClickAddNewService();
  };

  const handleChangeOptionsValues = (
    e: ChangeEvent<HTMLInputElement>,
    name: "options" | "cost" | "masters",
    i: number,
  ) => {
    const { value } = e.target;

    setNewForm(
      produce((draft) => {
        if (Array.isArray(draft[name])) {
          draft[name][i] = name === "cost" ? Number(value) : value;
        }
      }),
    );
  };

  const handleClickAddOption = () => {
    setNewForm(
      produce((draft) => {
        draft.options.push("Nowa opcja");
        if (Array.isArray(draft.cost)) {
          draft.cost.push(0);
        }
      }),
    );
  };

  const handleClickAddMaster = () => {
    setNewForm(
      produce((draft) => {
        draft.masters.push("Nowy Mistrz");
      }),
    );
  };

  const handleClickDeleteOption = (i: number) => {
    if (options.length === 2) return;

    setNewForm(
      produce((draft) => {
        draft.options = draft.options.filter((_, index) => index !== i);
        if (Array.isArray(draft.cost)) {
          draft.cost = draft.cost.filter((_, index) => index !== i);
        }
      }),
    );
  };

  const handleClickDeleteMaster = (i: number) => {
    if (masters.length === 1) return;

    setNewForm(
      produce((draft) => {
        draft.masters = draft.masters.filter((_, index) => index !== i);
      }),
    );
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (
      options.some((el) => el.length === 0) ||
      new Set(options).size !== options.length
    )
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Nie można zostawiać pustych pól w formularzu opcje.",
      );

    if (
      masters.some((el) => el.length === 0) ||
      new Set(masters).size !== masters.length
    )
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Nie można zostawiać pustych pól w formularzu mistrzów.",
      );

    if (name.trim() === "" || category.trim() === "")
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Nazwa albo kategoria nie mogą być puste.",
      );

    if (
      (cost as number) < 0 ||
      (Array.isArray(cost) && cost.some((el) => el < 0))
    )
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Cena nie może być niegatywną.",
      );

    if (!image)
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Musisz wybrać obrazek.",
      );

    mutateAdd(newForm);
  };

  const handleChangeFocus = (newState: boolean) => {
    setIsChecked(newState);
  };

  const handleChangeAutofill = (text: string) => {
    setNewForm((prev) => ({ ...prev, category: text }));
    handleChangeFocus(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    setNewForm((prev) => ({
      ...prev,
      image: files[0] ?? null,
    }));
  };

  return (
    <DrawerContainer isVisible={isVisible}>
      <div className="mobile:w-[max(400px,60dvw)] m-6 w-full space-y-3 rounded-2xl bg-white p-6">
        <h2>Dodawanie nowej usługi</h2>
        <form onSubmit={handleSubmitForm}>
          <section className="midpoint:grid-cols-2 mx-1 grid gap-4">
            <div className="space-y-2">
              {INPUT_TEXT.map(([name, title]) => (
                <InputServicesString
                  key={title}
                  name={name}
                  title={title}
                  value={newForm[name]}
                  onChange={handleChangeForm}
                  onChangeAutoFill={handleChangeAutofill}
                />
              ))}

              <InputServicesFile
                name="image"
                title="Obrazek"
                onChange={handleFileChange}
              />

              <Masters
                masters={masters}
                title="Mistrzowie"
                onChangeMasterName={handleChangeOptionsValues}
                onClickDeleteMaster={handleClickDeleteMaster}
                onClickAddMaster={handleClickAddMaster}
              />
            </div>
            <div className="space-y-1">
              {isChecked ? (
                <OptionsMultiple
                  options={options}
                  costs={cost as number[]}
                  isChecked={isChecked}
                  onChangeValue={handleChangeOptionsValues}
                  onClickAddOption={handleClickAddOption}
                  onClickDeleteOption={handleClickDeleteOption}
                  onChangeCheckbox={handleChangeChecked}
                />
              ) : (
                <OptionsSingle
                  cost={cost as number}
                  isChecked={isChecked}
                  onChangeCost={handleChangeForm}
                  onChangeCheckbox={handleChangeChecked}
                />
              )}
              <InputServiceTime last={last} onChangeTime={handleChangeForm} />
            </div>
          </section>
          <section className="flex justify-end gap-2">
            <ButtonServices
              name="Cancel"
              buttonType="button"
              image={Cancel}
              color="#ffc9c9"
              onClick={handleCLickCancel}
            />
            <ButtonServices
              name="Confirm"
              buttonType="submit"
              image={Confirm}
              loading={addLoading}
              color="#a4f4cf"
            />
          </section>
        </form>
      </div>
    </DrawerContainer>
  );
};

export default NewServiceAdding;
