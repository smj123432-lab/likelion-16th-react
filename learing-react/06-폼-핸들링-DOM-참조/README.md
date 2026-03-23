# 핵심 목표

**폼 핸들링과 useRef**

- **제어 컴포넌트와 단방향 데이터 흐름의 완성**  
  React State와 입력값(`value`)을 실시간으로 동기화하는 제어 컴포넌트 패턴을 익히고,  
  다중 입력 필드를 하나의 핸들러로 관리하는 효율적인 상태 관리 기법을 습득하여  
  "폼의 진실의 원천(Source of Truth)은 State"임을 이해합니다.
- **useRef를 활용한 직접적인 DOM 접근과 비제어 방식**  
  렌더링을 유발하지 않고 값을 유지하는 `useRef`의 특성을 파악하여, 포커스 제어 및  
  파일 업로드와 같이 DOM 요소에 직접 접근해야 하는 상황을 해결하고, 제어 컴포넌트와  
  비제어 컴포넌트 중 상황에 맞는 최적의 도구를 선택하는 기준을 정립합니다.
- **사용자 경험(UX)을 고려한 유효성 검사 및 폼 설계**  
  실시간 입력 검증과 제출 시 검증의 차이를 이해하고, 에러 발생 시 해당 필드로  
  자동 포커싱하거나 제출 중 중복 클릭을 방지하는 로딩 처리를 구현함으로써  
  기술적 완성도를 넘어 실제 서비스 수준의 견고한 회원가입 폼을 구축합니다.

> 폼 유효성 검사, 비동기 처리, DOM 직접 제어를 다룬 실습 모음입니다.

---

## 🛠 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

---

## 📋 실습 목록

| 실습             | 설명                                 |
| ---------------- | ------------------------------------ |
| SmartForm        | 회원가입 폼 유효성 검사              |
| MultiInputForm   | createValidator 고차 함수로 리팩토링 |
| FormSubmission   | 비동기 폼 제출 처리                  |
| MultiFilesUpload | 다중 파일 업로드                     |
| RefStudy         | useRef 활용                          |

---

## SmartForm — 회원가입 폼

**구현 기능**

- 닉네임 글자 수 제한 + 비속어 필터
- 이메일 형식 검증 (blur 후 표시)
- 비밀번호 강도 검증
- 비밀번호 확인 일치 여부 검증

**배운 개념**

- `useState` — 상태 관리, 리렌더링 트리거
- `useId` — label-input 연결용 고유 ID 생성
- **Derived State** — 기존 상태에서 계산 가능한 값은 별도 상태로 만들지 않음
- **blur 기반 검증 전략** — 포커스 이탈 후에만 에러 표시
- `onCompositionEnd` — 한글 IME 조합 완료 후 비속어 필터 실행
- 정규식 (`EMAIL_PATTERN`, `PW_PATTERN`, Lookahead)
- `aria-invalid`, `role="alert"` — 접근성

---

## MultiInputForm — createValidator 리팩토링

**구현 기능**

- SmartForm 검증 로직을 `createValidator` 고차 함수로 분리
- 상태를 객체로 통합 관리
- 폼 초기화 (`formResetKey`)

**배운 개념**

- **고차 함수** — 함수를 인자로 받고 함수를 반환
- **튜플** — `[error, showError]` 형태로 반환
- **제네릭** `<T extends Args = []>` — 타입을 나중에 결정
- `typeof` — 객체에서 타입 자동 추출
- `keyof` — 객체 타입의 키를 유니온 타입으로 추출
- 스프레드 연산자로 객체 상태 업데이트
- `key` prop으로 컴포넌트 완전 재생성

---

## FormSubmission — 폼 제출

**구현 기능**

- 비동기 폼 제출 처리
- 제출 중 로딩 상태 표시
- 성공 화면 조건부 렌더링

**배운 개념**

- `async/await` — 비동기 처리
- `try/catch/finally` — 에러 처리 + 항상 실행되는 마무리
- `Object.values` + `every` / `some` — 전체/일부 입력 여부 확인
- `aria-disabled` — 접근성을 고려한 버튼 비활성화

---

## MultiFilesUpload — 다중 파일 업로드

**구현 기능**

- 파일 선택 및 미리보기
- 개별 미리보기 삭제
- imgbb API로 파일 업로드
- 업로드 결과 URL 클립보드 복사

**배운 개념**

- `crypto.randomUUID()` — 고유 ID 생성
- `URL.createObjectURL` / `revokeObjectURL` — 브라우저 메모리 임시 URL 생성/해제
- `Promise.allSettled` — 성공/실패 상관없이 모든 비동기 결과 처리
- `FormData` + `fetch` — 파일 서버 전송
- `navigator.clipboard` — 클립보드 복사
- `import.meta.env` — 환경 변수 관리

---

## RefStudy — useRef 활용

**구현 기능**

- State vs Variable vs Ref 동작 비교
- 타이머 ID 저장 및 제어
- DOM 직접 접근 (focus, select)
- 클래스 컴포넌트 vs 함수 컴포넌트 비교

**배운 개념**

- `useRef` — 렌더링과 무관하게 값을 기억, DOM 직접 접근
- `setInterval` / `clearInterval` — 반복 타이머
- `ReturnType` — 함수 반환값 타입 자동 추출
- `ref` prop vs `ref callback` — DOM 연결 방법
- **클래스 컴포넌트** — `this`, `bind`, `setState`, `componentDidMount`
- `aria-live` — 동적으로 바뀌는 값을 스크린리더가 읽어줌
