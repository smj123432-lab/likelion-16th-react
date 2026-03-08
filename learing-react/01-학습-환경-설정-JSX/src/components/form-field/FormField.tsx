import styles from './FormField.module.css'

export default function FormField() {
  return (
    <div className={styles.field}>
      <label htmlFor="username">이름</label>
      <input
        id="username"
        type="text"
        className={styles.input}
        placeholder="이름을 입력하세요."
      />
    </div>
  )
}
