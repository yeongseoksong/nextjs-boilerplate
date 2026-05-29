import { CommonInfo } from '../types/index'

/**
 * isShow 필터 + order 오름차순 정렬
 * CommonInfo를 extends 하는 모든 타입에 사용 가능
 */
export function filterAndSort<T extends CommonInfo>(items: T[] | undefined): T[] {
  return (items ?? [])
    .filter((item) => item.isShow)
    .sort((a, b) => a.order - b.order)
}
