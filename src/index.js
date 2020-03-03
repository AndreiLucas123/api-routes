#!/usr/bin/env node


if (process.argv[2]) {
    require('./new-api-file')(process.argv[2])
    require('./task-resolve-api-files')()
} else {
    require('./task-resolve-api-files')()
}