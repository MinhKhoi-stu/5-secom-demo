import { FileUploadDto } from "dto/file-upload/file-upload.dto";
import axiosClient from "utils/axios-client";

export const fileUploadAPI = {
  fileUpload(formData: FormData): Promise<FileUploadDto> {
    return axiosClient.post("file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

// export const fileUploadAPI = {
//   fileUpload(base64: string): Promise<FileUploadDto> {
//     return axiosClient.post("file/upload", { url: base64 });
//   },
// };
