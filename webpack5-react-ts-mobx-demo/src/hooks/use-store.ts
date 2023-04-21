import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

/**
 * 将 context 暴露到全局
 */
export default (name: string) => useContext(MobXProviderContext)[name]
