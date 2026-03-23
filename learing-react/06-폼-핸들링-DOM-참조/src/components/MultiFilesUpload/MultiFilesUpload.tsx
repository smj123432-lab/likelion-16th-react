import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react";
import { uploadFiles, getUploadSummary } from "./api/imgbb";
import type { ImageData } from "./api/type";
import FileUploadResults from "./parts/FileUploadResults";
import FileUploadField from "./parts/FileUploadField";
import SaveButton from "./parts/SaveButton";
import S from "./MultiFilesUpload.module.css";
import NameField from "./parts/NameField";

// 미리보기 이미지의 타입 정의
export interface Preview {
  // fileRef.current가 null이 아니면 (= input DOM 요소가 마운트되어 있으면)
  // input의 값을 비워서 같은 파일을 다시 선택할 수 있게 초기화
  id: string; // 미리보기 고유 ID
  url: string; // 미리보기 URL
  file: File; // 실제 파일 객체
}

export default function MultiFilesUpload() {
  // 미리보기 이미지 목록 상태
  const [previews, setPreviews] = useState<Preview[]>([]);
  // 프리뷰 형태의 배열로 초기상태 지정
  // 업로드 완료된 이미지 정보 상태
  const [uploadedImages, setUploadedImages] = useState<ImageData[]>([]);
  // 마찬가지로 이미지데이터 배열의 형태의 배열로 초기상태 지정
  // 업로드 진행 중 상태
  const [isUploading, setIsUploading] = useState(false);
  // 업로딩의 초기는 폴스 -> 아직 올리지 않은 상태
  // 파일 입력 필드 참조
  const fileRef = useRef<HTMLInputElement>(null);
  // 파일 레프는 인풋요소가 들어가 있지 않은 상태로 상태 저장 -> 화면이 바뀌어도 유지
  // 초기 상태 관리 부분

  // 파일 선택 시 호출되는 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    // e.target: 이벤트가 발생한 input 요소
    // files: input에서 사용자가 선택한 파일들 (FileList 형태)
    if (!files) return;
    // 올린 파일이 없으면 이벤트 종료

    // 선택된 파일들을 미리보기 객체로 변환
    const newPreviews = Array.from(files).map((file) => ({
      // 파일들을 배열로 만들고
      id: crypto.randomUUID(), // 고유 ID 생성
      url: URL.createObjectURL(file), // 브라우저 메모리에 객체 URL 생성
      // 선택한 파일을 브라우저 메모리에 올려서 임시 URL 생성
      // → "blob:http://localhost:3000/..." 형태
      // → <img src={url} />에 넣으면 서버 없이 미리보기 표시 가능
      // -> 즉, 파일만 올려도 브라우저에서 알아서 임시 url을 생성해서 미리보기 표시 해줌(브라우저 제공 함수)
      file, // 원본 파일
      // [id: 랜덤 아이디 값, url: 보충 필요, file: 원본 파일]
    }));

    // 기존 미리보기에 새 미리보기 추가
    setPreviews((prev) => [...prev, ...newPreviews]);
    // 파일 입력 필드 초기화
    if (fileRef.current) fileRef.current.value = "";
    // fileRef.current가 null이 아니면 (= input DOM 요소가 마운트되어 있으면)
    // -> 인풋의 값을 다시 비우고(null) 파일을 다시 선택할 수 있도록 함
    // 파일 선택 시 인풋에 파일 정보가 남아있기 때문에 체인지 이벤트 발생 x
    // 초기화 해줘야 다시 선택 가능
  };

  // 미리보기 삭제 핸들러
  const handleDeletePreview = (id: string, url: string) => {
    // 프리뷰의 인자에 들어갈 아이디 값과 url은 문자열로 정함
    // 브라우저 메모리에서 객체 URL 해제 (메모리 누수 방지)
    URL.revokeObjectURL(url);
    // ID에 해당하는 미리보기 제거
    // React가 아니라 JavaScript(브라우저)가 제공하는 함수
    // createObjectURL로 만든 임시 URL을 메모리에서 해제
    // 안 하면 브라우저 메모리가 계속 쌓임 (메모리 누수)
    setPreviews((prev) => prev.filter((p) => p.id !== id));
    // 전체 previews 중 삭제할 id와 다른 것만 남김
    // = 삭제할 항목만 제외하고 나머지는 그대로 유지
  };

  // 폼 제출 및 파일 업로드 핸들러
  const handleUploadSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    // 업로드는 비동기로 처리
    e.preventDefault();
    // 새로고침 방지

    // 업로드할 파일이 없으면 경고
    if (previews.length === 0) return alert("업로드할 파일을 선택하세요.");
    // 업로드할 파일이 없다면 경고

    try {
      // 업로드 시작 상태 설정
      setIsUploading(true);
      // 서브밋을 했는데 위에 if에 걸리지 않으면 파일이 올라가고
      // 업로드 상태로 바꿈

      // 미리보기에서 실제 파일 객체만 추출
      const fileList = previews.map((preview) => preview.file);
      // previews 배열에서 file 값만 추출해서 새 배열 생성
      // Preview 객체 배열 → File 배열로 변환
      // API에 보낼 실제 파일만 필요하기 때문
      const results = await uploadFiles(fileList);
      // 서버에 요청한 결과를 리절트스에 담음
      // 업로드 결과 요약 정보 가져오기
      const summary = getUploadSummary(results);

      // 성공적으로 업로드된 파일이 있는 경우
      if (summary.successCount > 0) {
        // 업로드된 이미지 정보 상태 업데이트
        setUploadedImages(summary.successData);
        // 모든 미리보기 URL 해제 (메모리 정리)
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        // 미리보기 목록 초기화
        setPreviews([]);
        // 초기화 후 셋프리뷰을 빈배열로 바꿈
        console.log(`${summary.successCount}개의 파일 업로드 성공!`);
      }

      // 업로드 실패한 파일이 있는 경우
      if (summary.failCount > 0) {
        console.warn(`${summary.failCount}개의 파일 업로드에 실패했습니다.`);
      }
    } catch (error) {
      // 전체 업로드 프로세스 오류 처리
      console.error(error);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      // 업로드 상태 종료 (성공/실패 상관없이)
      setIsUploading(false);
    }
  };

  // 저장 버튼 비활성화 여부
  const isDisabled = previews.length === 0;
  // previews가 없으면(length === 0) → true → 버튼 비활성화
  // previews가 있으면(length > 0)  → false → 버튼 활성화

  return (
    <section className={S.card}>
      <h2 className={S.title}>갤러리 설정</h2>
      <form onSubmit={handleUploadSubmit} className={S.form}>
        <NameField />
        <FileUploadField
          ref={fileRef}
          previews={previews}
          onFileChange={handleFileChange}
          onDeleteFile={handleDeletePreview}
        />
        <SaveButton isUploading={isUploading} isDisabled={isDisabled} />
      </form>

      <FileUploadResults uploadedImages={uploadedImages} />
    </section>
  );
}
