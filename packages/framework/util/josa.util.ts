/**
 * 한글 조사(은/는, 이/가, 을/를 …)를 앞 단어에 맞춰 고르는 순수 유틸.
 *
 * 회사명·사용자 이름·품목명처럼 **런타임에 정해지는 값** 뒤에 조사가 붙을 때 필요하다.
 * `"%c은(는)"`처럼 두 형태를 병기하면 읽기 불편하고, 한쪽만 쓰면 값에 따라 어색해진다.
 *
 * DOM·React·Mantine에 의존하지 않는 순수 함수라 서버·클라이언트 어디서든 쓴다.
 */

/** 지원하는 조사 쌍. 표기는 '받침 있을 때/없을 때' 순서다. */
export type JosaPair =
  | '은/는'
  | '이/가'
  | '을/를'
  | '과/와'
  | '으로/로'
  | '아/야'
  | '이라/라'
  | '이나/나'
  | '이란/란'
  | '이여/여'

const HANGUL_BASE = 0xac00
const HANGUL_LAST = 0xd7a3
/** 종성 인덱스 8 = ㄹ. '으로/로'만 이 값을 받침 없는 것처럼 다룬다. */
const JONG_RIEUL = 8

/** 숫자를 읽었을 때의 종성 — 0 영, 1 일, 2 이 … 9 구. `null`이면 받침 없음. */
const DIGIT_FINAL: Record<string, 'ㄹ' | 'ㅁ' | 'ㄱ' | 'ㅇ' | null> = {
  '0': 'ㅇ', // 영
  '1': 'ㄹ', // 일
  '2': null, // 이
  '3': 'ㅁ', // 삼
  '4': null, // 사
  '5': null, // 오
  '6': 'ㄱ', // 육
  '7': 'ㄹ', // 칠
  '8': 'ㄹ', // 팔
  '9': null, // 구
}

/** 알파벳을 한국어로 읽었을 때 받침이 남는 글자 — 나머지는 받침 없음(비, 씨, 디 …). */
const ALPHA_FINAL: Record<string, 'ㄹ' | 'ㅁ' | 'ㄴ' | 'ㅅ' | 'ㅍ'> = {
  l: 'ㄹ', // 엘
  m: 'ㅁ', // 엠
  n: 'ㄴ', // 엔
  r: 'ㄹ', // 아르
  s: 'ㅅ', // 에스
  x: 'ㅅ', // 엑스
  f: 'ㅍ', // 에프
}

interface FinalSound {
  /** 받침이 있는지 */
  has: boolean
  /** 받침이 ㄹ인지 — '으로/로'는 ㄹ 받침을 받침 없음처럼 다룬다 */
  rieul: boolean
}

const NO_FINAL: FinalSound = { has: false, rieul: false }

/**
 * 단어의 마지막 소리에서 받침 정보를 읽는다.
 *
 * 한글 음절 · 숫자 · 알파벳까지 본다. 괄호나 문장부호로 끝나면 그 앞 글자를 찾아
 * 올라간다("(주)가나(주)" 같은 표기도 마지막 실제 글자를 기준으로 판단하기 위해서다).
 * 판단할 근거가 없으면 받침 없음으로 본다 — 한국어에서 더 자연스러운 쪽이다.
 */
export function getFinalSound(word: string): FinalSound {
  const trimmed = word.trim()
  if (!trimmed) return NO_FINAL

  // 뒤에서부터 판단 가능한 글자를 찾는다.
  for (let i = trimmed.length - 1; i >= 0; i -= 1) {
    const char = trimmed[i]
    const code = char.charCodeAt(0)

    if (code >= HANGUL_BASE && code <= HANGUL_LAST) {
      const jong = (code - HANGUL_BASE) % 28
      return { has: jong !== 0, rieul: jong === JONG_RIEUL }
    }

    if (char >= '0' && char <= '9') {
      const final = DIGIT_FINAL[char]
      return { has: final !== null, rieul: final === 'ㄹ' }
    }

    const lower = char.toLowerCase()
    if (lower >= 'a' && lower <= 'z') {
      const final = ALPHA_FINAL[lower]
      return { has: Boolean(final), rieul: final === 'ㄹ' }
    }
  }

  return NO_FINAL
}

/** 받침이 있으면 `true`. 판단할 수 없으면 `false`(받침 없음으로 본다). */
export function hasFinalConsonant(word: string): boolean {
  return getFinalSound(word).has
}

/**
 * 단어에 맞는 조사 **하나만** 돌려준다.
 *
 * ```ts
 * josa('가나전자', '은/는')  // '는'
 * josa('한빛', '은/는')      // '은'
 * josa('서울', '으로/로')    // '로'  ← ㄹ 받침은 '로'
 * josa('URL', '을/를')       // '을'  ← 엘
 * ```
 */
export function josa(word: string, pair: JosaPair): string {
  const [withFinal, withoutFinal] = pair.split('/')
  const sound = getFinalSound(word)

  // '으로/로'만 예외 — ㄹ 받침은 '로'를 쓴다("서울로", "물로").
  if (pair === '으로/로' && sound.rieul) return withoutFinal

  return sound.has ? withFinal : withoutFinal
}

/**
 * 단어와 조사를 붙여서 돌려준다.
 *
 * ```ts
 * withJosa('가나전자', '이/가')  // '가나전자가'
 * ```
 */
export function withJosa(word: string, pair: JosaPair): string {
  return `${word}${josa(word, pair)}`
}

/**
 * 문장에 병기된 조사 표기를 실제 값에 맞게 하나로 정리한다.
 *
 * 원고를 `"%c은(는) 무엇입니까"`처럼 쓰고, 치환이 끝난 뒤 이 함수를 한 번 돌리면
 * `"가나전자는 무엇입니까"`가 된다. 알아보는 표기는 두 가지다.
 *
 * - `은(는)` `이(가)` `을(를)` `과(와)` — 앞이 받침 있는 형태, 괄호 안이 없는 형태
 * - `(으)로` `(이)라` `(이)나` `(이)란` `(이)여` — 괄호 안이 받침 있을 때만 붙는 음절
 *
 * 두 형태의 순서가 뒤바뀐 표기(`는(은)`)도 같은 규칙으로 받는다.
 */
export function fixJosa(text: string): string {
  return (
    text
      // 은(는) · 이(가) · 을(를) · 과(와) 및 그 역순
      .replace(
        /([^\s(])(은\(는\)|는\(은\)|이\(가\)|가\(이\)|을\(를\)|를\(을\)|과\(와\)|와\(과\))/g,
        (_match, word: string, marker: string) => {
          const [first, second] = marker.replace(')', '').split('(')
          // 표기 순서와 무관하게 '받침 있을 때/없을 때' 쌍으로 정규화한다.
          const pair = (WITH_FINAL.has(first) ? `${first}/${second}` : `${second}/${first}`) as JosaPair
          return `${word}${josa(word, pair)}`
        },
      )
      // (으)로 · (이)라 · (이)나 · (이)란 · (이)여
      .replace(
        /([^\s(])\((으|이)\)(로|라|나|란|여)/g,
        (_match, word: string, optional: string, tail: string) => {
          const pair = `${optional}${tail}/${tail}` as JosaPair
          return `${word}${josa(word, pair)}`
        },
      )
  )
}

/** 받침이 있을 때 쓰는 쪽의 조사 — `fixJosa`가 표기 순서를 정규화할 때 쓴다. */
const WITH_FINAL = new Set(['은', '이', '을', '과'])
