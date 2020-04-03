const glob = require('glob')
const path = require('path')
const fs = require('fs')

/**
 * Tarefa para criar o arquivo src/api/index.ts corretamente
 */
function taskResolveApiFiles() {
  createFolder()
  const fileArray = glob
    .sync('src/api/**/*.ts')
    .filter(f => path.basename(f) !== 'routes.ts')

  const imports = fileArray
    .map((f, i) => `import { router as r${i} } from '${format(f)}'`)
    .join('\n')
  const uses = fileArray
    .map((f, i) => `  app.use('/${path.basename(f, '.ts')}', r${i});`)
    .join('\n')

  const content = `import { Express } from 'express'
${imports}

export function useRoutes(app: Express) {
${uses}
}`

  function format(s) {
    return './' + s.substring(8, s.length - 3)
  }

  const file_path = 'src/api/routes.ts'
  let msg
  if (fs.existsSync(file_path)) {
    msg = `"${file_path}" overwritten`
  } else {
    msg = `"${file_path}" created`
  }
  fs.writeFileSync(file_path, content)
  console.log(msg)
}

function createFolder() {
  if (!fs.existsSync('src')) {
    try {
      fs.mkdirSync('src')
    } catch (err) {
      console.log(err)
    }
  }
  if (!fs.existsSync('src/api')) {
    try {
			fs.mkdirSync('src/api')
			const examplePath = 'src/api/example.ts'
			fs.writeFileSync('src/api/example.ts', `import { Router } from 'express'
export const router = Router()

router.get('/', (req, res) => {
		res.send('Hello World Example')
})`)
			console.log(`"${examplePath}" created`)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = taskResolveApiFiles
