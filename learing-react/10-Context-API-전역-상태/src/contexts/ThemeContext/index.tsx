import { createContext, useCallback, useContext, useState } from "react";

type ThemeMode = "light" | "dark";

interface ColorScheme {
  textColor: string;
  backgroundColor: string;
}

interface ThemeContextValue {
  mode: ThemeMode;
  scheme: ColorScheme;
  toggle: () => void;
}

const COLOR_SCHEME: Record<ThemeMode, ColorScheme> = {
  light: {
    textColor: "#010101",
    backgroundColor: "#efefef",
  },
  dark: {
    textColor: "#efefef",
    backgroundColor: "#010101",
  },
};

// 테마 컨텍스트 객체
const ThemeContext = createContext<ThemeContextValue | null>(null);
// 콘텍스트 객체에 테마콘텍스트밸류의 타입으로 들어가거나 바워둔다
// 나중에 받아서 교체할 빈 통로를 생성ㅇ

// 테마 프로바이더 래퍼 컴포넌트
export function ThemeProvider(props: React.PropsWithChildren) {
  // 앱에서 프롭스를 받는다?
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  // 테마모드의 형태로 정해야하고 초기 상태는 라이트다

  const toggleTheme = useCallback(() => {
    setThemeMode((m) => (m === "light" ? "dark" : "light"));
    // 모드가 라이트면 다크로 바꾸고 아니면 라이트로 바꿔라
    // 유즈 콜백을 사용해서 이 함수는 값이 바뀌지 않는 이상 재렌더링 되지 않음
  }, []);

  const colorScheme = COLOR_SCHEME[themeMode];
  // 컬러스케임의 테마모드를 할당?

  console.log({ themeMode, colorScheme });

  const themeValue = {
    mode: themeMode,
    scheme: colorScheme,
    toggle: toggleTheme,
  } as ThemeContextValue;
  // 위의 객체는 테마콘텍스트 밸류의 형태다

  return <ThemeContext.Provider value={themeValue} {...props} />;
  // 테마 콘텍스트안에 자식 컴포넌트를 그릴 것이다
}

// 테마 컨텍스트 값을 가져오는 커스텀 훅 (컨텍스트 전용 훅)
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const themeContextValue = useContext(ThemeContext);
  // 테마콘텍스트의 데이터를 받아온다? -> 테마콘텍스트의 테마뱔류와 프롭스(앱에서 전달받은 인자를 전개해서)를 가져온다...?

  if (!themeContextValue) {
    throw new Error("useTheme 훅은 ThemeProvider 안에서만 사용해야 합니다.");
  }

  return themeContextValue;
};
