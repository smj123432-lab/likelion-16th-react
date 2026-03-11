import S from "./style.module.css";

// 'user' 인터페이스
interface User {
  id: string;
  name: string;
  role: "어드민" | "마스터" | "프로" | "아마추어" | "게스트";
  age?: number;
}

// user
const userHan: User = {
  id: "user=akxci",
  name: "한주혁",
  role: "프로",
  age: 32,
};

// 유저 집합 그룹 : 유저[] 혹은 어레이 <유저>
const users: User[] = [userHan];

export default function Reconciliation() {
  return (
    <section className={S.container}>
      <h2 className={S.title}>재조정 및 Key</h2>
    </section>
  );
}
