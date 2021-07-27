const getters = {
    sysname: state => state.app.sysname,
    userInfo: state => {
        if (state.user.userInfo === '') {
            return {}
        } else {
            return JSON.parse(state.user.userInfo)
        }
    }
}
export default getters