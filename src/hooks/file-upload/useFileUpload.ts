import {fileUploadAPI} from "api/file-upload";
import {FileUploadDto} from "dto/file-upload/file-upload.dto";
import { useState, useCallback } from "react";


type UseFileUploadReturn = {
  loading: boolean;
  error: string | null;
  data: FileUploadDto | null;
  uploadFile: (file: File) => Promise<FileUploadDto | null>;
};

export function useFileUpload(): UseFileUploadReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FileUploadDto | null>(null);

  const uploadFile = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fileUploadAPI.fileUpload(formData);
      setData(res);
      return res;
    } catch (err: any) {
      setError(err?.message || "Upload failed");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, uploadFile };
}
