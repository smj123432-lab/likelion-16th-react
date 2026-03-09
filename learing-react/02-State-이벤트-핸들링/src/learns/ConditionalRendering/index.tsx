import S from './style.module.css'

function ConditionalRendering() {
  /**
   * 조건부 렌더링
   * - 박준혁 / 프로젝트 매니저 / 우수 사원
   * - 최병현 / 프론트엔드 개발자 / 신규 입사자 & 우수 사원
   * - 한수정 / 백엔드 개발자 / 신규 입사자
   */

  return (
    <div className={S.container}>
      <h2>팀원 소개</h2>
      <ul className={S.profileList}>
        <li>
          <div data-placeholder />
        </li>

        <li>
          <div data-placeholder />
        </li>

        <li>
          <div data-placeholder />
        </li>
      </ul>
    </div>
  )
}

export default ConditionalRendering
