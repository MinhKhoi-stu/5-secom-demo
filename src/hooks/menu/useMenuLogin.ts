import { useQuery } from "react-query";
import { menuAPI } from "api/menu"; 
import {MenuDto} from "dto/menu/menu-login.dto";

export function useMenuLogin() {
  return useQuery<MenuDto>(
    ["MENU_LOGIN"],
    () => menuAPI.menuLogin(),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 1,
    }
  );
}
