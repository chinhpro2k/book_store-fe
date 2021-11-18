let toast = {}

let TOAST_TYPE = {
  dark: { color: 'dark', icon: 'fas fa-dot-circle' },
  primary: { color: 'primary', icon: 'fas fa-kiss-wink-heart' },
  secondary: { color: 'secondary', icon: 'fas fa-fan' },
  success: { color: 'base-color', icon: 'fas fa-check' },
  info: { color: 'info', icon: 'fas fa-info' },
  warning: { color: 'warning', icon: 'fas fa-exclamation' },
  danger: { color: 'danger', icon: 'fas fa-cross' },
}

toast.init = () => {
  if (!document.getElementById('toast-container')) {
    const bodyNode = document.querySelector('body')
    let toastContainerNode = document.createElement('div')
    toastContainerNode.id = 'toast-container'
    bodyNode.appendChild(toastContainerNode)
  }
}

toast.show = (type, content) => {
  let TOAST = TOAST_TYPE[type] || TOAST_TYPE.dark
  const toastContainerNode = document.querySelector('#toast-container')
  let toastItemNode = document.createElement('div')
  toastItemNode.classList.add('toast-item', `border-${TOAST.color}`)
  toastItemNode.innerHTML = `
          <div class='toast-item__icon'>
            <i class='${TOAST.icon} text-${TOAST.color}'></i>
          </div>
          <div class='toast-item__content'>${content}</div>
          <div class='toast-item__close'>
            <i class='fas fa-times'></i>
          </div>
        `

  let toastItemNodeId = setTimeout(() => {
    toastContainerNode.removeChild(toastItemNode)
  }, 3000)
  toastItemNode.querySelector('.toast-item__close').onclick = () => {
    toastContainerNode.removeChild(toastItemNode)
    clearTimeout(toastItemNodeId)
  }
  toastContainerNode.appendChild(toastItemNode)
}

export default toast
