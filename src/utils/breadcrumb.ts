import type { Menus } from '@/types/menu'
export interface BreadcrumbItem {
  title: string
  icon: string
}

export const generateBreadcrumbs = (path: string, menuData: Menus[]): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = []

  const findMenu = (menus: Menus[], targetPath: string): boolean => {
    for (const menu of menus) {
      if (menu.index === targetPath) {
        breadcrumbs.unshift({ title: menu.title ?? 'Untitled', icon: menu.icon ?? 'default-icon' })
        return true
      }
      if (menu.children && findMenu(menu.children, targetPath)) {
        breadcrumbs.unshift({ title: menu.title ?? 'Untitled', icon: menu.icon ?? 'default-icon' })
        return true
      }
    }
    return false
  }

  findMenu(menuData, path)
  return breadcrumbs
}
