// utils/fileUtils.ts

export interface ImageValidationOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Chuyển đổi file thành base64 string
 * @param file File cần chuyển đổi
 * @returns Promise<string> Base64 string
 */
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Chuyển đổi file thành base64 string (chỉ phần base64, không có prefix)
 * @param file File cần chuyển đổi
 * @returns Promise<string> Pure base64 string
 */
export const convertFileToPureBase64 = async (file: File): Promise<string> => {
  const base64WithPrefix = await convertFileToBase64(file);
  // Tách phần base64 ra khỏi prefix "data:image/jpeg;base64,"
  const base64 = base64WithPrefix.split(',')[1];
  return base64;
};

/**
 * Validate file ảnh
 * @param file File cần validate
 * @param options Tùy chọn validate
 * @returns FileValidationResult
 */
export const validateImageFile = (
  file: File,
  options: ImageValidationOptions = {}
): FileValidationResult => {
  const {
    maxSizeInMB = 5,
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  } = options;

  // Kiểm tra loại file
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Vui lòng chọn file hình ảnh hợp lệ (${allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')})`
    };
  }

  // Kiểm tra kích thước file
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return {
      isValid: false,
      error: `Kích thước file không được vượt quá ${maxSizeInMB}MB`
    };
  }

  return { isValid: true };
};

/**
 * Xử lý upload ảnh với validation và chuyển đổi base64
 * @param file File cần xử lý
 * @param options Tùy chọn validate
 * @param includePureBase64 Có trả về pure base64 không (mặc định false)
 * @returns Promise với kết quả xử lý
 */
export const processImageUpload = async (
  file: File,
  options: ImageValidationOptions = {},
  includePureBase64: boolean = false
): Promise<{
  success: true;
  data: {
    base64: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    pureBase64?: string;
  };
} | {
  success: false;
  error: string;
  data?: undefined;
}> => {
  try {
    // Validate file
    const validation = validateImageFile(file, options);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Chuyển đổi thành base64
    const base64WithPrefix = await convertFileToBase64(file);
    
    const result = {
      base64: base64WithPrefix,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      pureBase64: includePureBase64 ? base64WithPrefix.split(',')[1] : undefined
    };

    return { success: true, data: result };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra khi xử lý ảnh',
      data: undefined
    };
  }
};

/**
 * Format file size thành string dễ đọc
 * @param bytes Kích thước file (bytes)
 * @returns string Kích thước đã format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Tạo preview URL cho file
 * @param file File cần tạo preview
 * @returns string URL preview
 */
export const createFilePreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Giải phóng preview URL
 * @param url URL cần giải phóng
 */
export const revokeFilePreviewUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};