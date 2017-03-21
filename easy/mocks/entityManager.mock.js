/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const entityManager = jasmine.createSpyObj( 'em', [
    'repository',
    'model',
    'getCollection',
    'database',
    'reset'
])

entityManager.reset = () => {
    for( let property in entityManager ) {
        if ( entityManager.hasOwnProperty( property ) && entityManager[ property ].hasOwnProperty( 'calls' ) ) {
            entityManager[ property ].calls.reset()
        }
    }
}

const container = easy.application.container

container.set( 'entitymanager', entityManager )

module.exports = entityManager
