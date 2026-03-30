import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import S from "./style.module.css";

export default function CommonLayout() {
  return (
    <div className={S.layout}>
      <Navbar />
      {/* 상단바 모든 페이지 적용 */}

      <main className={S.main}>
        {/* 하위 라우트 컴포넌트가 렌더링되는 위치 */}
        <Outlet />
        {/* 주소에 따라 홈 로그인 무비디테일 등이 이 자리로 들어와서 그려진다 */}
      </main>
      <footer className={S.footer} lang="en">
        <p>© {new Date().getFullYear()} Movie Router Study</p>
        {/* 하단 바 모든 페이지 공통 */}
      </footer>
    </div>
  );
}
