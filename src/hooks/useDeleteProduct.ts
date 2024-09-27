import { useMutation } from "@tanstack/react-query";
import { remove } from "../api/Requests";
import { DELETE_PRODUCT_KEY } from "../constants/QueryKeys";
import { Product } from "../types";

export const useDeleteProduct = () =>
  useMutation({
    mutationKey: [DELETE_PRODUCT_KEY],
    mutationFn: (productId: string) => remove<Product>("products", productId),
  });
