import "./App.css";

/**
 * JSX (JavaScript eXtension: 자바스크립트 확장 (비표준: 브라우저 해석 못함: SyntaxError))
 * 빌드(컴파일 + 번들링) 도구에서만 JSX 사용 가능
 * Build Tools (Vite, Webpack, Turbopack, ....)
 * *.tsx (TypeScript + JSX) -> TSC -> *.js (React API: React.createElement(type, props, ...children))
 */

export default function App() {
  // 함수 안에 데이터 선언
  const size = 120;

  // return null /* 아무 것도 반환하지 않음 (화면에 아무 것도 그리지 않음) */

  // 함수가 JSX(React.ReactNode 타입) 반환
  // JSX (JavaScript 확장 구문: 마크업 (구조 설계 in JavaScript 파일))
  // JSX는 문(statement)이다? ❌ 값(expression, value)이다? ⭕️
  return (
    <div>
      <header className="header">
        <h1>
          <dfn>
            <abbr title="JavaScript eXtension">JSX</abbr>
          </dfn>{" "}
          기초 배우기
        </h1>
      </header>
      <main className="main">
        <section>
          <h2>모든 태그는 반드시 닫혀야 합니다.</h2>
          <p>
            <dfn>
              <abbr title="Hyper Text Markup Language">HTML</abbr>
              에서는 허용되었던 {"<img>"} 태그도 반드시 닫아야 합니다.
            </dfn>
            <img
              src="/react.svg"
              alt="리액트 로고"
              width={size}
              height={size}
            />
          </p>
        </section>
        <section>
          <h2>
            <abbr>HTML</abbr>이 아닙니다.
          </h2>
          <div className="field">
            <label htmlFor="username">이름</label>
            <input
              id="username"
              type="text"
              className="input"
              placeholder="이름을 입력하세요."
            />
          </div>
        </section>
        <section>
          <h2>웹 표준과 접근성을 준수해야 합니다.</h2>
          {/* 클릭 이벤트리스너 추가: JSX onClick={함수} */}
          {/* <div
            onClick={() => {
              alert("hello");
            }}
          >
            모든 사용자 고려
          </div> */}

          <button
            type="button"
            onClick={() => {
              alert("행복해요");
            }}
          >
            모든 사용자 고려 🫡
          </button>
          {/* 'jsx주석' */}
        </section>
      </main>
      <footer className="footer">
        <small>
          copyright reserved &copy; <abbr title="euid">EUID</abbr> "완벽보다
          완주를!"
        </small>
      </footer>
    </div>
  );
}
// jsx 를 사용할 땐 class가 아닌 className 을 써야한다.
// jsx는 식이다
// 리액트 엘리먼트는 하나만을 반환할 수 있다.
// 부모로 감싸 내보내는건 부모 하나가 나가는거니 가능하다.
// 값은 소괄호로 감쌀 수 있다.
