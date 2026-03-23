import type { ResponseData } from "./type";

const { VITE_IMGBB_URL: apiUrl, VITE_IMGBB_API_KEY: apiKey } = import.meta.env;

/**
 * API 엔드포인트 URL을 생성합니다.
 */
const getApiEndpoint = () => {
  const url = new URL(apiUrl);
  url.searchParams.append("key", apiKey);
  return url.toString();
};

/**
 * 파일 하나를 imgbb API를 사용해 업로드합니다.
 */
export const uploadFile = async (file: File) => {
  //파일의 형태로 인자 값을 정함
  try {
    const formData = new FormData();
    // 새로운 폼데이타 객체 생성
    formData.append("image", file);
    // FormData에 'image'라는 키 이름으로 file을 담음
    // 서버가 'image'라는 키로 파일을 받기 때문에 키 이름을 맞춰줘야 함
    // { image: file } 형태로 서버에 전송됨
    // 어펜드는 배열 메서드가 아닌 폼데이턱 자체적으로 제공하는 메서드임

    const response = await fetch(getApiEndpoint(), {
      method: "POST",
      // 데이터 추가하는 메서드
      // 업로드할 파일을 서버에 추가하려는 용도
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`파일 업로드 실패! (상태 코드: ${response.status})`);
    }

    const responseData: ResponseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("업로드 API 에러:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
};

/**
 * 여러 파일을 imgbb API를 사용해 업로드합니다.
 */
export const uploadFiles = async (fileList: FileList | File[]) => {
  // fileList는 FileList(input에서 선택한 파일들) 또는 File 배열 둘 다 받을 수 있음
  // FileList는 배열처럼 생겼지만 배열이 아니라서 둘 다 허용하는 것
  if (!fileList || fileList.length === 0) return [];
  // 파일의 형태가 아니거나 파일을 올린게 없으면 반환

  const uploadPromises = Array.from(fileList).map((file) => uploadFile(file));
  // FileList를 배열로 변환한 뒤
  // 각 파일마다 uploadFile()을 호출해서 Promise 배열 생성
  // 아직 서버에 보낸 게 아니라 "보낼 준비된 Promise 목록"을 만드는 것
  // 즉, 업로드할 파일의 배열을 생성하는 것
  // → Promise.allSettled로 동시에 전송

  try {
    return Promise.allSettled(uploadPromises);
    // 성공/실패 여부 상관 없이 업로드프로미스 결과 반환
  } catch (error) {
    console.error("멀티 업로드 API 에러:", error);
    throw error instanceof Error ? error : new Error(String(error));
    // error가 Error 객체면 그대로 던짐
    // error가 Error 객체가 아니면 (문자열 등) Error 객체로 감싸서 던짐
    // → 항상 Error 객체 형태로 에러를 전달하기 위한 처리
  }
};

/**
 * 업로드 결과에서 성공한 응답만 필터링하여 데이터를 추출합니다.
 */
export const extractSuccessData = (
  results: PromiseSettledResult<ResponseData>[],
  // Promise.allSettled의 결과 배열을 받는 인자
  // 각 요소는 { status: 'fulfilled', value: ResponseData } 또는
  //           { status: 'rejected', reason: 에러 } 형태
) => {
  return (
    results
      .filter((result) => result.status === "fulfilled")
      // 그 중 상태가 fulfilled 인 것만 골라 새 배열 생성
      .map((result) => result.value.data)
    // fulfilled된 결과에서 실제 응답 데이터(ImageData)만 꺼냄
    // result.value = ResponseData { data: ImageData, success: boolean, status: number }
    // result.value.data = 실제 이미지 정보(ImageData)만 추출

    // 풀필드인 데이터를 뽑고 거기서 실제 이미지 정보를 추출한다.
  );
};

/**
 * 업로드 결과에서 실패한 응답만 필터링하여 에러 메시지를 추출합니다.
 */
export const extractFailData = (
  results: PromiseSettledResult<ResponseData>[],
) => {
  return results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason?.message ?? "알 수 없는 에러가 발생.");
  // 위와 반대
};

/**
 * 업로드 결과를 분석하여 성공/실패 요약 정보를 반환합니다.
 */
export const getUploadSummary = (
  results: PromiseSettledResult<ResponseData>[],
) => {
  const success = extractSuccessData(results);
  const failReasons = extractFailData(results);

  return {
    total: results.length,
    successCount: success.length,
    failCount: failReasons.length,
    successData: success,
    errors: failReasons,
  };
};
