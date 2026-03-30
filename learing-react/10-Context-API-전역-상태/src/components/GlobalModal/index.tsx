import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { CloseIcon } from "./ModalIcon";
import { useModal } from "@/contexts";
import S from "./style.module.css";

export function GlobalModal() {
  const { modal, isClosing, modalTitleId, close, confirmClose } = useModal();
  // 유즈 모달에서 위의 데이터를 받아서 사용할 것임
  const modalRef = useRef<HTMLDivElement>(null);
  // 처음엔 null이지만, 나중에 return 문에서 <div ref={modalRef}>라고 써주면,
  // 그때부터 modalRef.current는 진짜 그 <div> 자체
  const previousFocusRef = useRef<HTMLElement | null>(null);
  // 클릭했던 지점 기억 -> 널이지만 클릭하면 클릭한 요소로 값이 바뀜
  useEffect(() => {
    if (!modal) {
      // 모달이 닫혀있으면
      previousFocusRef.current?.focus();
      // '원래 있던 자리'로 사용자의 눈(포커스)을 되돌려 보냄
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement;
    // 포커스가 가 있는(테두리가 쳐져 있거나 입력 중인) 요소
    // 클릭한 버튼을 기억해놔라 -> 다시 되돌려보내기 위함
    const originalStyle = getComputedStyle(document.body).overflow;
    // 모달 범위 밖으로 벗어나는 부분을 기억
    document.body.style.overflow = "hidden";
    // 벗어나면 숨겨라

    const timer = setTimeout(() => {
      modalRef.current?.querySelector("button")?.focus();
      // 모달레프 버튼에 포커싱해라
      // 일단 모달부터 렌더링 해라 포커스는 그 다음
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // esc를 누르면 닫고
      if (e.key === "Tab" && modalRef.current) {
        // 탭 이면서 모달레프창이라면?
        const nodes = modalRef.current.querySelectorAll<HTMLElement>(
          // 노드에 할당해라? 뭐를?
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        // 포커스를 가질 수 있는 모든 놈들'을 다 찾아내서 리스트로 만든다
        const first = nodes[0];
        // 아 모달창에서 가장 처음에 포커싱 되는 요소라는거지?
        const last = nodes[nodes.length - 1];
        // 얘는 마지막이고?

        if (e.shiftKey && document.activeElement === first) {
          // 쉬프트 + 탭 키이고 효과가 있는 요소가 첫번째()버튼과 같다면?
          e.preventDefault();
          // 다음 칸 이동을 막음
          last.focus();
          // 그리고 마지막 last로 포커싱해라
        } else if (!e.shiftKey && document.activeElement === last) {
          // 쉬프트와 탭 키가 아니면 마지막에서 탭을 누르면
          e.preventDefault();
          first.focus();
          // 첫 번쨰로 포커싱해라
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [modal, close]);

  if (!modal) return null;

  return createPortal(
    <div
      role="presentation"
      className={S.overlay}
      data-closing={isClosing}
      onTransitionEnd={() => isClosing && confirmClose()}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        ref={modalRef}
        className={S.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={modalTitleId} className="sr-only">
          {modal.title}
        </h2>
        <div className={S.content}>{modal.content}</div>
        <button
          type="button"
          className={S.closeButton}
          aria-label="닫기"
          onClick={close}
        >
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.body,
  );
}
