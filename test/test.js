
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	diffStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-diff', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( diffStream ).to.be.a( 'function' );
	});

	it( 'should calculate the difference between successive streamed data values', function test( done ) {
		var data, expected, dStream;

		// Simulate some data...
		data = [ 2, 3, 1.5, 2, 10, 15, 100, 102 ];

		// Expected values:
		expected = [ 1, -1.5, 0.5, 8, 5, 85, 2 ];

		// Create a new difference stream:
		dStream = diffStream().stream();

		// Mock reading from the stream:
		utils.readStream( dStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, dStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}

			done();
		} // end FUNCTION onRead()
	});

});