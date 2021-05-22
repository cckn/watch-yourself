import path from 'path'
import screenshot from 'screenshot-desktop'

import { getLocalISOTime, mkdir } from './utils'
import config from './config.json'

console.log('config')
console.table(config)

const save = async () => {
  const [date, h, m] = getLocalISOTime()

  const displays = await screenshot.listDisplays()

  displays.forEach(async (display, index: number) => {
    const dirPath = path.join(config.path, date, `${index}`)
    mkdir(dirPath)

    const imgpath = path.join(dirPath, `${h}_${m}.png`)
    const res = await screenshot({ screen: display.id, filename: imgpath })
    console.log(res)
  })
  console.log()
}

save()

setInterval(() => {
  save()
}, 1000 * 60)
