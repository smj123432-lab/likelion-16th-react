import { memo } from "react";
import grandFatherImage from "@/assets/icons/grand-father.png";
import Father from "./Father";
import S from "./style.module.css";

// 렌더링 지연 시간(ms)
export const blockThreadTime = 0.2;

const iconSize = 22;

interface Props {
  count: number;
  onIncreament: () => void;
}

function GrandFather({ count, onIncreament }: Props) {
  console.log("%cGrandFather 렌더링", "color: #349bf0");

  return (
    <section className={S.container}>
      <div className={S.grandFather}>
        <h2 className={S.title}>
          <img
            src={grandFatherImage}
            alt=""
            width={iconSize}
            height={iconSize}
          />
          그랜 파더 카운트: {count}
        </h2>
        <button type="button" aria-label="카운트 1증가" onClick={onIncreament}>
          카운트 ↑
        </button>
        <Father />
      </div>
    </section>
  );
}

export default memo(GrandFather);
// GrandFather 컴포넌트를 memo로 감싸서 내보낸다
// 메모가 이전 프롭스랑 지금의 프롭스를 비교해서 같으면 리렌더링 x 다르면 리렌더링 o

// 부모 → 자식 → 자식의 자식 순서로 리렌더링이 전파됨
// memo는 그 전파를 중간에 차단하는 역할

// memo       = 문지기 (검사하는 역할)
// useCallback = 같은 열쇠 (통과시켜주는 조건)

// useCallback 없이 memo만 있으면
// → 문지기는 있는데 열쇠가 매번 바뀜
// → 문지기: "열쇠가 달라졌네" → 통과 못함

// 둘 다 있으면
// → 열쇠가 항상 같음
// → 문지기: "같은 열쇠네" → 통과 ✅

// time 1초마다 바뀜
// → MemoizationCallback 리렌더링
// → useCallback: "count 안 바뀌었으니까 incrementCount 같은 주소 유지"
// → memo: "count도 같고 onIncreament 주소도 같네" → GrandFather 차단
// → Father, Child 리렌더링 안 됨 ✅
