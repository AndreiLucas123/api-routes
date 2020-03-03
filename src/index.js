#!/usr/bin/env node


if (process.argv[2] === 'new' && process.argv[3]) {
    require('./new-api-file')(process.argv[3])
} else {
    require('./task-resolve-api-files')()
}