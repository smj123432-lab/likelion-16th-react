import S from "./style.module.css";
import UserForm from "../StateInitialization/UserForm";

export default function Debugging() {
  return (
    <section className={S.container}>
      <h2 className={S.title}>디버깅 (Debugging)</h2>
      <UserForm />
    </section>
  );
}
