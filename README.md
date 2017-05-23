flow-diff
=========

Transform stream factory to calculate the difference between successive streamed data values.


## Installation

``` bash
$ npm install flow-diff
```

## API

To create a stream factory,

``` javascript
var diffStream = require( 'flow-diff' );

// Create a new factory:
var dStream = diffStream();
```

### dStream.stream()

To create a new difference stream,

``` javascript
var stream = dStream.stream();
```


## Usage

Methods are chainable.

``` javascript
diffStream()
	.stream()
	.pipe( /* writable stream */ );
```



## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	dStream = require( 'flow-diff' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round(Math.random()*10);
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new difference stream:
var stream = dStream().stream();

// Pipe the data:
readStream
	.pipe( stream )
	.pipe( eventStream.map( function( d, clbk ){
		clbk( null, d.toString()+'\n' );
	}))
	.pipe( process.stdout );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have globally installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

