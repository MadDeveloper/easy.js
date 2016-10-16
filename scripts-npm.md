# Scripts NPM

| Name | Description|
|------|------------|
| build | | build:all | | build:all:once || build:bin || build:watch | "bundles:new": "node build/bin/bundles/new", "bundles:restore:skeleton": "node build/bin/bundles/restore", "bundles:routes": "node build/bin/bundles/routes", "clean:build": "rm -rf build/* ", "clean:logs": "rm -rf logs/*.log", "db:import": "node build/bin/database/import", "db:migrate": "node build/bin/database/migrate", "debug": "node --expose-gc debug build/app.js", "generate:doc": "apidoc -i src/ -e skeleton/ -o doc/", "make:bin": "node make-bin", "postinstall": "npm run build:all:once", "start": "nodemon -w build --expose-gc build/app.js", "start:forever": "node --expose-gc build/app.js > stdout.txt 2> stderr.txt &", "test": "node build/bin/tests"
