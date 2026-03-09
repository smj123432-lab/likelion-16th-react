import S from './style.module.css'

function Button() {
  /**
   * 컴포넌트 속성(Props) 설계
   * - 속성 타입 정의 (인라인 → 인터페이스)
   * - 속성 구조 분해 할당
   */
  const isDisabled = false

  return (
    <button
      type="button"
      className={S.button}
      onClick={() => alert('모든 사용자가 행복해요!!! 🌈')}
      aria-disabled={isDisabled}
    >
      모두를 위한 설계
    </button>
  )
}

export default Button
