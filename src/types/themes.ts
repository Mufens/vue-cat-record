// 定义主题类型
export interface ThemeConfig {
  name: string // 主题唯一标识（英文）
  label: string // 显示名称
  color: string // 色标颜色（用于下拉菜单显示）
  className: string // 对应 SCSS 中的类名
}
