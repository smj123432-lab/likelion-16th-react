import Button from '../button/Button'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <dfn>
          <abbr title="JavaScript eXtension">JSX</abbr>
        </dfn>{' '}
        기초 배우기
        <Button />
      </h1>
    </header>
  )
}
