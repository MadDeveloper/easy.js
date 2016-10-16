# Scripts NPM

| Name | Description|
|------|------------|
| build ||
| build:all ||
| build:all:once ||
| build:bin ||
| build:watch ||
| bundles:new ||
| bundles:restore:skeleton ||
| bundles:routes ||
| clean:logs ||
| db:import ||
| db:migrate ||
| debug ||
| generate:doc": "apidoc -i src/ -e skeleton/ -o doc/", "make:bin": "node make-bin", "postinstall": "npm run build:all:once", "start": "nodemon -w build --expose-gc build/app.js", "start:forever": "node --expose-gc build/app.js > stdout.txt 2> stderr.txt &", "test": "node build/bin/tests"
