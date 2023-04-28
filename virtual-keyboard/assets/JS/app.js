const body = document.querySelector(`body`)

let language = localStorage.getItem('language') ? localStorage.getItem('language') : 'Eng'
let shiftFlag = false
let ctrl = false
let shift = false


localStorage.setItem('language', language)
const checkKey = (key) => {
    switch (key){
        case 'Space':
            input.value += ' '
            break
        case 'Tab':
            input.value += '\t'
            break
        case 'CapsLock':
            capsMode = !capsMode
            document.querySelectorAll('.key').forEach((keyButton)=>{
                if (keyButton.textContent == 'CapsLock') {
                    keyButton.classList.toggle('capsMode')
                }
            })
            console.log('caps lock:',capsMode)
            document.querySelectorAll('.key').forEach((elem)=>{
                if (!elem.classList.contains('wide-key')) {
                    elem.textContent = capsMode? elem.textContent.toUpperCase() : elem.textContent.toLowerCase()
                }
            })
            break
        case 'Backspace':
            let inputText = input.value.split('')
            inputText.pop()
            input.value = inputText.join('')
            break
        case 'ControlRight':
        case 'Win':
        case 'AltLeft':
        case 'AltRight':
        case '←':
        case '↓':
        case '→':
        case 'Enter':
            break
        case 'Space':
            input.value += ' '
        case 'ShiftLeft':
        case 'ShiftRight':
            shift = true
            if (ctrl) {
                language = language == 'Eng' ? 'Rus' : 'Eng'
                console.log('changed language to', language)
                keyboard.innerHTML = ''
                fillKeyboard(language)
                console.log(ctrl)
                console.log(shift)
                break
            }
            if(!shiftFlag){
                capsMode = !capsMode
            }
            shiftFlag = true
            document.querySelectorAll('.key').forEach((elem)=>{
                if (!elem.classList.contains('wide-key')) {
                    elem.textContent = capsMode? elem.textContent.toUpperCase() : elem.textContent.toLowerCase()
                }
            })
            break
        case 'ControlLeft':
            ctrl = true
            console.log(ctrl)
            console.log(shift)
            if (shift) {
                language = language == 'Eng' ? 'Rus' : 'Eng'
                console.log('changed language to', language)
                keyboard.innerHTML = ''
                fillKeyboard(language)
            }
            break
        default:
            input.value += key
            break
    }
}


const winEngKeys = [['`',        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
                    ['Tab',      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
                    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
                    ['ShiftLeft','z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'ShiftRight'],
                    ['ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ControlRight', '←', '↓', '→']]

const winRusKeys = [['`',       '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
                    ['Tab',      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
                    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', "ж", 'э'],
                    ['ShiftLeft','я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'ShiftRight'],
                    ['ControlLeft', 'Win', 'AltLeft', 'Пробел', 'AltRight', 'ControlRight', '←', '↓', '→']]

const winEngAuxiliaryKeys = ['ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ShiftLeft','ShiftRight', 'Backspace', 'Tab','CapsLock', 'Пробел']

let capsMode = false

const pressedKeys = []

body.innerHTML += `<textarea class="input-result">${localStorage.getItem('inputValue')}</textarea>`

body.innerHTML += `<div class="keyboard-container"></div>`
const keyboard = document.querySelector(`.keyboard-container`)

let input = document.querySelector('.input-result')
localStorage.setItem('inputValue', input.value? input.value:'');

const fillKeyboard = (lang) =>{
    (lang == 'Eng' ? winEngKeys : winRusKeys).forEach((keyRow)=>{
        let row = document.createElement('div')
        row.classList.add('row')
        keyboard.appendChild(row)
        keyRow.forEach((key)=>{
            let keyButton = document.createElement('button')
            keyButton.classList.add('key')
            if (winEngAuxiliaryKeys.includes(key)) {keyButton.classList.add('wide-key')}
            if (key == 'Space'| key == 'Пробел') {keyButton.classList.add('space-key')}
            keyButton.textContent = key
            row.appendChild(keyButton)
        })
    })
}


document.addEventListener('click', (target) => {
    if (target.target.classList.contains('key')) {
        let key = target.target.textContent
        console.log('pressed key', key)
        checkKey(key)
    }
})

window.addEventListener('beforeunload', ()=>{
    localStorage.setItem('inputValue', input.value)
    console.log(language)
    localStorage.setItem('language', language)
})

document.addEventListener('keydown', (key)=>{
    keyboard.querySelectorAll('.key').forEach((keyButton)=>{
        if (keyButton.textContent == (key.key.replace(/\s/g, (language=='Eng'?'Space':'Пробел')).length == 1 ? key.key : key.code).replace('Space', (language=='Rus'?'Пробел':'Space'))) {
            console.log(key.key.replace(/\s/g, 'Space'))
            keyButton.classList.add('pressed-key')
            checkKey((key.key.replace(/\s/g, 'Space').length == 1 ? key.key : key.code))
        }
    })
    
})

document.addEventListener('keyup', (key)=>{
    keyboard.querySelectorAll('.key').forEach((keyButton)=>{
        if (keyButton.textContent == (key.key.replace(/\s/g, 'Space').length == 1 ? key.key : key.code).replace('Space', (language=='Rus'?'Пробел':'Space'))) {
            keyButton.classList.remove('pressed-key')
            if (key.key == 'Shift') {
                if(shiftFlag){
                    capsMode = !capsMode
                }
                shiftFlag = false
                shift = false
                document.querySelectorAll('.key').forEach((elem)=>{
                    if (!elem.classList.contains('wide-key')) {
                        elem.textContent = capsMode? elem.textContent.toUpperCase() : elem.textContent.toLowerCase()
                    }
                })
            }
            if (key.key == 'Control') {
                ctrl = false
            }
        }
    })
})

fillKeyboard(language)

//     if (key.key === 'Tab') {
//         input.textContent += '  '
//     } else if (!winEngAuxiliaryKeys.includes(key.key)) {
//         input.textContent += key.key
//     }
// })