import S from './style.module.css'

function Header() {
  /**
   * 컴포넌트의 `children` 속성
   * - 부모 내부에 삽입되는 (리액트) 자식 요소들
   * - 컴포넌트의 props.children을 통해 전달됨
   * - `children` prop 타입 정의 (인라인 → 인터페이스)
   */

  return (
    <header className={S.header}>
      <h2>
        <dfn>
          <abbr title="JavaScript eXtension">JSX</abbr>
        </dfn>{' '}
        기초 배우기
      </h2>
    </header>
  )
}

export default Header
