import { useState, version } from "react";
import S from "./style.module.css";
import UserForm from "./UserForm";

// 컴포넌트 인스턴스는 key를 기반으로 갱신되고 재사용됩니다.
// 인스턴스 = 설계도를 기반으로 생성된 객체
// 갱신 = 업데이트

export default function StateInitialization() {
  const [version, setVersion] = useState(0);
  return (
    <div className={S.container}>
      <header className={S.header}>
        <h2>회원가입 (버전: {version})</h2>
        <button
          type="button"
          className={S.resetButton}
          onClick={() => setVersion(version + 1)}
        >
          폼 초기화
        </button>
      </header>

      <UserForm key={version} />
    </div>
  );
}
