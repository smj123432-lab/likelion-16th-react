import { useEffect, useState } from "react";

export function useDebounce(value: string, delay = 300) {
  // 값은 문자열로 받고 딜레이의 초기값은 300이다
  const [debouncedValue, setDebouncedValue] = useState(value);
  // 디바운드밸류의 초기 값은 밸류이다

  useEffect(() => {
    const timerId = setTimeout(() => {
      // delay초 뒤에 값으로 바꿔 리렌더링해라
      setDebouncedValue(value);
      // 기존에 돌아가던 타이머를 취소(폭탄 해체)하고 다시 0.3초를 세게 만드는 클린업(정리) 함수
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return [debouncedValue, setDebouncedValue] as const;
  // TypeScript에서 배열의 요소 타입과 순서를 고정(Tuple)하여 반환
}
