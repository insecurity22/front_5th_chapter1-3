const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === "object";
};

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 배열을 얕게 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    // 길이 확인
    if (objA.length !== objB.length) return false;

    // 각 요소가 동일한지 얕게 비교
    return objA.every((value, index) => value === objB[index]);
  }

  // 2. 객체를 얕게 비교
  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);
    /**
        Object.entries({ a: 1, b: 2 }) = [['a', 1], ['b', 2]]
     */

    if (entriesA.length !== entriesB.length) return false;
    /**
        서로 다른 객체이지만 동일한 값을 가지는 경우 true
        { a: 1, b: 2 } === { a: 1, b: 2 }
     */

    return entriesA.every(([key, value]) => {
      return objB[key] === value;
    });
  }

  // 3. 참조 비교
  return objA === objB;
}
