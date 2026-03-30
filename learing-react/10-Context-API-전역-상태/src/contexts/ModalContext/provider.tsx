import { startTransition, useCallback, useId, useState } from "react";
import type { ModalData } from "./type";
import { ModalContext } from "./context";

export function ModalProvider({ children }: React.PropsWithChildren) {
  const modalTitleId = useId();
  // 고유 아이디 생성
  const [modal, setModal] = useState<ModalData | null>(null);
  // 나중에 모달 데이터의 형식으로 데이터가 들어올 빈 객체 생성
  const [isClosing, setIsClosing] = useState(false);
  // 초기 값은 폴스

  const open = useCallback((title: string, content: React.ReactNode) => {
    // 타이틀은 문자열로 받아야하고 콘텐트는 리액트노드의 형식으로 받아야한다
    setIsClosing(false);
    // 닫히고 있었다면(true였다면) 다시 false로 리셋
    startTransition(() => {
      // 급한 일 부터 처리 하고 그려달라고 부탁하는 함수
      setModal({ title, content });
      // 모달을 받은 타이틀과 콘텐트의 업데이트해라
    });
  }, []);

  const close = useCallback(() => {
    setIsClosing(true);
    // 트루로 바꿔라 (모달이 닫힌다)
  }, []);
  // 처음 렌더링될 때 한 번만

  const confirmClose = useCallback(() => {
    // 함수를 기억해서 기억해서 값이 바뀌지 않는다면 이 함수는 그대로 사용
    setModal(null);
    // 비우고
    setIsClosing(false);
    // 폴스로 바꿔라
    // 초기화 하는 단계
  }, []);
  // 처음 렌더링될 때 한 번만

  return (
    <ModalContext.Provider
      value={{ modal, isClosing, modalTitleId, open, close, confirmClose }}
    >
      {children}
    </ModalContext.Provider>
  );
}
