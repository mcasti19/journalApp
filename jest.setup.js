// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import { getEnvironments } from './src/helpers/getEnvironments';
// import 'setImmidiate'; // <-- Esto es solamente si la config de Cloudinary falla e indica que el setImmidiate is not define

require( 'dotenv' ).config( {
    path: '.env.test'
} );


jest.mock( './src/helpers/getEnvironments', () => ( {
    getEnvironments: () => ( { ...process.env } )
} ) )