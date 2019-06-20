export function getTurnUrl() {
  let envUrl = 'http://pre-za.fincs.net/userLogin'  
  if(window.location.origin === 'http://za.fincs.net') {
    envUrl = 'http://za.fincs.net/userLogin'
  }
  return envUrl
}