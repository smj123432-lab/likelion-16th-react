import { createContext, use } from "react";

export interface User {
  email: string;
}

export interface AuthContextValue {
  // state
  user: null | User;
  initializing: boolean;
  // actions
  login: (email: User["email"]) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<null | AuthContextValue>(null);

export const useAuth = () => {
  const contextValue = use(AuthContext); // React v19+ use() 함수
  // 어스 콘텍스트의 데이터를 받아 할당

  if (!contextValue) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용 가능합니다.");
    // 콘텍스트 밸류가 아니라면 위의 오류 메시지 출력
  }

  return contextValue;
  // 콘텍스트 밸류를 내보냄
};
