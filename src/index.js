const http = require( 'http' );

const PORT = process.env.PORT || 3000;
const BASEURL = process.env.BASEURL || 'http://localhost/';

const app = http.createServer( ( req, res ) => {
	let { pathname: requestPath } = new URL( req.url, BASEURL );

	// Remove trailing slash from the request path, if exists.
	requestPath = ( requestPath.length > 1 && requestPath.endsWith( '/' ) ) ? requestPath.slice( 0, -1 ) : requestPath;

	if ( '/' === requestPath && [ 'GET', 'HEAD' ].includes( req.method ) ) {
		res.writeHead( 200 );
		res.end( "Howdy!" );
		return;
	}

	// Used by the monitoring system on VIP to verify the health of the app
	// Should return 200 when the app is healthy
	// https://docs.wpvip.com/technical-references/vip-platform/node-js/
	if ( '/cache-healthcheck' === requestPath && [ 'GET', 'HEAD' ].includes( req.method ) ) {
		res.writeHead( 200 );
		res.end( );
		return;
	}

	res.writeHead( 404 );
	res.end( );
} );


app.on( 'listening', () => {
	console.log( 'App is listening on port:', PORT );
} );

app.listen( PORT );
