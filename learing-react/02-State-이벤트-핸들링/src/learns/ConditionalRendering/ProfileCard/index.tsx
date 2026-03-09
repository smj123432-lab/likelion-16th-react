import S from './style.module.css'

/**
 * ProfileCardProps 인터페이스 정의
 * - name
 * - role
 * - isNew
 * - isBest
 */

function ProfileCard() {
  const name = '박종우'
  const role = '프론트엔드 개발자'

  return (
    <article className={S.card}>
      <header className={S.header}>
        <h3 className={S.name}>{name}</h3>
        <span className={`${S.badge} ${S.badgeNew}`} aria-label="신규 입사자">
          NEW
        </span>
        <span className={`${S.badge} ${S.badgeBest}`} aria-label="우수 사원">
          BEST
        </span>
      </header>
      <p className={S.role}>{role}</p>
    </article>
  )
}

export default ProfileCard
