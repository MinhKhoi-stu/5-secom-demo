// ĐỊNH NGHĨA KIỂU DỮ LIỆU
export interface Order {
  customer: string;
  id: string;
  sku: string;
  orderId: string;
  date: string;
  demoImage: string;
  product: string;
  size: string;
  type: string;
  quantity: number;
  status: string;
}

export interface SKUDesign {
  sku: string;
  img: string;
  type: string;
  file: string;
  fileUrl: string;
  fulfillment: string;
  quantity: string;
  worker: string;
}
