import { LucideIcon } from 'lucide-react'

export type NavItem = {
  path: string
  title: string
  icon?: LucideIcon
  isActive?: boolean
  childrens?: NavItem[]
}
