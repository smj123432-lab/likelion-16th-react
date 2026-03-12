// import ProductPage from "@/practices/02-filtering/pages/product";
import S from "./style.module.css";
import { StaffList } from "@/components";

export default function App() {
  return (
    <div className={S.container}>
      <StaffList />
    </div>
  );
}
