import type {
  FakeUser,
  newOrders,
  Order,
  OrdersShipList,
  orderStatus,
  ProductList,
  ShippedOrders,
  SKUDesign,
  TopFile,
  TotalOrders,
} from "../types/OrderTable";

//DATA CHO MAINFULFILLMENT + DATA 2D
export const mockOrders: Order[] = [
  {
    customer: "Tao",
    id: "1",
    sku: "E7212",
    orderId: "3692333075",
    date: "20/5/2025",
    demoImage: "/img/demo/2D.png",
    product: "Patches thêu",
    size: "3 inches",
    type: "3 inches",
    quantity: 1,
    status: "Khách đã gửi hình",
  },
  {
    customer: "Tớ",

    id: "2",
    sku: "E7212",
    orderId: "1234567890",
    date: "20/5/2025",
    demoImage: "/img/flag/VietNamflag.jpg",
    product: "Patches thêu",
    size: "3 inches",
    type: "3 inches",
    quantity: 1,
    status: "Khách đã gửi hình",
  },
  {
    customer: "Mình",

    id: "3",
    sku: "E7212",
    orderId: "3692333075",
    date: "20/5/2025",
    demoImage: "/img/demo/2D.png",
    product: "Patches thêu",
    size: "3 inches",
    type: "3 inches",
    quantity: 1,
    status: "Khách đã gửi hình",
  },
  {
    customer: "",

    id: "4",
    sku: "E7212",
    orderId: "3692333075",
    date: "20/5/2025",
    demoImage: "/img/demo/2D.png",
    product: "Patches thêu",
    size: "3 inches",
    type: "3 inches",
    quantity: 1,
    status: "Khách đã gửi hình",
  },
  {
    customer: "",

    id: "5",
    sku: "E7212",
    orderId: "3692333075",
    date: "20/5/2025",
    demoImage: "/img/demo/2D.png",
    product: "Patches thêu",
    size: "3 inches",
    type: "3 inches",
    quantity: 1,
    status: "Khách đã gửi hình",
  },
  {
    customer: "",

    id: "6",
    sku: "E7212",
    orderId: "3692333075",
    date: "20/5/2025",
    demoImage: "/img/demo/2D.png",
    product: "Patches thêu",
    size: "3 inches",
    type: "3 inches",
    quantity: 1,
    status: "Khách đã gửi hình",
  },
  {
    customer: "",

    id: "7",
    sku: "E7212",
    orderId: "3692333075",
    date: "20/5/2025",
    demoImage: "/img/demo/2D.png",
    product: "Patches thêu",
    size: "3 inches",
    type: "3 inches",
    quantity: 1,
    status: "Khách đã gửi hình",
  },
  {
    customer: "",

    id: "8",
    sku: "E7212",
    orderId: "3692333075",
    date: "20/5/2025",
    demoImage: "/img/demo/2D.png",
    product: "Patches thêu",
    size: "3 inches",
    type: "3 inches",
    quantity: 1,
    status: "Khách đã gửi hình",
  },
  {
    customer: "",

    id: "9",
    sku: "E7212",
    orderId: "3692333075",
    date: "20/5/2025",
    demoImage: "/img/demo/2D.png",
    product: "Patches thêu",
    size: "3 inches",
    type: "3 inches",
    quantity: 1,
    status: "Khách đã gửi hình",
  },
  {
    customer: "",

    id: "10",
    sku: "E7212",
    orderId: "3692333075",
    date: "20/5/2025",
    demoImage: "/img/demo/2D.png",
    product: "Patches thêu",
    size: "3 inches",
    type: "3 inches",
    quantity: 1,
    status: "Khách đã gửi hình",
  },
];

//ĐƠN HÀNG MỚI CẬP NHẬT ADMINDASHBOARD
export const newOrderData: newOrders[] = [
  {
    sku: "E00000",
    orderId: "3692333075",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đợi khách gửi hình",
  },
  {
    sku: "E7213",
    orderId: "3636855560",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đợi khách gửi hình",
  },
  {
    sku: "E7214",
    orderId: "3683805200",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đang đợi khách duyệt 2D",
  },
  {
    sku: "E7216",
    orderId: "3684236956",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đang vẽ file thêu",
  },
  {
    sku: "E7218",
    orderId: "3684321262",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đang vẽ file thêu",
  },
  {
    sku: "EB162",
    orderId: "3684479986",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Cần cắt laser",
  },
  {
    sku: "EB153",
    orderId: "3683950859",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đang sản xuất thêu",
  },
  {
    sku: "AMZ503",
    orderId: "3684588370",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đã đóng gói",
  },
  {
    sku: "AMZ504",
    orderId: "3693659045",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đã ship ngày 22/05/2025",
  },
  {
    sku: "AMZ505",
    orderId: "3685099534",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đã có hình",
    // isError: true,
  },
];

// DATA SKU DESIGN
export const SKUDesignData: SKUDesign[] = [
  {
    sku: "PAT-D020824-1-4",
    img: "/logo.png",
    type: "Áo thêu",
    file: "Link File",
    fileUrl: "https://dientoan.vn/",
    fulfillment: "Sản xuất tại VN",
    quantity: "1 tỷ",
    worker: "Hồng Nhung",
  },
  {
    sku: "PAT-D020924-1-4",
    img: "/react.svg",
    type: "Patches",
    file: "Link File",
    fileUrl: "https://dientoan.vn/",
    fulfillment: "Kho USA",
    quantity: "50",
    worker: "Thùy Vân",
  },
  {
    sku: "PAT-D020824-1-4",
    img: "/logo.png",
    type: "Áo thêu",
    file: "Link File",
    fileUrl: "https://dientoan.vn/",
    fulfillment: "Sản xuất tại VN",
    quantity: "1 tỷ",
    worker: "Hồng Nhung",
  },
  {
    sku: "PAT-D020924-1-4",
    img: "/react.svg",
    type: "Patches",
    file: "Link File",
    fileUrl: "https://dientoan.vn/",
    fulfillment: "Kho USA",
    quantity: "50",
    worker: "Thùy Vân",
  },
  {
    sku: "PAT-D020824-1-4",
    img: "/logo.png",
    type: "Áo thêu",
    file: "Link File",
    fileUrl: "https://dientoan.vn/",
    fulfillment: "Sản xuất tại VN",
    quantity: "1 tỷ",
    worker: "Hồng Nhung",
  },
  {
    sku: "PAT-D020924-1-4",
    img: "/react.svg",
    type: "Patches",
    file: "Link File",
    fileUrl: "https://dientoan.vn/",
    fulfillment: "Kho USA",
    quantity: "50",
    worker: "Thùy Vân",
  },
];

//DATA TOP FILE THÊU
export const TopUserDesignData: TopFile[] = [
  {
    id: "11",
    name: "Hoàng Chiêm",
    email: "hoangchiem@5se.com",
    img: "/img/demo/2D.png",
    files: 250,
  },
  {
    id: "12",
    name: "Hồng Nhung",
    email: "hongnhung@5se.com",
    img: "/img/demo/2D.png",
    files: 200,
  },
  {
    id: "13",
    name: "Việt Út",
    email: "vietut@5se.com",
    img: "/img/demo/2D.png",
    files: 190,
  },
  {
    id: "14",
    name: "Thùy Vân",
    email: "thuyvan@5se.com",
    img: "/img/demo/2D.png",
    files: 175,
  },
  {
    id: "15",
    name: "Hoàng Dzung",
    email: "hoangdzung@5se.com",
    img: "/img/demo/2D.png",
    files: 150,
  },
  {
    id: "16",
    name: "Thùy Vi",
    email: "thuyvi@5se.com",
    img: "/img/demo/2D.png",
    files: 135,
  },
  {
    id: "17",
    name: "Hương Sài Gòn",
    email: "huongsg@5se.com",
    img: "/img/demo/2D.png",
    files: 130,
  },
];

//DATA TỔNG ĐƠN HÀNG ADMINDASHBOEARD
export const CountOrders: TotalOrders[] = [
  {
    id: "18",
    name: "CustomPatchesTX",
    img: "/img/demo/2D.png",
    count: 86,
  },
  {
    id: "19",
    name: "TexasGiftsbyThi",
    img: "/img/demo/2D.png",
    count: 55,
  },
  {
    id: "20",
    name: "HomeGiftsTX",
    img: "/img/demo/2D.png",
    count: 50,
  },
  {
    id: "21",
    name: "5SECOM",
    img: "/img/demo/2D.png",
    count: 50,
  },
  {
    id: "22",
    name: "EcomplusTX",
    img: "/img/demo/2D.png",
    count: 40,
  },
];

//CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG FULFILLMENT
export const orderStatusData: orderStatus[] = [
  // { label: "Mới cập nhật", count: 120, color: "#f8b500" },
  // { label: "Chưa có hình", count: 55, color: "#f48fb1" },
  // { label: "Đang vẽ 2D", count: 24, color: "#ce93d8" },
  // { label: "Đang vẽ thêu", count: 85, color: "#90caf9" },
  // { label: "Đang cắt laser", count: 43, color: "#a5d6a7" },
  // { label: "Đang sản xuất", count: 57, color: "#81c784" },
  // { label: "Đang đóng gói", count: 94, color: "#aed581" },
  { label: "Mới cập nhật", count: 130, color: "#FF6B6B" },
  { label: "Chưa có hình", count: 55, color: "	#FFA987" },
  { label: "Đang vẽ 2D", count: 24, color: "	#FFD97D" },
  { label: "Đang vẽ thêu", count: 85, color: "#A8E6CF" },
  { label: "Đang cắt laser", count: 43, color: "#56C6A9" },
  { label: "Đang sản xuất", count: 57, color: "	#89CFFD" },
  { label: "Đang đóng gói", count: 94, color: "#CDB4DB" },
];

//ORDER ĐÃ SHIP CẦN MUA TRACKING
export const shippedData: ShippedOrders[] = [
  {
    shipDate: "20/05/2025",
    orderCount: 100,
    trackingSample: "1ZW4090W0494xxxxxx",
  },
  {
    shipDate: "22/05/2025",
    orderCount: 150,
    trackingSample: "1ZW4090W0494yyyyyy",
  },
  {
    shipDate: "23/05/2025",
    orderCount: 200,
    trackingSample: "1ZW4090W0494zzzzz",
  },
  {
    shipDate: "24/05/2025",
    orderCount: 250,
    trackingSample: "1ZW4090W0494abcde",
  },
];

//TRACKING ĐÃ MUA GẦN NHẤT
export const recentTrackings = Array.from({ length: 12 }).map((_, i) => ({
  shipDate: "10/05/2025",
  orderCount: 148,
}));

//DANH SACH ORDER SHIP NGÀY [] ORDER DETAIL
export const shipListData : OrdersShipList[] = [
  {
    sku: "E7541",
    orderNumber: "3432581692",
  },
  {
    sku: "A1287",
    orderNumber: "1234567890",
  },
  {
    sku: "B9543",
    orderNumber: "7890123456",
  },
  {
    sku: "E7541",
    orderNumber: "3432581692",
  },
  {
    sku: "A1287",
    orderNumber: "1234567890",
  },
  {
    sku: "B9543",
    orderNumber: "7890123456",
  },
  {
    sku: "E7541",
    orderNumber: "3432581692",
  },
  {
    sku: "A1287",
    orderNumber: "1234567890",
  },
  {
    sku: "B9543",
    orderNumber: "7890123456",
  },
  {
    sku: "E7541",
    orderNumber: "3432581692",
  },
  {
    sku: "A1287",
    orderNumber: "1234567890",
  },
  {
    sku: "B9543",
    orderNumber: "7890123456",
  },
  {
    sku: "E7541",
    orderNumber: "3432581692",
  },
  {
    sku: "A1287",
    orderNumber: "1234567890",
  },
  {
    sku: "B9543",
    orderNumber: "7890123456",
  },
  {
    sku: "E7541",
    orderNumber: "3432581692",
  },
  {
    sku: "A1287",
    orderNumber: "1234567890",
  },
  {
    sku: "B9543",
    orderNumber: "7890123456",
  },
  {
    sku: "E7541",
    orderNumber: "3432581692",
  },
  {
    sku: "A1287",
    orderNumber: "1234567890",
  },
  {
    sku: "B9543",
    orderNumber: "7890123456",
  },
  {
    sku: "E7541",
    orderNumber: "3432581692",
  },
  {
    sku: "A1287",
    orderNumber: "1234567890",
  },
  {
    sku: "B9543",
    orderNumber: "7890123456",
  },
];

//DANH SÁCH USER GIẢ
export const userData : FakeUser[] = Array.from({ length: 18 }).map((_, i) => ({
  name: "Trần Chiêm",
  email: "tranchiem@secom.com",
  phone: "12345678910JQk",
  avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 10}.jpg`,
}));

//TAB
export const TabLabels: string[] = [
  "Tất cả",
  "Admin",
  "Vẽ 2D",
  "Vẽ File Thêu",
  "Sản Xuất",
  "Đóng gói",
  "Shipping",
];

//DANH SÁCH SẢN PHẨM
export const productData : ProductList[] = [
  { name: "Patches Thêu", img: "/img/flag/VietNamflag.jpg" },
  { name: "Áo Thêu", img: "/img/flag/VietNamflag.jpg" },
  { name: "Nón thêu", img: "/img/flag/VietNamflag.jpg" },
  { name: "Lịch 2026", img: "/logo.png" },
  { name: "Led Mica", img: "/logo.png" },
  { name: "Gỗ Handmade", img: "/logo.png" },
];