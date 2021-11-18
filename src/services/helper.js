import toast from 'libs/Toast/Toast'
toast.init()

let helper = {}

helper.toast = (type, content) => {
  toast.show(type, content)
}

export default helper
