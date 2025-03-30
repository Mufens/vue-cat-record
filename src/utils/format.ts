export const formatDate = (date: string | number): string => {
  // 兼容时间戳和ISO字符串
  const parsedDate = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
  return parsedDate.toLocaleDateString(undefined, options)
}
