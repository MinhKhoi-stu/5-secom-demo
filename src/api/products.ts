import {PagingDataDto} from "dto/common";
import {FindAllProductDto} from "dto/products/find-all-products.dto";
import {ProductDto} from "dto/products/products.dto";
import axiosClient from "utils/axios-client";

export const productAPI = {
    //find optGroupCode
    findAll(
        findAllProductDto: FindAllProductDto
    ): Promise<PagingDataDto<ProductDto>> {
        return axiosClient.get(`option/find`, {params: findAllProductDto});
    },
}