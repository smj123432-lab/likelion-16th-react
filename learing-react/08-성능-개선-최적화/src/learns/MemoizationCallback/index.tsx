import { useCallback, useEffect, useState } from "react";
import { formatTime } from "./util/formatTime";
import GrandFather from "./parts/GrandFather";
import S from "./style.module.css";

export default function MemoizationCallback() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    // 1초마다 날짜를 리렌더링

    return () => {
      clearInterval(timer);
      // 클린업 함수: 컴포넌트가 언마운트될 때 실행
      // clearInterval(timer): 타이머를 정리해서 메모리 누수 방지
      // 리렌더링이 아니라 타이머를 멈추는 것
    };
  }, []);
  // [] 빈 배열: 마운트 시 딱 한 번만 실행
  // 값이 바뀔 때가 아니라 처음 화면에 나타날 때 한 번만

  const [count, setCount] = useState(0);
  const incrementCount = useCallback(() => setCount(count + 1), [count]);
  // count가 바뀌기 전까지는 이전 렌더링의 incrementCount와 같은 참조 유지
  // → memo(GrandFather)가 props 비교할 때 "같다"고 판단
  // → GrandFather, Father, Child 리렌더링 안 함

  return (
    <div className={S.container}>
      <section className={S.timerSection}>
        <h2 className={S.title}>현재 시간</h2>
        <time dateTime={time.toISOString()} className={S.timeDisplay}>
          {formatTime(time)}
        </time>
      </section>

      <div className={S.counterSection}>
        <GrandFather count={count} onIncreament={incrementCount} />
      </div>
    </div>
  );
}
