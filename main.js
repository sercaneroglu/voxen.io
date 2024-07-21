const fromArea = s('.from__area')
const fromLabel = s('.from__label')
const exchangeBtn = s('.exchange__btn')
const toLabel = s('.to__label')
const toArea = s('.to__area')
const convertBtn = s('.convert__btn')

const ancode = new ANCode()

let HumanToANCode = true
let placeholder = 'placeholder'

//// placeholder
////
const getPlaceholder = e => e.getAttribute(placeholder)

const setPlaceholder = (e, p) => e.setAttribute(placeholder, p)

//// innerText
////
const getText = e => e.innerText

const setText = (e, txt) => e.innerText = txt


//// register exchange btn click
//// 
registerOnClick(
  exchangeBtn,
  e => {
    let fromAreaPlaceholder = getPlaceholder(fromArea)

    setPlaceholder(fromArea, getPlaceholder(toArea))

    setPlaceholder(toArea, fromAreaPlaceholder)


    let fromLabelText = getText(fromLabel)

    setText(fromLabel, getText(toLabel))
    setText(toLabel, fromLabelText)


    HumanToANCode = !HumanToANCode
    fromArea.value = ''
    toArea.value = ''

    fromArea.focus()
  })

//// register to area click 
//// 
registerOnClick(
  toArea,
  e => copyContent(e.target))

//// register convert btn click
//// 
registerOnClick(
  convertBtn,
  e => {
    let input = fromArea.value

    if (input.isEmpty()) return

    toArea.value = HumanToANCode ?
      ancode.code(input) :
      ancode.plain(input)
  })