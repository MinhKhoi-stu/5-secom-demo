import {newOrderData,TopUserDesignData,CountOrders} from "../../../data";
import {useState} from "react";
import { newOrders, TopFile, TotalOrders } from "types/OrderTable";

export const useDashboardData = () => {


  const getStatusColor = (status: string) => {
  if (status.includes("Đợi") || status.includes("Đang")) return "gray";
  if (status.includes("cần") || status.includes("Cần")) return "orange";
  if (status.includes("Đã")) return "green";
  return "gray";
};

  const [valueDay, setValueDay] = useState("");
  const [valueBill, setValueBill] = useState("");
  const [value, setValue] = useState("30");

  const revenue = "$3,201,350";
  const orders: newOrders[] = newOrderData;
  const files: TopFile[] = TopUserDesignData;
  const counts: TotalOrders[] = CountOrders;

  return { revenue, orders, files, counts, valueDay, setValueDay, valueBill, setValueBill, value, setValue, getStatusColor };
};
