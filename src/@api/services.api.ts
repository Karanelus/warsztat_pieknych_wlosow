import axios from "axios";
import { Services } from "../@types/services.type";

const baseUrl = import.meta.env.VITE_API_URL + "api/services";

type ServiceAPI = Omit<Services, "_id" | "image"> & { image: File | null };

export const getServices = async (query: string | undefined) => {
  const res = await axios.get<Services[]>(baseUrl, { params: { q: query } });

  return res.data;
};

export const postService = async (newService: ServiceAPI) => {
  const formData = new FormData();

  formData.append("name", newService.name);
  formData.append("category", newService.category);
  formData.append("masters", JSON.stringify(newService.masters));
  formData.append("last", JSON.stringify(newService.last));
  formData.append("options", JSON.stringify(newService.options));
  formData.append("cost", JSON.stringify(newService.cost));

  formData.append("image", newService?.image ?? "");

  const res = await axios.post<Services>(baseUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateService = async (id: number, newService: ServiceAPI) => {
  const formData = new FormData();

  formData.append("name", newService.name);
  formData.append("category", newService.category);
  formData.append("masters", JSON.stringify(newService.masters));
  formData.append("last", JSON.stringify(newService.last));
  formData.append("options", JSON.stringify(newService.options));
  formData.append("cost", JSON.stringify(newService.cost));

  if (newService.image) {
    formData.append("image", newService.image); // ⬅ MUST MATCH multer.single('image')
  }

  const res = await axios.put<Services>(baseUrl + `/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteService = async (id: number) => {
  const res = await axios.delete<Services[]>(baseUrl + `/${id}`, {
    method: "DELETE",
  });

  return res.data;
};
