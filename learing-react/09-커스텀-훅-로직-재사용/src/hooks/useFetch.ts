import { useCallback, useEffect, useRef, useState } from "react";

interface FetchParams {
  url: string;
  // 문자열로 받아라
  dependencies?: React.DependencyList;
  // 이 항목은 안 넣어도 되는 선택 사항(Optional)이다. 단, 넣을 거면 리액트의 의존성 배열([a, b] 같은 형태)로 넣어라
  options?: RequestInit;
  // 이 항목도 안 넣어도 되는 선택 사항이다. 단, 넣을 거면 RequestInit 규격에 맞춰서 넣어라"**라는 뜻입니다.
}

export function useFetch<T>({
  url,
  // ⚠️ 참조 동일성 유지되어야만 리렌더링 방지
  //    다른 참조 객체가 전달될 경우 요청이 무한 루프됨
  dependencies = [],
  options = {},
}: FetchParams) {
  // 상태 ( 로딩 | 에러 | 데이터 )
  const [isLoading, setIsLoading] = useState(false);
  // 초기 값은 폴스
  const [error, setError] = useState<Error | null>(null);
  // 값은 에러 아니면 널을 넣어야 하는데 초기 값은 널이다
  const [data, setData] = useState<T | null>(null);
  // 널 아니면 t로 받아라 (t는 아직 정해지지 않음)

  // 종속성, 옵션 비교를 위한 문자화
  const optionsString = JSON.stringify(options);
  // 개발자가 이 훅을 호출할 때 넘겨준 options(설정 객체)를 '문자열'로 변환함.
  // 이유: 리액트가 매번 새로운 객체로 착각해서 API 요청을 무한 반복(무한 루프)하는 것을 막기 위함.
  const dependenciesString = JSON.stringify(dependencies);
  // 개발자가 넘겨준 dependencies(의존성 배열)를 '문자열'로 변환함.
  // 이유: 위와 동일하게 배열의 참조값이 바뀌어 무한 렌더링이 일어나는 것을 방어함.

  // 전달된 options 객체의 값 참조
  const optionsRef = useRef(options);
  // { current: options } 값 변하지 않음

  // 이펙트 (optionsString 변화 감지)
  useEffect(() => {
    // options 객체가 변경되면 optionsRef.current 값으로 options 업데이트
    optionsRef.current = options;

    // [ESLint 비활성 주석이 추가된 이유]
    // options이 변경될 때마다 optionsString이 바뀌므로
    // options 객체를 종속성 배열에 넣을 필요가 없음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsString]);
  // 옵션의 내용이 바뀔때마다 리렌더링?

  // 이펙트 (외부 시스템과 리액트 동기화)
  useEffect(() => {
    // 경쟁 상태 (race condition)
    const controller = new AbortController();
    const { signal } = controller;

    // 데이터 페칭 함수
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // fetch 옵션 객체 (외부에서 전달된 options 참조 객체와 signal 합성)
        const fetchConfig = { ...optionsRef.current, signal };
        // 받아온 옵션을 전개하여 복사하고 시그널과 합쳐 하나의 객체로 만듦
        const response = await fetch(url, fetchConfig);
        // Response 객체(url에서 받은 펫치콘픽의 대답)를 받아옴

        if (!response.ok) {
          // 레스폰스에 오류가 생기면?
          const errorMessage = `[에러 발생] ${response.status} ${response.statusText}`;
          // 위의 메세지를 던짐
          throw new Error(errorMessage); // catch 블록으로 집어던짐
        }

        const responseData: T = await response.json();
        // 3. 상자를 뜯어서 JSON을 자바스크립트 객체로 변환 (타입은 T로 지정)
        setData(responseData);
        // 4. 받아온 알맹이 데이터로 상태를 업데이트하여 화면을 리렌더링
      } catch (err) {
        const isError = err instanceof Error;
        // 발생한 에러(err)가 자바스크립트 공식 Error 객체인지 확인 (true/false)
        //interface Error {
        //    cause?: unknown;
        //}

        // 에러가 발생하면 언노운을 이즈에러에 넣음
        if (isError && err.name === "AbortError") return;
        // 이즈에러와 에러의 이름이 어볼트 에러라면 진짜 에러가 아니므로 아무 처리 없이 조용히 함수를 끝냄
        const error = isError
          ? err
          : new Error("알 수 없는 에러가 발생했습니다.");
        // 공식 Error 객체면 그대로 쓰고, 아니면 새 Error 객체로 감싸서 상태 업데이트
        setError(error);
      } finally {
        // 성공하든 실패하든 마지막에 로딩 상태를 끔.
        // 단, 취소(aborted)된 통신이었다면 로딩 상태를 건드리지 않음.
        if (!signal.aborted) setIsLoading(false);
      }
    };

    // 데이터 페칭 함수 실행
    fetchData();

    // 클린업(정리)
    return () => {
      controller.abort();
    };
  }, [url, dependenciesString]);
  // 다음페이지로 넘어가면 종료?

  // 함수를 다시 실행하기하는 상태 선언
  const [, setTrigger] = useState(0);

  // 리페치 (refetch) 다시 서버에 요청/응답 받는 기능(함수)
  const refetch = useCallback(() => {
    // 트리거 업데이트 요청 (useFetch 함수가 동일한 옵션과 종속성으로 다시 실행)
    setTrigger((prev) => prev + 1);
  }, []);

  return { isLoading, error, data, refetch };
}
