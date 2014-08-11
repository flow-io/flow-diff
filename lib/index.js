/**
*
*	STREAM: diff
*
*
*	DESCRIPTION:
*		- Transform stream factory to calculate the difference between successive streamed data values.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/08/10: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] through2
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Through module:
		through2 = require( 'through2' );


	// FUNCTIONS //

	/**
	* FUNCTION: onData()
	*	Returns a callback which calculates the difference between successive streamed data values.
	*
	* @private
	* @returns {Function} callback
	*/
	function onData() {
		var diff = 0,
			oldVal = 0;

		/**
		* FUNCTION: onData( newVal, encoding, clbk )
		*	Data event handler. Calculates the difference.
		*
		* @private
		* @param {Number} newVal - new streamed data value
		* @param {String} encoding
		* @param {Function} clbk - callback to invoke after calculating the difference. Function accepts two arguments: [ error, chunk ].
		*/
		return function onData( newVal, encoding, clbk ) {
			diff = newVal - oldVal;
			oldVal = newVal;
			clbk( null, diff );
		}; // end FUNCTION onData()
	} // end FUNCTION onData()


	// STREAM //

	/**
	* FUNCTION: Stream()
	*	Stream constructor.
	*
	* @constructor
	* @returns {Stream} Stream instance
	*/
	function Stream() {
		return this;
	} // end FUNCTION Stream()

	/**
	* METHOD: stream()
	*	Returns a through stream for calculating the difference between successive streamed data values.
	*
	* @returns {object} through stream
	*/
	Stream.prototype.stream = function() {
		return through2( {'objectMode': true}, onData() );
	}; // end METHOD stream()


	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();