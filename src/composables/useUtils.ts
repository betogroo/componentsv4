const useUtils = () => {
  const delay = (amount = 2000) => {
    console.log(`Delay de ${amount / 1000} segundos`)
    return new Promise((resolve) => setTimeout(resolve, amount))
  }

  return { delay }
}

export default useUtils
