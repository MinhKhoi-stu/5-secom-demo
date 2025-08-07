import { productAPI } from "api/products";
import { FindAllProductDto } from "dto/products/find-all-products.dto";
import { PagingDataDto } from "dto/common";
import { ProductDto } from "dto/products/products.dto";
import { useQuery } from "react-query";

export const QUERY_KEY = {
    FIND_ALL: "FIND_ALL_PRODUCT",
}

export const useFindAllProducts = (
  params: FindAllProductDto,
  enabled: boolean = true
) => {
  return useQuery<PagingDataDto<ProductDto>>({
    queryKey: [QUERY_KEY.FIND_ALL, params],
    queryFn: () => productAPI.findAll(params),
    enabled: enabled && !!params.optGroupCode,
    keepPreviousData: true,
    staleTime: 0,
  });
};
