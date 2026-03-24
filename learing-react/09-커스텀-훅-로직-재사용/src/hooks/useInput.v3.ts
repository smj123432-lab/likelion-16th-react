import { useCallback, useRef, useState } from "react";

/**
 * useInput 커스텀 훅 v3
 * @param initialValue 초기값
 * @returns props: JSX 요소에 주입할 속성 모음
 * @returns methods: 입력 제어를 위한 메서드 모음
 */
export function useInput<T extends HTMLInputElement>(initialValue = "") {
  const ref = useRef<T>(null);
  // 이번 useRef는 데이터를 저장하는 목적이 아님
  // 화면에 렌더링될 실제 HTML DOM 요소(`<input>` 태그)에 직접 접근하고 제어하기 위한
  // '참조(Reference) 객체'를 생성한 것
  const [value, setValue] = useState(initialValue);
  // 이니셜 밸류가 초기 값 -> 인풋창에 넣은 값이 이니셜 밸류로 전달받음

  const onChange = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
    // 값을 해당 타겟의 값으로 바꿔 리렌더링
  }, []);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);
  // 👉 현재 입력되어 있는 상태값(`value`)을 컴포넌트가 처음 마운트될 때 받았던 초기값(`initialValue`)으로 강제 변경(초기화)합니다.

  const focus = useCallback(() => {
    ref.current?.focus();
  }, []);
  // 👉 `ref.current`로 연결된 실제 `<input>` DOM 요소에 접근하여, 브라우저 내장 API인 `.focus()`를 실행합니다.
  // (호출 시, 사용자가 마우스로 클릭하지 않아도 해당 입력창에 '입력 커서'가 즉시 활성화됩니다.)

  const select = useCallback(() => {
    ref.current?.select();
  }, []);
  // 👉 `ref.current`로 연결된 실제 `<input>` DOM 요소에 접근하여, 브라우저 내장 API인 `.select()`를 실행합니다.
  // (호출 시, 해당 입력창 내부에 적혀있는 텍스트 전체를 '블록 지정(전체 선택)' 상태로 만듭니다.)

  return {
    props: { ref, value, onChange },
    // 프롭스의 값 { ref, value, onChange }, 반환
    methods: { reset, focus, select },
    // 메서드 : { reset, focus, select }, 반환
    // 객체의 용도를 명확히 구분하고, 전개 구문(Spread Syntax)의 활용도를 극대화하기 위해 분리한 것
  };
}
/*
1. 이니셜 밸류 값 변화

2. 리셋 =셋밸류(이니셜밸류), [이니셜밸류]

-> 리액트가 [이니셜밸류]의 값이 변한걸 인지

3. 셋밸류(이니셜밸류) 메모리상 저장 (값이 변해있는 상태)

4. 리셋 버튼 누르면 셋밸류(이니셜밸류) 실행

5. 셋밸류(이니셜 밸류) 리렌더링
*/
