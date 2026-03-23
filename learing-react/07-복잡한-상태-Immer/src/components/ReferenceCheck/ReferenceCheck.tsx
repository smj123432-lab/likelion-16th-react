/* eslint-disable react-hooks/immutability */
import { useState } from "react";
import S from "./ReferenceCheck.module.css";

const INITIAL_USER = {
  name: "이두나",
  age: 21,
  profile: {
    city: "서울",
    postcode: "014572",
  },
};
// 이니셜 유저 객체

type User = typeof INITIAL_USER;

export default function ReferenceCheck() {
  const [user, setUser] = useState<User>({
    ...INITIAL_USER,
    // 이니셜 유저 객체 복사
    profile: {
      ...INITIAL_USER.profile,
      // 이니셜 유저 객체 안 프로필도 복사
    },
  });

  const handleWrongUpdate = () => {
    // ❌ Mutation: 데이터는 바뀌지만 참조가 같음
    // 리액트 상태는 직접 수정하면 안되고 항상 새 객체를 만들어 교체해야한다
    user.name = "강하영 (변경됨)";
    user.profile.postcode = "91920 (변경됨)";

    const nextUser = user;
    setUser(nextUser);

    console.error("뮤테이션");
    console.table(nextUser);
  };

  const handleRightUpdate = () => {
    // ✅ Immutability: 새로운 객체 생성 (새로운 참조 주소)

    const nextUser: User = {
      ...user, // 객체의 속성을 전개 (객체 합성)
      name: "주성천 (변경됨)",
      profile: {
        ...user.profile,
        city: "부산 (변경됨)",
      },
    };
    // 기존 user를 복사해서 새 주소의 객체를 만들고
    // 바꿀 값(name, city)만 덮어씀
    // React: "이전이랑 다른 주소네" → 리렌더링 → 화면 바뀜
    setUser(nextUser);

    console.log("%c✅ 불변성 유지:", "color: #04a200;");
    console.table(nextUser);
    // nextUser는 user와 같은 주소를 가리킴
    // React: "이전이랑 같은 주소네" → 리렌더링 안 함 → 화면 안 바뀜
  };

  const handleReset = () => {
    // ⚠️ Mutation: 예상치 못한 결과 확인(참조형 데이터 오염)
    // console.warn('참조형 데이터 오염')
    setUser({
      ...INITIAL_USER,
      profile: {
        ...INITIAL_USER.profile,
      },
    });
    // INITIAL_USER를 스프레드로 복사해서 새 객체를 만들어 상태를 초기값으로 되돌림
    // "재 복사" 가 아니라 "새 객체를 만들어서 교체"
    // profile도 중첩 객체라 따로 복사해야 불변성 유지
  };

  return (
    <div className={S.container}>
      <section className={S.card}>
        <header className={S.header}>
          <h2 className={S.title}>참조형 데이터 업데이트</h2>
          <p className={S.description}>
            불변성을 지켰을 때만 화면이 반응합니다.
          </p>
        </header>

        <div className={S.content}>
          <dl className={S.infoBox}>
            <div className={S.infoRow}>
              <dt className={S.label}>이름</dt>
              <dd className={`${S.value} ${S.valueActive}`}>{user.name}</dd>
            </div>
            <div className={S.infoRow}>
              <dt className={S.label}>나이</dt>
              <dd className={S.value}>{user.age}세</dd>
            </div>
            <div className={S.infoRow}>
              <dt className={S.label}>도시</dt>
              <dd className={S.badge}>{user.profile.city}</dd>
            </div>
            <div className={S.infoRow}>
              <dt className={S.label}>우편번호</dt>
              <dd className={S.value}>{user.profile.postcode}</dd>
            </div>
          </dl>
        </div>

        <footer className={S.footer}>
          <div className={S.buttonGroup}>
            <button
              type="button"
              className={`${S.btn} ${S.btnWrong}`}
              onClick={handleWrongUpdate}
            >
              직접 수정
            </button>
            <button
              type="button"
              className={`${S.btn} ${S.btnRight}`}
              onClick={handleRightUpdate}
            >
              새 객체 생성
            </button>
            <button
              type="button"
              className={`${S.btn} ${S.btnReset}`}
              onClick={handleReset}
            >
              초기화
            </button>
          </div>
          <p className={S.helperText}>
            * 직접 수정 후 새 객체 생성을 눌러 변화를 비교해보세요.
          </p>
        </footer>
      </section>
    </div>
  );
}
