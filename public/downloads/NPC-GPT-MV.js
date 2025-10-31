/*:
 * @plugindesc [RPG Maker MV] [Version 1.0] [Gamer Tool Studio]
 * @author Gamer Tool Studio
 *
 * @param apiKey
 * @text API Key
 * @desc Enter your GPT / OpenAI API key here (if not using a variable).
 * @default
 *
 * @param apiKeyVariable
 * @text API Key Variable ID
 * @type variable
 * @desc Game variable that can store the API key (used if the above param is empty).
 * @default 18
 *
 * @param gptResponseVariableId
 * @text GPT Response Variable ID
 * @type variable
 * @desc Game variable that stores the GPT response object.
 * @default 6
 *
 * @help
 ===============================================================================
 * Introduction
 ===============================================================================
 *
 * This plugin enables the deployment of dynamic AI-powered conversations
 * with NPCs in RPG Maker MZ game events by sending user inputs to a server 
 * and displaying the server's creative responses wrapped neatly in the game 
 * as one of your characters. Craft interactive conversations with artificial 
 * intelligence, immersing players in captivating stories and engaging gameplay.
 *
 * Features include, but are not limited to, the following:
 *
 *  1) Player text input (with or without a face image).
 *  2) Creating and storing NPC "characterContext" for advanced dialogue.
 *  3) Sending user requests and context to a remote GPT-like API.
 *  4) Displaying response from the AI character in a showTextWindow.
 *  5) Wraps both user input and AI responses at a specified line length.
 *
 ===============================================================================
 * Requirements
 ===============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations         
 * of RPG Maker.
 * 
 * ------ API KEY ------
 *
 * You need to have an account with Gamer Tools Studio and an active API KEY
 * to be able to connect and send requests to NPC-GPT API. You can
 * create an account and activate a FREE TRIAL to get your key at
 * https://gamertoolstudio.com. 
 * 
 * =============================================================================
 * Plugin Parameters
 *==============================================================================
 *
 * The plugin has three parameters that you need to configure.
 *
 * --- 
 *    
 * API Key 
 *
 * This key is required for making requests to the server. Log in
 * to your account with Gamer Tool Studio and activate your key at 
 * https://gamertoolstudio.com. Enter your API key in the "API Key"
 * parameter.
 *  
 * ---
 * 
 * API Key Variable
 * 
 * This is the ID of a variable used to store the API key and to authenticate 
 * the requests with NPC-GPT API. 
 * 
 * ---
 * 
 * GPT Response Variable ID
 * 
 * This is the ID of the variable where the characters responses provided by the 
 * server is temporarily stored. It is used to display the NPC response in the game and 
 * is updated every single request.You can leave it as the
 * default value (6) or change it to a different variable ID.
 * 
 * =============================================================================
 * Commands List
 *==============================================================================
 *
 * 1) InputBlank <variableId> <placeholderText> <wrapTextLength>
 *    Example: InputBlank 19 "Enter your message" 40
 *
 * 2) InputWithImage <variableId> <placeholderText> <actorImage> <actorImageIndex> <wrapTextLength>
 *    Example: InputWithImage 19 "What is your name?" Actor1 0 40
 *
 * 3) displayResponse <variableId> <actorImage> <actorImageIndex> <statusVariableId> <wrapTextLength>
 *    Example: displayResponse 6 Actor2 5 13 40
 *
 * 4) characterContext <contextVariableId> <name> <age> <traits> <dialogueStyle> ...
 *    Example: characterContext 12 Bob 25 "Brave kind" casual "A knight from far away"
 *
 * 5) sendRequest <historyVarId> <contextVarId> <inputVar> <responseStatusVarId> <maxOutputWords>
 *    Example: sendRequest 1 12 19 13 50
 *
 * ---------------------------------------------------------------------------
 */

(function() {

    //-----------------------------------------------------------
    // 1) Helper: word-based wrapText
    //-----------------------------------------------------------
    function wrapText(text, wrapTextLength) {
    // Return as-is if wrap length is zero/invalid
    if (!wrapTextLength || wrapTextLength <= 0) return text;

    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        // If current line is empty, just set it to the word (no leading space).
        if (currentLine.length === 0) {
            currentLine = word;
        } else {
            // Check if adding this word (plus one space) exceeds wrapTextLength.
            if (currentLine.length + 1 + word.length > wrapTextLength) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine += ' ' + word;
            }
        }
    }

    // Push the last line if non-empty
    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    return lines.join('\n');
}

    //-----------------------------------------------------------
    // 2) Plugin parameter setup
    //-----------------------------------------------------------
    var parameters = PluginManager.parameters('NPC-GPT-MV');
    var apiKey             = String(parameters['apiKey'] || '');
    var apiKeyVariableId   = Number(parameters['apiKeyVariable'] || 18);
    var gptResponseVariableId = Number(parameters['gptResponseVariableId'] || 6);
	
    //-----------------------------------------------------------
    // 3) Plugin command definitions
    //-----------------------------------------------------------
    var pluginCommands = {

        // ----------------------------------------------
        // InputBlank <variableId> <placeholder> <wrapTextLength>
        // ----------------------------------------------
        'inputBlank': function(args) {
            // Arg0 = variableId
            // Arg1..N-2 = placeholder text
            // ArgN-1 = wrapTextLength
            var inputVariable = parseInt(args[0], 10) || 19;

            // The last argument is the wrap length
            var wrapTextLength = parseInt(args[args.length - 1], 10) || 40;

            // Everything between args[1] and the second to last is placeholder text
            var placeholderArray = args.slice(1, args.length - 1);
            var placeholderText = placeholderArray.join(' ') || "Enter your message...";

            // No actor image
            $gameMessage.setFaceImage('', 0);
            $gameMessage.add(placeholderText);

            // Block event progression until input is completed
            $gameMessage._isUserInputComplete = false;

            var scene = SceneManager._scene;
            if (scene instanceof Scene_Map) {
                var messageWindow = scene._messageWindow;
                if (messageWindow) {
                    messageWindow.prepareInputWindow(inputVariable, '', 0, placeholderText);
                    // Store wrap length so we can apply it upon input completion
                    messageWindow._wrapTextLength = wrapTextLength;
                    setTimeout(function() {
                        messageWindow.activateInput();
                    }, 100);
                }
            }

            $gameSystem._isWaitingForInput = true;
        },

        // ----------------------------------------------
        // InputWithImage <varId> <placeholder> <actorImage> <faceIndex> <wrapTextLength>
        // ----------------------------------------------
        'inputWithImage': function(args) {
            // Example usage:
            // InputWithImage 19 "Name?" Actor1 0 40
            // => inputVariable=19, placeholder="Name?", actorFaceImage=Actor1, index=0, wrap=40

            var inputVariable = parseInt(args[0], 10) || 19;

            // The last argument is the wrap length
            var wrapTextLength = parseInt(args[args.length - 1], 10) || 40;

            // The second to last argument is faceIndex
            var actorFaceImageIndex = parseInt(args[args.length - 2], 10) || 0;

            // The third to last argument is actorImage
            var actorFaceImage = args[args.length - 3] || '';

            // Everything in between the first arg and the third to last is placeholder text
            var placeholderArray = args.slice(1, args.length - 3);
            var placeholderText = placeholderArray.join(' ') || "Enter your message...";

            $gameMessage.setFaceImage(actorFaceImage, actorFaceImageIndex);
            $gameMessage.add(placeholderText);

            $gameMessage._isUserInputComplete = false;

            var scene = SceneManager._scene;
            if (scene instanceof Scene_Map) {
                var messageWindow = scene._messageWindow;
                if (messageWindow) {
                    messageWindow.prepareInputWindow(inputVariable, actorFaceImage, actorFaceImageIndex, placeholderText);
                    messageWindow._wrapTextLength = wrapTextLength;
                    setTimeout(function() {
                        messageWindow.activateInput();
                    }, 100);
                }
            }

            $gameSystem._isWaitingForInput = true;
        },

        // ----------------------------------------------
        // displayResponse <responseVarId> <actorImg> <actorIdx> <statusVarId> <wrapTextLength>
        // ----------------------------------------------
        'displayResponse': function(args) {
            console.log("[displayResponse] Called with args:", args);

            var responseVarId       = parseInt(args[0], 10) || 6;
            var actorImage          = args[1] || '';
            var actorImageIndex     = parseInt(args[2], 10) || 0;
            var responseStatusVarId = parseInt(args[3], 10) || 13;
            var wrapTextLength      = parseInt(args[4], 10) || 40;  

            // Retrieve text from the chosen variable
            var responseText = $gameVariables.value(responseVarId) || "No text found";

            // Word-wrap the final AI response
            responseText = wrapText(responseText, wrapTextLength);

            if (actorImage) {
                $gameMessage.setFaceImage(actorImage, actorImageIndex);
            } else {
                $gameMessage.setFaceImage('', 0);
            }

            // Block event flow until the message is done
            this.setWaitMode('message');

            // Custom callback
            $gameMessage._npcGptCallback = function() {
                // Runs right after message is closed
                $gameVariables.setValue(responseStatusVarId, 0);
            };

            // Actually add and show the text
            $gameMessage.add(responseText);
        },

        // ----------------------------------------------
        // characterContext
        // ----------------------------------------------
        'characterContext': function(args) {
            var contextVariableId = parseInt(args[0], 10);
            var name             = args[1] || '';
            var age              = parseInt(args[2], 10) || 0;
            var traits           = args[3] || '';
            var dialogueStyle    = args[4] || '';
            var backgroundStory  = args[5] || '';
            var eventsKnowledge  = args[6] || '';
            var environment      = args[7] || '';
            var interests        = args[8] || '';
            var friendliness     = args[9] || 'regular';

            var characterContext = {
                name: name,
                age: age,
                personalityTraits: traits,
                dialogueStyle: dialogueStyle,
                backgroundStory: backgroundStory,
                eventsKnowledge: eventsKnowledge,
                environment: environment,
                interests: interests,
                friendliness: friendliness
            };

            $gameVariables.setValue(contextVariableId, characterContext);
            console.log("[characterContext] Set variable #" + contextVariableId, characterContext);
        },

        // ----------------------------------------------
        // sendRequest <histVar> <contextVar> <inputVar> <respStatusVar> <maxOutputWords>
        // ----------------------------------------------
        'sendRequest': function(args) {
            var historyVariableId     = parseInt(args[0], 10) || 1;
            var contextVariableId     = parseInt(args[1], 10) || 12;
            var inputVariable         = parseInt(args[2], 10) || 19;
            var responseStatusVarId   = parseInt(args[3], 10) || 13;
            var maxOutputWords        = parseInt(args[4], 10) || 50;

            var userInput = ($gameVariables.value(inputVariable) || "").trim();
            if (!userInput) {
                console.log("[sendRequest] No user input provided. Aborting.");
                return;
            }

            // Limit user input to 50 words
            var limitedUserInput = userInput.split(' ').slice(0, 50).join(' ');

            var apiKeyValue = $gameVariables.value(apiKeyVariableId) || apiKey;
            if (!apiKeyValue) {
                console.warn("[sendRequest] No API key found. Make sure it's set in variable #" + apiKeyVariableId);
            }

            // Retrieve existing character context
            var characterContext = $gameVariables.value(contextVariableId) || {};
            characterContext.maxOutputWords = maxOutputWords;
            $gameVariables.setValue(contextVariableId, characterContext);

            // Retrieve existing chat history (array) from variable
            var chatHistoryRaw = $gameVariables.value(historyVariableId);
            var chatHistory = [];
            try {
                if (typeof chatHistoryRaw === 'string') {
                    chatHistory = JSON.parse(chatHistoryRaw);
                } else if (Array.isArray(chatHistoryRaw)) {
                    chatHistory = chatHistoryRaw;
                }
            } catch (e) {
                console.warn("[sendRequest] Failed to parse chatHistory from variable #" + historyVariableId);
            }

            var requestBody = {
                userInput: limitedUserInput,
                chatHistory: chatHistory,
                characterContext: characterContext
            };

            var requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKeyValue
                },
                body: JSON.stringify(requestBody)
            };

            // Clear the user's input variable here
            $gameVariables.setValue(inputVariable, "");

            console.log("[sendRequest] Sending request to server:", requestBody);

            fetch("https://npc-gpt-api-04c6279a15ad.herokuapp.com/api/v1/chat/send-message", requestOptions)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log("[sendRequest] Data received from server:", data);
                    // Store only the content into gptResponseVariableId
                    $gameVariables.setValue(gptResponseVariableId, data.response.content);

                    // Store updated chat history
                    $gameVariables.setValue(historyVariableId, JSON.stringify(data.chatHistory));

                    // Indicate success
                    $gameVariables.setValue(responseStatusVarId, 1);
                    console.log("[sendRequest] GPT response variable (" + gptResponseVariableId + ") set to:", data.response);
                })
                .catch(function(error) {
                    console.error("[sendRequest] Error:", error);
                });
        }
    };

    //-----------------------------------------------------------
    // 4) Override pluginCommand once, applying 'this' context
    //-----------------------------------------------------------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (pluginCommands[command]) {
            pluginCommands[command].apply(this, [args]);
        }
    };

    //-----------------------------------------------------------
    // 5) Window_Message modifications for user text input
    //-----------------------------------------------------------
    Window_Message.prototype.prepareInputWindow = function(inputVariable, actorFaceImage, actorFaceImageIndex, placeholderText) {
        console.log("Preparing input window with:", inputVariable, actorFaceImage, actorFaceImageIndex, placeholderText);

        this._inputVariable = inputVariable;
        this._actorFaceImage = actorFaceImage;
        this._actorFaceImageIndex = actorFaceImageIndex;
        this._inputLines = ['']; 
        this._inputActive = true;
        this._placeholderText = placeholderText;

        this.open();
        this.refreshInputWindow();
        $gameMessage._isUserInputComplete = false; // block event
    };

    Window_Message.prototype.activateInput = function() {
    console.log("Activating input...");

    // 1) Remove any old listeners if they're still bound
    if (this._boundHandleInput) {
        document.removeEventListener('keydown', this._boundHandleInput);
        this._boundHandleInput = null;
    }
    if (this._boundHandleMouseClick) {
        document.removeEventListener('mousedown', this._boundHandleMouseClick);
        this._boundHandleMouseClick = null;
    }

    // 2) Save original key mappings & override
    this._originalKeyMapper = Object.assign({}, Input.keyMapper);
    this._overrideKeyMapperForTextInput();

    // 3) Bind fresh listeners
    this._boundHandleInput = this.handleInput.bind(this);
    document.addEventListener('keydown', this._boundHandleInput);

    this._boundHandleMouseClick = this.handleMouseClick.bind(this);
    document.addEventListener('mousedown', this._boundHandleMouseClick);

    // 4) Refresh the input window (so we see the placeholder, etc.)
    this.refreshInputWindow();
};


    Window_Message.prototype.handleMouseClick = function(event) {
        console.log("Mouse click => closing input...");
        this._inputLines = [''];
        this.deactivateInput();
        event.preventDefault();
    };

    Window_Message.prototype._overrideKeyMapperForTextInput = function() {
        Input.keyMapper[32] = 'space';
        Input.keyMapper[90] = 'z';
        Input.keyMapper[88] = 'x';
        Input.keyMapper[87] = 'w';
        Input.keyMapper[80] = 'p';
    };

    Window_Message.prototype.processInput = function() {
        var inputText = this._inputLines.join('\n');
        console.log("Processed input (raw):", inputText);

        // If we had a wrap length stored, apply it
        if (this._wrapTextLength) {
			console.log("Wrapping user input at length:", this._wrapTextLength);
            inputText = wrapText(inputText, this._wrapTextLength);
            console.log("Processed input (wrapped):", inputText);
        }

        $gameVariables.setValue(this._inputVariable, inputText);

        $gameMessage._isUserInputComplete = true;
        $gameSystem._isWaitingForInput = false;

        this.deactivateInput();
        this.close();
    };

    Window_Message.prototype.deactivateInput = function() {
    console.log("Deactivating input...");

    document.removeEventListener('keydown', this._boundHandleInput);
    document.removeEventListener('mousedown', this._boundHandleMouseClick);

    Input.keyMapper = this._originalKeyMapper;

    this._inputActive = false;
    this.close();
    $gameSystem._isWaitingForInput = false;
};



	Window_Message.prototype.handleInput = function(event) {
    if (!this._inputActive || !this.isOpen()) return;

    if (event.key === 'Enter') {
        this.processInput();
        event.preventDefault();
        return;
    } else if (event.key === 'Backspace') {
        // remove last char from the current line
        let i = this._inputLines.length - 1;
        let line = this._inputLines[i];
        if (line.length > 0) {
            this._inputLines[i] = line.slice(0, -1);
        } else if (this._inputLines.length > 1) {
            // If current line is empty, remove that line and append a char to the previous
            this._inputLines.pop();
        }
        event.preventDefault();
    } else if (event.key.length === 1) {
        // normal character
        const wrapLen = this._wrapTextLength || 40;
        const i = this._inputLines.length - 1;
        let line = this._inputLines[i];

        // If adding this char exceeds wrap length, push a new line
        if (line.length + 1 > wrapLen) {
            this._inputLines.push(event.key);
        } else {
            this._inputLines[i] += event.key;
        }
    } else {
        // ignore
        return;
    }

    this.refreshInputWindow();
};

	
	Window_Message.prototype.refreshInputWindow = function() {
    if (!this._inputLines) return;
    this.contents.clear();

    // If you have a face image:
    var textStartX = 0;
    if (this._actorFaceImage) {
        this.drawFace(this._actorFaceImage, this._actorFaceImageIndex, 0, 0);

        textStartX = Window_Base._faceWidth + 10;
    }

    // Draw each line in _inputLines:
    var lineHeight = this.lineHeight();
    for (var i = 0; i < this._inputLines.length; i++) {
        var line = this._inputLines[i];
        this.contents.drawText(
            line,
            textStartX,
            lineHeight * i,
            this.contents.width - textStartX - 10,
            lineHeight,
            'left'
        );
    }
};


    //-----------------------------------------------------------
    // 6) Override Window_Message.terminateMessage to run callback
    //-----------------------------------------------------------
    var _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        // Call the original
        _Window_Message_terminateMessage.call(this);

        // Fire custom callback if present
        if ($gameMessage._npcGptCallback) {
            $gameMessage._npcGptCallback();
            $gameMessage._npcGptCallback = null;
        }
    };

})();