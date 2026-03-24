import { useCallback, useState } from "react";

export function useToggle(initialValue = false) {
  // 처음 이니셜 밸류 = 폴스
  const [isToggle, setIsToggle] = useState(initialValue);
  // 초기상태 (이니셜밸류) -> 폴스
  const toggle = useCallback(() => setIsToggle((prev) => !prev), []);
  // 클릭 시 폴스에서 트루로 변화 (트루면 폴스)
  return [isToggle, toggle] as const;
}
