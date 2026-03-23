import { useState } from "react";
import { CheckIcon, CopyIcon } from "./SvgIcon";
import type { ImageData } from "../api/type.ts";
import S from "../MultiFilesUpload.module.css";

// 복사 완료 후 아이콘을 원래대로 되돌리는 대기 시간(ms)
const COPYED_WAIT_TIME = 2000;

interface Props {
  data: ImageData;
}

export default function FileUploadResult({ data }: Props) {
  // 프롭스의 데이터를 뽑는다

  // 복사 버튼 상태 관리 (복사 완료 여부)
  const [isCopied, setIsCopied] = useState(false);
  // 초기 상태를 폴스로 지정 -> 아직 복사되지 안ㄹ음 이라는 것

  // 이미지 URL 클립보드 복사 함수
  const handleCopy = async (url: string) => {
    // 전달받은 인자 url은 스트링 값으로 써야한다
    try {
      // 클립보드에 이미지 URL 복사
      await navigator.clipboard.writeText(url);
      // 클립보드 텍스트 복사
      setIsCopied(true);
      // 복사 완료 상태로 변경
      setTimeout(() => setIsCopied(false), COPYED_WAIT_TIME);
      // 특정 시간이 지나면 복사 상태 초기화
    } catch (error) {
      console.error("클립보드 복사 실패", error);
    }
  };

  return (
    <div className={S.resultContent}>
      <div className={S.resultInner}>
        <img
          src={data.display_url}
          // data.display_url: 업로드된 이미지의 표시용 URL
          // 업로드 완료 후 서버에서 받은 실제 이미지 주소
          alt="업로드"
          className={S.resultImg}
          style={{ margin: 0 }}
        />

        <div className={S.urlBox}>
          <p className={S.urlLabel}>{data.title}</p>
          <div className={S.copyWrapper}>
            <code className={S.urlText}>{data.url}</code>
            {/* // data.url: 업로드된 이미지의 직접 접근 URL
                // <code> 태그: URL처럼 고정폭 텍스트를 표시할 때 사용 */}
            <button
              type="button"
              className={S.copyButton}
              onClick={() => handleCopy(data.url)}
              // 복사 버튼 클릭 시 data.url을 클립보드에 복사
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
              {/* // isCopied가 true면 체크 아이콘 표시 (복사 완료) // isCopied가
              false면 복사 아이콘 표시 (복사 전) // 2초 후 다시 CopyIcon으로
              돌아옴 */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
