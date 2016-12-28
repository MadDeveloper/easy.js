module.exports = {
    'component.router': {
        path: 'core/Router',
        dependencies: []
    },
    'component.bundlemanager': {
        path: 'core/BundleManager',
        dependencies: []
    },
    'component.entitymanager': {
        path: 'database/EntityManager',
        dependencies: []
    },
    'component.database': {
        path: 'database/Database',
        dependencies: []
    },
    'component.logfilemanager': {
        path: 'log/LogFileManager',
        dependencies: [ 'easy.application' ]
    },
    'component.logwriter': {
        path: 'log/LogWriter',
        dependencies: [ 'component.logfilemanager' ]
    },
    'component.logger': {
        path: 'log/Logger',
        dependencies: [ 'component.logwriter' ]
    }
}
