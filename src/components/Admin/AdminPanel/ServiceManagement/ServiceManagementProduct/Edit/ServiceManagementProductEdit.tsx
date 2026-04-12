/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Services } from "../../../../../../@types/services.type";
import Confirm from "/Confirm.svg";
import Cancel from "/Cancel.svg";
import Delete from "/Delete.svg";
import { useServicesContext } from "../../../../../../@context/servicesContext";
import { useNotificationContext } from "../../../../../../@context/notificationContent";
import { produce } from "immer";
import { useMutation } from "@tanstack/react-query";
import {
  deleteService,
  updateService,
} from "../../../../../../@api/services.api";
import ButtonServices from "../../../../../../@ui/ServicesManagement/ButtonServices";
import InputServicesString from "../../../../../../@ui/ServicesManagement/Inputs/InputServicesString";
import InputServicesFile from "../../../../../../@ui/ServicesManagement/Inputs/InputServicesFile";
import OptionsMultiple from "../../../../../../@ui/ServicesManagement/Inputs/Option/OptionsMultiple/OptionsMultiple";
import OptionsSingle from "../../../../../../@ui/ServicesManagement/Inputs/Option/OptionsSingle/OptionsSingle";
import InputServiceTime from "../../../../../../@ui/ServicesManagement/Inputs/InputServiceTime";
import Masters from "../../../../../../@ui/ServicesManagement/Inputs/Masters/Masters";

type ServicesData = Omit<Services, "_id" | "image">;

type Props = {
  product: Services;
  storage: (ServicesData & { image: File | null }) | null;
  onClickEdit: () => void;
  onChangeStorage: (
    newItem: (Omit<Services, "_id" | "image"> & { image: File | null }) | null,
  ) => void;
};

const INPUT_TEXT: ["name" | "category", string][] = [
  ["name", "Nazwa"],
  ["category", "Kategoria"],
];

const ServiceManagementProductEdit = ({
  product,
  storage,
  onClickEdit,
  onChangeStorage,
}: Props) => {
  const { addNewNotification } = useNotificationContext();
  const { updateServiceInCache, deleteServicesFromCache } =
    useServicesContext();

  const [isChecked, setIsChecked] = useState(product.options.length !== 0);

  const [form, setForm] = useState<ServicesData & { image: File | null }>({
    name: product.name,
    category: product.category,
    cost: product.cost,
    last: product.last,
    masters: product.masters,
    image: null,
    options: product.options,
  });

  const { name, options, category, cost, last, masters } = form;

  useEffect(() => {
    onChangeStorage(form);
  }, []);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "cost" ? Number(value) : value,
    }));
  };

  const handleChangeCheck = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);

    if (storage === null) return;

    const { options, cost } = storage;

    if (options.length !== 0) {
      setForm((prev) => ({
        ...prev,
        options: newIsChecked ? options : [],
        cost: newIsChecked ? cost : 0,
      }));
    }

    if (options.length === 0) {
      setForm((prev) => ({
        ...prev,
        options: newIsChecked ? ["Nowa opcja 1", "Nowa opcja 2"] : [],
        cost: newIsChecked ? [0, 0] : cost,
      }));
    }
  };

  const { mutate: mutateUpdate, isPending: updateLoading } = useMutation({
    mutationFn: async ({
      id,
      form,
    }: {
      id: number;
      form: ServicesData & { image: File | null };
    }) => await updateService(id, form),
    onSuccess: (updated: Services) => {
      updateServiceInCache(updated);
      onClickEdit();

      addNewNotification(
        "success",
        "Zmieniono treść",
        `Usługa "${updated.name}" zoztała dodana pomyślnie.`,
      );
    },
    onError: (err) => {
      console.error(err);
      addNewNotification(
        "error",
        "Wystąpił błąd",
        "Coś poszło nie tak, spróbuj ponownie",
      );
    },
    onSettled: () => {
      onChangeStorage(null);
      setIsChecked(product.options.length !== 0);
    },
  });

  const { mutate: mutateDelete, isPending: deleteLoading } = useMutation({
    mutationFn: (id: number) => deleteService(id),
    onSuccess: (_, id) => {
      deleteServicesFromCache(id);

      addNewNotification(
        "success",
        "Zmieniono treść",
        `Usługa zoztała poprawnie usunięta.`,
      );
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

  const handleClickAddOption = () => {
    setForm(
      produce((draft) => {
        draft.options.push("Nowa opcja");
        if (Array.isArray(draft.cost)) {
          draft.cost.push(0);
        }
      }),
    );
  };

  const handleClickDeleteOption = (i: number) => {
    setForm(
      produce((draft) => {
        draft.options = draft.options.filter((_, index) => index !== i);
        if (Array.isArray(draft.cost)) {
          draft.cost = draft.cost.filter((_, index) => index !== i);
        }
      }),
    );
  };

  const handleChangeOptionsValues = (
    e: ChangeEvent<HTMLInputElement>,
    name: "options" | "cost" | "masters",
    i: number,
  ) => {
    const { value } = e.target;

    setForm(
      produce((draft) => {
        if (Array.isArray(draft[name])) {
          draft[name][i] = name === "cost" ? Number(value) : value;
        }
      }),
    );
  };

  const handleClickAddMaster = () => {
    setForm(
      produce((draft) => {
        draft.masters.push("Nowy Mistrz");
      }),
    );
  };

  const handleClickCancel = () => {
    setForm(storage as ServicesData & { image: File | null });
    onChangeStorage(null);
    onClickEdit();
    setIsChecked(product.options.length !== 0);
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (options.some((el) => el.length === 0))
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Nie można zostawiać pustych pól w formularzu.",
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

    mutateUpdate({ id: product._id, form });
  };

  const handleClickDeleteMaster = (i: number) => {
    if (masters.length === 1) return;

    setForm(
      produce((draft) => {
        draft.masters = draft.masters.filter((_, index) => index !== i);
      }),
    );
  };

  const handleClickDelete = async () => {
    mutateDelete(product._id);
  };

  const handleChangeAutofill = (text: string) => {
    setForm((prev) => ({ ...prev, category: text }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    setForm((prev) => ({
      ...prev,
      image: files[0] ?? null,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <section className="midpoint:grid-cols-2 mx-1 grid gap-4">
          <div className="space-y-2">
            {INPUT_TEXT.map(([name, title]) => (
              <InputServicesString
                key={title}
                name={name}
                title={title}
                value={form[name]}
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
                onChangeCheckbox={handleChangeCheck}
              />
            ) : (
              <OptionsSingle
                cost={cost as number}
                isChecked={isChecked}
                onChangeCost={handleChangeForm}
                onChangeCheckbox={handleChangeCheck}
              />
            )}

            <InputServiceTime last={last} onChangeTime={handleChangeForm} />
          </div>
        </section>
        <section className="flex justify-end gap-2">
          <ButtonServices
            name="Delete"
            buttonType="button"
            image={Delete}
            color="#fee685"
            loading={deleteLoading}
            onClick={handleClickDelete}
            isDeleting={true}
          />
          <ButtonServices
            name="Cancel"
            buttonType="button"
            image={Cancel}
            color="#ffc9c9"
            onClick={handleClickCancel}
          />
          <ButtonServices
            name="Confirm"
            buttonType="submit"
            image={Confirm}
            loading={updateLoading}
            color="#a4f4cf"
          />
        </section>
      </form>
    </>
  );
};

export default ServiceManagementProductEdit;
