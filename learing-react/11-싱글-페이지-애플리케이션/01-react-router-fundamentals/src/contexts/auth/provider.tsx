import { useEffect, useState } from "react";
import { USER_STORAGE_KEY } from "@/configs/storageKeys";
import { AuthContext, type AuthContextValue, type User } from "./context";

export function AuthProvider(props: React.PropsWithChildren) {
  // 인증 상태 (State) ----------------------------------------------------------

  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  // 일단은 널 배열이지만 값이 들어오려면 어스콘텍스트밸류의 유저 와 같은 형식으로 들어온다
  // 사용자가 없음을 확실히 하기 위해서
  const [initializing, setInitializing] = useState(true);

  // 앱 초기 구성 이펙트 -----------------------------------------------------------

  useEffect(() => {
    // 애플리케이션 초기화 (인증 상태 확인 후, 인증 컨텍스트의 user 값으로 설정)
    const initApp = () => {
      // 인증 사용자가 맞아? 확인 과정 (시간 소요...)

      try {
        // 사용자 브라우저 스토리지에 저장된 사용자 정보 가져오기
        const userInfo = localStorage.getItem(USER_STORAGE_KEY);
        // 로컬스토리지에서 유저 스토리지키를 가져와서 유저 인포에 할당
        // 만약 사용자 정보가 있다면? 인증 컨텍스트의 user 값으로 설정
        if (userInfo) setUser(JSON.parse(userInfo));
        // 유저 인포가 맞다면 유저인포를 자바스크립트 객체로 생성하여 셋유저에 업데이트한다
      } catch (error) {
        console.error("인증 정보 해석 실패:", error);
        // 잘못된 인증 정보 삭제
        localStorage.removeItem(USER_STORAGE_KEY);
        // 에러가 뜨면 즉, 인증에 실패하면 유저스토리지 키를 삭제한다
      } finally {
        // 앱 준비 상태 끝으로 변경
        setInitializing(false);
      }
    };

    initApp();
  }, []);

  // 인증 액션 (Actions) ---------------------------------------------------------

  const login = async (email: User["email"]) => {
    // 이메일은 유저의 이메일의 형태로 받는다

    // 로그인 시도 (서버에 로그인 요청/응답)
    await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5초 지연 (서버 비동기 처리 시뮬레이션)
    // 1.5초 뒤에 약속을 실행?
    // 1.5초가 지나지 전까지는 넘어가지 말고 멈춰있어

    // 인증된 사용자 정보
    const userInfo = { email };
    // 유저 인포는 유저인포에서 뽑아온 이메일 값이다?

    // user 상태 업데이트 요청
    setUser(userInfo);

    // 사용자 브라우저 스토리지에 인증 정보 저장 (노출 가능한 것만, 민감한 것은 제외)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userInfo));
    // 유저스토리지와 유저인포를 문자로 바꾼 것을 얻는다 즉, 저장한다
  };

  const logout = () => {
    // 로그아웃 시도
    setUser(null);

    // 사용자 브라우저 스토리지에 인증 정보 제거
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const authContextValue: AuthContextValue = {
    user,
    initializing,
    login,
    logout,
  };

  return <AuthContext value={authContextValue} {...props} />;
  // 아니면 어스콘텍스트밸류 자체를 전부 다 넘긴다?
  // 이 데이터를 받는 컴포넌트는 이 안에 그려진다.
}
