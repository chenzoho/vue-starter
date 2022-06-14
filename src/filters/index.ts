/**
 *数字格式化成千位符
 *
 * @export
 * @param {number} num 输入数字
 * @returns {string} 输出参数
 */
export function toThousandFilter(num: number): string {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}
