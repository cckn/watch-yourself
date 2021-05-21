console.log('Hello World')
import fs from 'fs'
import path from 'path'
import screenshot from 'screenshot-desktop'

const dir = 'd:\\'
console.log(__dirname)

function getLocalISOTime() {
  const tzoffset = new Date().getTimezoneOffset() * 60000 //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1)

  return localISOTime.split(/T|:/)
}
const save = async () => {
  const [date, h, m] = getLocalISOTime()

  const dirname = path.join(dir, date)
  if (!fs.existsSync(dirname)) {
    fs.mkdir(dirname, () => {})
  }

  const displays = await screenshot.listDisplays()

  displays.forEach(async (display, index: number) => {
    const imgpath = path.join(dirname, `${h}_${m}-` + index + '.png')

    const res = await screenshot({ screen: display.id, filename: imgpath })
    console.log(res)
  })
  console.log()
}

save()

setInterval(() => {
  save()
}, 1000 * 60)
