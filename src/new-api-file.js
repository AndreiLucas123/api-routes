const path = require('path')
const fs = require('fs')

/**
 * Tarefa para criar o arquivo da api
 */
function newApiFile(name) {
    const content = `import { Router } from 'express'
export const router = Router()


router.get('/', (req, res) => {
    res.send('Get ${name} works')
})`
    
    
    fs.writeFileSync(`src/api/${name}.ts`, content)
    
    console.log(`File ${name} created`)
}

module.exports = newApiFile