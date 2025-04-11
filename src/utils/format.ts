export const formatDate = (date: string | number): string => {
  const parsedDate = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 使用 24 小时制
  }
  return parsedDate
    .toLocaleDateString('zh-CN', options)
    .replace(/\//g, '-') // 将斜杠替换为短横线（可选）
    .replace(' ', ' ') // 保持日期和时间之间的空格
}
