export const saveClientProgram = (data) => {
  window.localStorage.setItem('data-program', JSON.stringify(data))
}

export const getClientProgram = () => {
  return JSON.parse(window.localStorage.getItem('data-program'))
}

export const destroyClientProgram = () => {
  window.localStorage.removeItem('data-program')
}

export default { saveClientProgram, getClientProgram, destroyClientProgram }
