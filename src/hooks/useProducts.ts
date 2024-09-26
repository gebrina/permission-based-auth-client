import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/Requests";
import { GET_ALL_PRODUCTS_KEY } from "../constants/QueryKeys";
import { Product } from "../types";

export const useProducts = () =>
  useQuery({
    queryKey: [GET_ALL_PRODUCTS_KEY],
    queryFn: () => getAll<Product>("products"),
  });
