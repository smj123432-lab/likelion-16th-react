import { useCallback, useState } from "react";

/**
 * useInputV2 커스텀 훅 v2
 * @param initialValue 초기값
 * @returns props: JSX 요소에 주입할 속성 모음
 * @returns methods: 입력 제어를 위한 메서드 모음
 */
export function useInputV2(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  // 초기 값은 ''

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // setValue는 상태를 업데이트하며, 화면을 '리렌더링' 시킵니다.
    setValue(e.target.value);
    // 인풋에 넣은 값으로 업데이트해서 값을 바꿈
  }, []);
  //의존성이 비어있으므로 함수를 한 번만 만들어서 재사용함

  const reset = useCallback(() => {
    // 처음에 설정했던 초기값으로 되돌림
    setValue(initialValue);
  }, [initialValue]);
  // 초기값이 바뀔 때만 이 함수를 새로 갱신함

  return {
    props: {
      value,
      onChange,
    },
    methods: {
      reset,
    },
  };
}
