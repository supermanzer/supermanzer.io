import chokidar from 'chokidar'
const dir = process.cwd() + '/content/blog'
console.log('watching (native, no polling):', dir)
const w = chokidar.watch(dir, { ignoreInitial: true })
w.on('change', p => console.log('NATIVE-CHANGE-EVENT:', p, Date.now()))
w.on('ready', () => console.log('READY', Date.now()))
