# 핵심 목표

**복잡한 상태 관리와 Immer**

- **참조형 데이터의 불변성 원리 체득**  
  React의 렌더링 메커니즘이 객체와 배열의 '참조값' 변화를 감지하는 원리를  
  이해하고, 왜 직접 수정(Mutation) 대신 새로운 객체를 생성하는 불변성 유지가  
  필수적인지 그 이유를 명확히 정립합니다.
- **Immer를 활용한 복잡한 상태 업데이트 최적화**  
  중첩된 객체나 배열을 다룰 때 발생하는 코드의 복잡성을 `useImmer` 훅과  
  `draft` 개념으로 해결하고, `push`, `splice` 등 자바스크립트 표준 메서드를  
  활용해 가독성 높고 안전한 상태 변경 로직을 구현합니다.
- **실무적 상태 구조 설계와 UI 동기화**  
  장바구니 실습을 통해 원본 데이터(Data State)와 파생된 UI 상태(UI State)를  
  분리하는 설계 능력을 기르고, 선택 삭제·수량 변경·총 금액 계산 등 복합적인  
  CRUD 패턴을 효율적으로 처리하는 실무 역량을 확보합니다.

> 불변성, CRUD, Immer를 활용한 복잡한 상태 관리 실습 모음입니다.

---

## 🛠 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Immer](https://img.shields.io/badge/Immer-00E7C3?style=flat&logo=immer&logoColor=black)

---

## 📋 실습 목록

| 실습               | 설명                    |
| ------------------ | ----------------------- |
| ReferenceCheck     | 불변성 vs 뮤테이션 비교 |
| TodosCRUD          | 할 일 목록 CRUD         |
| TodosCrudWithImmer | Immer로 리팩토링한 CRUD |
| DerivedState       | 파생 상태 활용          |

---

## ReferenceCheck — 불변성 비교

**구현 기능**

- 직접 수정(뮤테이션) vs 새 객체 생성(불변성) 비교
- 중첩 객체 업데이트

**배운 개념**

- **뮤테이션** — 기존 객체를 직접 수정하면 참조(주소)가 같아서 React가 변화를 감지 못함
- **불변성** — 항상 새 객체를 만들어야 React가 리렌더링
- **참조 비교** — React는 값이 아닌 주소로 변화를 감지
- 중첩 객체 스프레드 — 모든 단계를 새 객체로 만들어야 완전한 불변성 유지

---

## TodosCRUD — 할 일 목록

**구현 기능**

- 할 일 추가 / 완료 토글 / 삭제
- 디바운싱으로 렌더링 최적화
- 제어 / 비제어 입력 방식 비교

**배운 개념**

- **CRUD** — Create / Read / Update / Delete
- **불변성** — 중첩 객체를 스프레드로 새 객체 생성
- `toReversed()` — 원본 배열 유지하며 역순 정렬
- **디바운싱** — 연속 이벤트를 마지막 것만 처리해서 렌더링 최적화
- **제어 vs 비제어 입력** — useState vs DOM 직접 조작
- `Date.now()` / `toISOString()` — ID 및 날짜 생성
- `FormData`로 폼 입력값 읽기
- 타입 단언 `as string`

---

## TodosCrudWithImmer — Immer로 리팩토링

**구현 기능**

- TodosCRUD와 동일한 기능을 Immer로 리팩토링

**배운 개념**

- `useImmer` — draft를 직접 수정해도 불변성을 자동으로 유지
- `draft.push()` — 배열에 항목 추가
- `draft.splice()` — 배열에서 항목 제거
- `draft.find()` — 항목 찾아서 직접 수정

---

## DerivedState — 파생 상태

**배운 개념**

- **Derived State** — 기존 상태에서 계산 가능한 값은 별도 상태로 만들지 않음
- 상태를 최소화하고 파생값은 계산으로 처리
- `every` / `some` / `filter` / `reduce` 활용

---

## 🧠 핵심 개념 요약

| 개념          | 설명                                                     |
| ------------- | -------------------------------------------------------- |
| 불변성        | React 상태는 직접 수정 금지, 항상 새 객체 생성           |
| 참조 비교     | 같은 주소면 React가 변화 없다고 판단해 리렌더링 안 함    |
| Derived State | 기존 상태에서 계산 가능한 값은 별도 상태로 만들지 않음   |
| 디바운싱      | 연속 이벤트를 마지막 것만 처리해서 성능 최적화           |
| useImmer      | draft를 직접 수정해도 불변성을 자동으로 유지해주는 훅    |
| CRUD          | Create / Read / Update / Delete — 데이터 기본 동작 4가지 |
