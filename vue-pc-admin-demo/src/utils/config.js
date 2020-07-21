import { title } from '@/settings'

const title = defaultSettings.title

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${defaultSettings.title} - ${pageTitle}`
  }
  return `${defaultSettings.title}`
}
