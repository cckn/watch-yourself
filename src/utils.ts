import fs from 'fs'

export const getLocalISOTime = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000 //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1)

  return localISOTime.split(/T|:|\./)
}

export const mkdir = (path: string) => {
  if (fs.existsSync(path)) return
  fs.mkdirSync(path, { recursive: true })
}
