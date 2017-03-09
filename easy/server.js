/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const { application } = require( './bootstrap' )
const { Server } = require( 'easy/core' )
const server = new Server( application )

server.start()
