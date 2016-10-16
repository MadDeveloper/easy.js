# Scripts NPM

| Script | Description|
|------|------------|
| build | transpile `src/` directory from ES2015 to ES5 into `build/` directory (do not transpile `src/bin/` directory) |
| build:all | transpile like `build` command, including `src/bin/` directory |
| build:bin | transpile only `src/bin/` directory |
| build:watch | build project and watching for files changes (do not include `src/bin/` directory |
| bundles:new | create new bundle with easy.js assistant |
| bundles:restore:skeleton | restore `src/bundles/skeleton/` bundles at it initial state |
| bundles:routes | display all routes defined in bundles (can be saved with `--save` option) |
| clean:build | clean entire `build/` directory |
| clean:logs | clean entire `logs/` directory |
| db:import | import sql file (at path: `src/config/database/*.sql`) following database name defined into configurations |
| db:migrate | (re)create database with `src/config/database/schema.js` file |
| debug | run project with node debug |
| generate:doc | generate api doc with all files into `doc/` directory for each bundle |
| make:bin | make bin directories into `build/` (and build if doesn't already exist) |
| start | start project with nodemon |
| start:forever | start project for production |
| test | launch all tests with jasmine |