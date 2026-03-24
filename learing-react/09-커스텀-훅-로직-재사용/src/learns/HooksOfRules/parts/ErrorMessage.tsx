import { memo } from "react";
import S from "../style.module.css";

interface Props {
  isError: boolean;
  // 이즈 에러는 논리값의 형태로 받는다
}

export default memo(function ErrorMessage({ isError = false }: Props) {
  // 에러메세지는 기억해놓는다?
  // 부모 컴포넌트가 바뀌어도 이제 에러의 값이 바뀌지 않으면 에러메세지는 그대로 있음
  if (!isError) return null;

  return (
    <div role="alert" className={S.alert}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>{" "}
      현재 에러 상태가 활성화되었습니다!
    </div>
  );
});
