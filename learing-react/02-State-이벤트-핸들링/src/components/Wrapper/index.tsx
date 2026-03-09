import S from './style.module.css'

function Wrapper() {
  /**
   * 컴포넌트 children, width 속성
   * - 컴포넌트 타입 정의 (인라인 → 인터페이스)
   * - 래퍼 내부에 넣을 (리액트) 자식 요소 설정
   * - 래퍼의 너비(width) 설정
   */
  return <div className={S.container}>래퍼(Wrapper)</div>
}

export default Wrapper
