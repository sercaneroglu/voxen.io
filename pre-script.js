const create = tag => document.createElement(tag)



const s = sel => document.querySelector(sel)

const sAll = sel => document.querySelectorAll(sel)


const rnd = max => Math.floor(Math.random() * max)



const registerOn = (evt, el, behavior) =>
  el.addEventListener(evt, behavior)

const registerOnClick = (el, behavior) =>
  registerOn('click', el, behavior)



String.prototype.isEmpty = function(trim) {
  if (trim) this.trim()
  return this.length == 0
}


const copyToClipboard = str => {
  const el = create('textarea')

  el.value = str.split('<br>')
    .join('\n');
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-100vw'

  document.body.appendChild(el)

  el.select()

  try {
    let copied = document.execCommand('copy')

    console.log(copied ? 'Copied to clipboard' : "Can't copy")

  } catch (e) {
    console.error('Oops, ' + e)
    return false
  }

  document.body.removeChild(el)
  return true
}

const copyContent = area => {
  let val = area.value

  if (val.isEmpty()) return

  let cpd = copyToClipboard(val)
  let color = area.style.color

  area.style.color = cpd ? 'limegreen' : 'red'

  setTimeout(
    () => area.style.color = color,
    500)
}