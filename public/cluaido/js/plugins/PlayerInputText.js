/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Version 1.1.1] [Gamer Tools Studio]
 * @author Gamer Tool Studio
 *
 * @command PlayerInput
 * @text Player Input
 * @desc Allows the player to input their own message.
 *
 * @arg actorName
 * @text Actor Name
 * @desc The name of the actor. Default is main player name.
 * @type text
 * @default
 *
 * @arg actorFaceImage
 * @text Actor Face Image
 * @desc The face image of the actor. Default is main player image.
 * @type file
 * @dir img/faces/
 * @default
 *
 * @arg actorFaceImageIndex
 * @text Actor Face Image Index
 * @desc The face image index of the actor. Default is main player face index.
 * @type number
 * @default 0
 *
 * @arg placeholderText
 * @text Placeholder Text
 * @desc The placeholder text. Default is "Enter your message...".
 * @type text
 * @default Enter your message...
 *
 * @arg inputVariable
 * @text Input Variable
 * @desc The variable to store the input text. Default is variable 19.
 * @type variable
 * @default 19
 *
 * @help PlayerInputText.js
 *
 * Allows players to input text in a Show Text window with the style of the game window skins and store it in a custom variable.
 * Use the plugin command "Player Input" in an event to trigger this feature.
 */

(() => {
    const pluginName = "PlayerInputText";

    PluginManager.registerCommand(pluginName, "PlayerInput", args => {
        const actorName = args.actorName || $gameParty.leader().name();
        const actorFaceImage = args.actorFaceImage || $gameParty.leader().faceName();
        const actorFaceImageIndex = parseInt(args.actorFaceImageIndex, 10) || $gameParty.leader().faceIndex();
        const placeholderText = args.placeholderText ? args.placeholderText : 'Enter your message...';

        // Set up the game message with speaker name and face image, but no text.
        $gameMessage.setFaceImage(actorFaceImage, actorFaceImageIndex);
        $gameMessage.setSpeakerName(actorName);
        $gameMessage.add(placeholderText);

        // Ensure the message window activates input mode once it's open.
        const scene = SceneManager._scene;
        if (scene instanceof Scene_Map) {
            const messageWindow = scene._messageWindow;
            if (messageWindow) {
                messageWindow.prepareInputWindow(args);
                messageWindow.activateInput();
            }
        }
    });

    // Prepare Input
    Window_Message.prototype.prepareInputWindow = function(args) {
        this._inputArgs = args;
        this._inputVariable = parseInt(args.inputVariable, 10) || 19;
        this._inputLines = [''];

        // Set speaker name to actorName each time before displaying the input window.
        const actorName = args.actorName || $gameParty.leader().name();
        $gameMessage.setSpeakerName(actorName);

        this.activateInput();
        this.open();
        this.setPositionType();
        this.refreshInputWindow(); // This will now reflect the updated speakerName
    };

    Window_Message.prototype.setPositionType = function() {
        // Position type: 0 (top), 1 (middle), 2 (bottom)
        const positionType = 2; // Force to bottom for input
        this.y = this.calculateY(positionType);
    };

    Window_Message.prototype.calculateY = function(positionType) {
        const messageY = {
            0: 0, // Top
            1: (Graphics.boxHeight - this.height) / 2, // Middle
            2: Graphics.boxHeight - this.height // Bottom
        };
        return messageY[positionType];
    };

 	// Activate Input
	Window_Message.prototype.activateInput = function() {
		if (this._inputActive) return; // Prevent multiple activations

		this._originalKeyMapper = Object.assign({}, Input.keyMapper);
		this._overrideKeyMapperForTextInput();

		this._inputActive = true;
		this._boundHandleInput = this.handleInput.bind(this);
		document.addEventListener('keydown', this._boundHandleInput);

		this._lastInputTime = 0; // Debounce setup
		this.refreshInputWindow();
	};

	// Deactivate Input
	Window_Message.prototype.deactivateInput = function() {
		document.removeEventListener('keydown', this._boundHandleInput);
		Input.keyMapper = this._originalKeyMapper;
		this._inputActive = false;
	};

	// Temporarily override key mappings for special keys.
	Window_Message.prototype._overrideKeyMapperForTextInput = function() {
		Input.keyMapper[32] = 'space'; 
		Input.keyMapper[90] = 'z';     
		Input.keyMapper[88] = 'x';
		Input.keyMapper[87] = 'w';
		Input.keyMapper[80] = 'p';
	};

    // Handle Input
    Window_Message.prototype.handleInput = function(event) {
        if (!this._inputActive || !this.isOpen()) return;

        const currentLineIndex = this._inputLines.length - 1;
        let currentLine = this._inputLines[currentLineIndex];

        if (event.key === 'Enter') {
            this.processInput();
            event.preventDefault();
        } else if (event.key === 'Backspace') {
            if (currentLine.length > 0) {
                this._inputLines[currentLineIndex] = currentLine.slice(0, -1);
            } else if (this._inputLines.length > 1) {
                this._inputLines.pop();
            }
            this.refreshInputWindow();
        } else if (event.key.length === 1) {
            if (currentLine.length < 40) {
                this._inputLines[currentLineIndex] += event.key;
            } else if (this._inputLines.length < 4) {
                this._inputLines.push(event.key);
            }
            this.refreshInputWindow();
        }
    };

    // Process Input
    Window_Message.prototype.processInput = function() {
        const inputText = this._inputLines.join('\n');
        $gameVariables.setValue(this._inputVariable, inputText);
        this.deactivateInput();
        this.close();

        // Reset the speakerName after processing the input.
        $gameMessage.setSpeakerName('');
    };

    // Refresh Input Window
    Window_Message.prototype.refreshInputWindow = function() {
        if (!this._inputLines) {
            return; // Guard clause
        }
		
		// Face Image and text input positioning
		const faceImageWidth = 144;
		const textMargin = 15;
		const textStartX = faceImageWidth + textMargin;


		// This sets the text to start at the very top of the window.
		const textStartY = 0;


		// This ensures the actor's face image remains on the screen.
		this.contents.clearRect(textStartX, textStartY, this.contents.width - textStartX, this.contents.height);

		this.resetFontSettings();

		const args = this._inputArgs;

        
        const textToShow = this._inputLines.join('').trim() !== '' ? this._inputLines.join('\n') : "Enter your message...";

        // Draw the text at the calculated position.
        this.drawTextEx(textToShow, textStartX, textStartY);
    };

    // Clear contents
    Window_Message.prototype.clear = function() {
        this.contents.clear(); // Clears the window's drawing contents
        this._textState = null; // Reset text state
    };
})();