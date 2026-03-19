export async function wait(delay = 1000 /* ms */, successOrFail = false) {
  return new Promise((resolve, reject) => {
    let excuteFn = resolve;

    // 요청 성공 또는 실패하도록 설정
    if (successOrFail && Math.random() < 0.5) {
      excuteFn = reject;
    }

    // 항상 요청 성공
    setTimeout(excuteFn, delay);
  });
}
