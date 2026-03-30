import { useCallback, useState } from "react";

import type { AuthContextType } from "./type";
import { login as authLogin } from "./api";
import { AuthContext } from "./context";

export function AuthProvider({ children }: React.PropsWithChildren) {
  // 앱에서 칠드런을 전달 받음
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  // 전달한 데이터의 타입은 유저의 형태로 받는다

  const login: AuthContextType["login"] = useCallback(
    async (id, password, userInfo) => {
      // 로그인은 로그인의 형태로 받는다..? 아이디 패스워드 유저 인포를 응답받아서 인자로 넣는다
      try {
        const { accessToken, refreshToken } = await authLogin({ id, password });
        // 아이디와 패스워드를 보내면 해당하는 정보의 데이터가 응답으로 온다?
        const authUser = { id, accessToken, refreshToken, ...userInfo };
        // 아이디, 액세스 토큰, 리프레시 토큰, 유저정보도 받았다면 유저정보도 전개하여 복사한다
        setUser(authUser);
        // 어스유저로 바꿔서 리렌더링

        console.log("로그인 성공:", authUser);
      } catch (error) {
        console.error("로그인 실패:", error);
        throw error;
      }
    },
    [],
  );

  const logout: AuthContextType["logout"] = useCallback(() => {
    // 로그아웃 기능 실행 -> 폼은 타입에서 로그아웃을 가져오ㅘ서 사용
    setUser(null);
    // 정보를 비워 리렌더랑

    console.log("로그아웃 완료");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
      {/* 유저 로그인 로그아웃의 정보를 내보냄 */}
    </AuthContext.Provider>
  );
}
