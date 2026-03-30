import { useAuth } from "@/contexts";
import S from "./style.module.css";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_PATH } from "@/configs/navigationPaths";

export default function Login() {
  const { login } = useAuth();
  // 어스의 데이터중 로그인만 뽑아옴
  const [isLoading, startTransition] = useTransition();
  // 화면이 그려질때까지 기다려라
  const navigate = useNavigate();
  //  로그인에 성공하면 원하는 주소로 보내버리는 네비게이션 기능

  const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 방어적 프로그래밍
    if (isLoading) return;
    // 사용자가 버튼을 10번 누르면 서버에 요청이 10번 갑니다.
    // 그걸 첫 번째 클릭에서 딱 끊어버리는 아주 기특한 코드

    const formData = new FormData(e.currentTarget);
    // input 태그에 일일이 onChange 안 붙여도, 제출(Submit) 시점에 폼 안에 적힌 모든 값(email 등)을
    // 한꺼번에 쏙 뽑아오는 아주 편리한 도구
    const email = formData.get("email") as string;
    // 폼데이터에서 이메일을 뽑아서 할당 다만 문자열로 이루어져야함

    // 로그인 시도(요청/응답)
    startTransition(async () => {
      await login(email);
      navigate({ pathname: NAVIGATION_PATH.base });
      // 로그인에 성공하면 홈으로 보내라?
    });
  };

  return (
    <div className={S.page}>
      <div className={S.box}>
        <h1>로그인</h1>
        <form className={S.form} onSubmit={handleLogin}>
          <input
            type="text"
            name="email"
            aria-label="이메일"
            defaultValue="yamoo9@naver.com"
          />
          <button
            type="submit"
            className={S.submitButton}
            aria-disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
