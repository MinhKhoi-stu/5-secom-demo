import {MenuDto} from "dto/menu/menu-login.dto";
import axiosClient from "utils/axios-client";

export const menuAPI = {
    menuLogin() : Promise<MenuDto> {
        return axiosClient.get("menu/login");
    },
}