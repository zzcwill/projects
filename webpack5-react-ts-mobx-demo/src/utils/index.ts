export const getNum = (num: string) => {
  console.info(num)
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


getNum(1)
