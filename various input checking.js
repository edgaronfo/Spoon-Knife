// Now, let's move it. Add next few lines to create() method: 

        //  Game input
        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this._space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // following keys will not be propagated to browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);

// With this we say which keys we will use and we also prevent propagating presses of these keys to browser - it will be consumed by our game.
// Beside this we have to add update() method to our State class. This method is called every frame and we will check key presses in it:

    update() {
        // shortcut
        var keyboard: Phaser.Keyboard = this.game.input.keyboard;

        // left and right key
        if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
            // move left...
        } else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            // move right...
        } else if (this._space.justDown) {  
			// fire button...
        }
    }

// ***************************************************************************************************************
	
// Adding keyboard input
// For listening to keyboard input, we first have to let Phaser know which keys we want to observe.
function init() {
	// Listen to space & enter keys
	var keys = [Phaser.KeyCode.SPACEBAR, Phaser.KeyCode.ENTER];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);
}

// Then in update() we loop over the keys, and check whether or not they were just pressed. If they were, we fire a laser.

function update() {
 
	// Loop over the keys
	for (var index in phaserKeys) {
		// Save a reference to the current key
		var key = phaserKeys[index];
		// If the key was just pressed, fire a laser
		if (key.justDown) {
			fireLaser();
		}
	}
	// ...
}

// ***************************************************************************************************************

listenSwipe(function(direction) {	
	console.log(direction);
});

function listenSwipe(callback) {	
	var eventDuration;	
	var startPoint = {};	
	var endPoint = {};	
	var direction;	
	var minimum = {		
		duration: 75,		
		distance: 150	
	}
	
	game.input.onDown.add(function(pointer) {		
		startPoint.x = pointer.clientX;		
		startPoint.y = pointer.clientY;	
	}, this);	
	
	game.input.onUp.add(function(pointer) {		
		direction = '';		
		eventDuration = game.input.activePointer.duration;		
		if (eventDuration > minimum.duration) {			
			endPoint.x = pointer.clientX;			
			endPoint.y = pointer.clientY;			
			// Check direction			
			if (endPoint.x - startPoint.x > minimum.distance) {				
				direction = 'right';			
			} else if (startPoint.x - endPoint.x > minimum.distance) {				
				direction = 'left';			
			} else if (endPoint.y - startPoint.y > minimum.distance) {				
				direction = 'bottom';			
			} else if (startPoint.y - endPoint.y > minimum.distance) {				
				direction = 'top';			
			}			
			if (direction) {				
				callback(direction);			
			}		
		}	
	}, this);
};

// ***************************************************************************************************************

var swipeCoordX,        
    swipeCoordY,        
    swipeCoordX2,        
    swipeCoordY2,        
    swipeMinDistance = 100;    

game.input.onDown.add(function(pointer) {        
	swipeCoordX = pointer.clientX;        
	swipeCoordY = pointer.clientY;        
}, this);    

game.input.onUp.add(function(pointer) {        
	swipeCoordX2 = pointer.clientX;        
	swipeCoordY2 = pointer.clientY;        
	if(swipeCoordX2 < swipeCoordX - swipeMinDistance){            
		console.log("left");        
	}else if(swipeCoordX2 > swipeCoordX + swipeMinDistance){            
		console.log("right");        
	}else if(swipeCoordY2 < swipeCoordY - swipeMinDistance){            
		console.log("up");        
	}else if(swipeCoordY2 > swipeCoordY + swipeMinDistance){            
		console.log("down");        
	}    
}, this);

// ***************************************************************************************************************

