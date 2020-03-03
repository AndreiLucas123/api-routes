const glob = require('glob')
const path = require('path')
const fs = require('fs')

/**
 * Tarefa para criar o arquivo src/api/index.ts corretamente
 */
function taskResolveApiFiles() {
    const fileArray = glob.sync('src/api/**/*.ts')
        .filter(f => path.basename(f) !== 'index.ts')
    
    
    const imports = fileArray.map((f, i) => `import { router as r${i} } from '${format(f)}'`).join('\n')
    const uses = fileArray.map((f, i) => `    app.use('/${path.basename(f, '.ts')}', r${i});`).join('\n')
    

    const content = `import { Express } from 'express'
    ${imports}
    

export function configureApi(app: Express) {
${uses}
}`
    

    function format(s) {
        return './' + s.substring(8, s.length - 3)
    }
    
    
    fs.writeFileSync('src/api/index.ts', content)
    
    console.log('Task finished')
}

module.exports = taskResolveApiFiles