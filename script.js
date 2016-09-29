//////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById('bits');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//////////////////////////////////////////////////////////////////////////////

setInterval(world,30);

//////////////////////////////////////////////////////////////////////////////

var bitsArrs = [];
function generateBitArrs(count) {
	for (var i = 0; i < count; i++) {
		bitsArrs.push(new BitArray());
	}
}; generateBitArrs(100);

//////////////////////////////////////////////////////////////////////////////

function clearCanvas() {
	context.fillStyle = "#000";
	context.fillRect(0,0,canvas.width,canvas.height);
}

function randomBetween(min,max) {
	return Math.floor((Math.random()*(max - min)+min));
}

//////////////////////////////////////////////////////////////////////////////

function world() {
	clearCanvas();
	for (var i = 0; i < bitsArrs.length; i++) {
		bitsArrs[i].update().draw();
	}
}

//////////////////////////////////////////////////////////////////////////////

function getRandomCharacter() {
    var text = "";
    var possible =
		"'`~!@#$%^&*()_+=-";
		// "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
		// "abcdefghijklmnopqrstuvwxyz"+
		// "0123456789";
    for( var i=0; i < randomBetween(5,100); i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

//////////////////////////////////////////////////////////////////////////////

function BitArray() {
	this.x = randomBetween(0, canvas.width);
	this.arr = [];
	this.fontSize = randomBetween(5, 10);
	this.maxTick = 1;
	this.tick = this.maxTick;

	this.generateBits = function() {
		for (var i = 0; i < canvas.height; i+=(this.fontSize + 5)) {
			this.arr.push(new Bit(this.x, i, this.fontSize));
		}
	}; this.generateBits();
	this.start = randomBetween(0,this.arr.length);
	this.end = this.start + parseInt(this.arr.length/randomBetween(0,5));

	this.update = function() {
		this.tick++;

		if (this.tick >= this.maxTick) {
			this.tick = 0;

			this.start++; this.end++;

			if (this.start >= this.arr.length) this.start = 0;
			if (this.end >= this.arr.length) this.end = 0;

			if (this.start < this.end) {
				for (var i = 0; i < this.arr.length; i++) {
					if (i >= this.start && i <= this.end) this.arr[i].isActive = true;
					else this.arr[i].isActive = false;
				}
			}
			else if (this.start > this.end) {
				for (var i = 0; i < this.arr.length; i++) {
					if (i >= this.start || i <= this.end) this.arr[i].isActive = true;
					else this.arr[i].isActive = false;
				}
			}
		}

		for (var i = 0; i < this.arr.length; i++) {
			(this.arr)[i].update();
		}

		return this;
	}

	this.draw = function() {
		for (var i = 0; i < this.arr.length; i++) {
			(this.arr)[i].draw();
		}
	}
}

function Bit(x, y, f) {
	this.x = x;
	this.y = y;
	this.fontSize = f;
	this.isActive = false;
	this.test = true;
	this.text = getRandomCharacter();

	this.update = function() {
		if (!this.isActive) this.text = getRandomCharacter();
		this.y+=this.fontSize/5;
		if (this.y > canvas.height+this.fontSize) this.y = 0;
	}

	this.draw = function() {
		// context.shadowBlur = 15;
		context.shadowColor = "#36CDFF";
		context.fillStyle = "#36CDFF";

		context.font = this.fontSize + "px Arial";
		if (this.isActive) context.fillText(this.text, this.x, this.y);
	}
}

//////////////////////////////////////////////////////////////////////////////
