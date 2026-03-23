import type { ImageData } from "../api/type";
import S from "../MultiFilesUpload.module.css";
import FileUploadResult from "./FileUploadResult";

interface Props {
  uploadedImages: ImageData[];
}

export default function FileUploadResults({ uploadedImages }: Props) {
  if (uploadedImages.length === 0) return null;
  // 업로드한 이미지가 없을 경우 화면에 아무것도 그리지 않음

  return (
    <div className={S.resultArea}>
      <h3 className={S.resultTitle}>업로드 결과 ({uploadedImages.length})</h3>
      {uploadedImages.map((image) => (
        <FileUploadResult key={image.id} data={image} />
      ))}
    </div>
  );
}
