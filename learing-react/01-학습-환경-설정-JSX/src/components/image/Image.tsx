import styles from './Image.module.css'

export default function Image() {
  const size = 120
  return (
    <img
      className={styles.image}
      src="/react.svg"
      alt="리액트 로고"
      width={size}
      height={size}
    />
  )
}
