import S from './style.module.css'

function Section() {
  /**
   * 컴포넌트 title, children 속성
   * - 컴포넌트 타입 정의 (인라인 → 인터페이스)
   * - 섹션 제목 설정 (필수)
   * - 섹션 제목 화면에 표시 여부 설정 (선택)
   * - 섹션 내부에 넣을 (리액트) 자식 요소 설정 (선택)
   */
  return (
    <section className={S.container}>
      <h1 className="sr-only">리액트 학습</h1>
    </section>
  )
}

export default Section
