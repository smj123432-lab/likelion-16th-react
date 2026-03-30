import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // React Router의 useLocation 훅을 통해 현재 주소 정보 가져오기
  const { pathname, search } = useLocation();
  // 이건 무슨 함수인지 모르겠음 -> 현재 주소창의 상세 정보를 가져오는 함수
  // 패스네임: 도메인 뒤의 경로
  // 서치: ?q=batman 처럼 뒤에 붙는 검색 파라미터를 뜻함

  // URL의 pathname 또는 search 값이 바뀌면
  useEffect(() => {
    // 페이지 상단으로 스크롤 이동
    // 타이머를 사용해 이동 시간을 조금 뒤로 미룸
    const timerId = setTimeout(() => globalThis.scrollTo(0, 0));
    // ?? 모르겠음;
    // 화면의 좌표를 왼쪽 위로 강제 이동 시킴

    // 클린업 (메모리 누수 방지)
    return () => clearTimeout(timerId);
  }, [pathname, search]);
  // 주소가 바뀌면 이 함수를 다시 실행

  // null을 반환하면 아무 것도 화면에 렌더링하지 않음
  return null;
}
