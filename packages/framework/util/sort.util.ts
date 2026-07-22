import { CommonInfo } from '../types/index'

export type SortDirection = 'asc' | 'desc'

/**
 * isShow 필터 + order 정렬. 기본은 오름차순(`asc`) — 기존 호출부와 동일하다.
 * CommonInfo를 extends 하는 모든 타입에 사용 가능
 */
export function filterAndSort<T extends CommonInfo>(
  items: T[] | undefined,
  direction: SortDirection = 'asc',
): T[] {
  const sign = direction === 'asc' ? 1 : -1
  return (items ?? []).filter((item) => item.isShow).sort((a, b) => (a.order - b.order) * sign)
}
