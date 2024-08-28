import { AxiosError } from "axios";
import { axios } from "./AxiosConfig";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const throwException = (e: any) => {
  let errorMessage = e.message;
  if (e instanceof AxiosError) errorMessage = e.response?.data;
  throw new Error(errorMessage);
};

export const getAll = async <T>(endpoint: string): Promise<T[]> => {
  try {
    const response = await axios.get<T[]>(endpoint);
    return response.data;
  } catch (e) {
    return throwException(e);
  }
};

export const getOne = async <T>(
  endpoint: string,
  itemId: string
): Promise<T> => {
  try {
    const response = await axios.get<T>(`${endpoint}/${itemId}`);
    return response.data;
  } catch (e) {
    return throwException(e);
  }
};

export const create = async <T>(endpoint: string, item: T): Promise<T> => {
  try {
    const response = await axios.post<T>(endpoint, item);
    return response.data;
  } catch (e) {
    return throwException(e);
  }
};

export const remove = async <T>(
  endpoint: string,
  itemId: string
): Promise<T> => {
  try {
    const response = await axios.delete<T>(`${endpoint}/${itemId}`);
    return response.data;
  } catch (e) {
    return throwException(e);
  }
};

export const update = async <T>(endpoint: string, item: T): Promise<T> => {
  try {
    const response = await axios.put<T>(endpoint, item);
    return response.data;
  } catch (e) {
    return throwException(e);
  }
};
