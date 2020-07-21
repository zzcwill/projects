const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  routes: state => state.permission.routes,
  apartmentType: state => state.reflex.apartmentType,
  userInfo: state => state.user.userInfo,
}
export default getters
