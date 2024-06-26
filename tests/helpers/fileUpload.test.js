import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config( {
    cloud_name: 'demxdolo4',
    api_key: '842582517776318',
    api_secret: 'nR0W4j2-PGg67Rx56y2FLnyiSRo',
    secure: true
} );


describe( 'Pruebas en fileUpload', () => {

    test( 'Debe subir el archivo correctamente a Claudinary ', async () => {

        const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File( [blob], 'foto.jpg' );
        const url = await fileUpload( file );

        expect( typeof url ).toBe( 'string' );
        // console.log( url );

        const segments = url.split( '/' );         // console.log( segments );
        const imageId = segments[segments.length - 1].replace( '.jpg', '' );        // console.log( imageId );

        const cloudResp = await cloudinary.api.delete_resources( 'journal/' + imageId, {
            resource_type: 'image'
        } );
        // console.log( cloudResp );

    } );

    test( 'Debe retornar Null ', async () => {

        const file = new File( [], 'foto.jpg' );
        const url = await fileUpload( file );

        expect( url ).toBe( null );

    } );


} );
