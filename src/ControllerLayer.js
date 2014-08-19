/**
 * Created by Chaoyu on 8/16/14.
 */

var ControllerLayer = cc.Layer.extend({
    //StatusLabel for debugging only
    //xhrStatusLabel: null,
    commandSequence: [],
    color_id: null,
    object_id: null,

    ctor:function () {
        this._super();
        this.commandSequence = [];

        this.color_id = {
            pink: 0,
            green: 1,
            blue: 2
        };

        this.object_id = {
            fox: 0,
            monkey: 1,
            pig: 2,
            rabbit: 3
        };

        this.init();
    },

    init:function () {
        var that = this;
        this._super();
        //this.keyboardEventListener();

        this.initListener();

        setInterval(function(){
            that.sendGetRequest();
            that.dispatchInstruction();
        }, 200);
    },

    initListener: function() {
        var that = this;
        this.runNextListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: 'runNext',
            callback: function(event){
                that.executeNext();
            }
        });
        cc.eventManager.addListener(this.runNextListener, 1);
    },

    keyboardEventListener: function(){
        var that = this;
        var event;
        if ('keyboard' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key) {
                    //cc.log("Key down:" + key);
                },
                onKeyReleased: function (key) {
                    //cc.log("Key up:" + key);
                    switch(key) {
                        case 49: // press 1, show character 1
                            event = new cc.EventCustom('updateCharacter');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                event: 'updateVisibility',
                                value: true
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 50: // press 2, hide character 1
                            event = new cc.EventCustom('updateCharacter');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                event: 'updateVisibility',
                                value: false
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 51: // press 3, show character 2
                            event = new cc.EventCustom('changeSetting');
                            event.setUserData({
                                target: 'controller',
                                id: 1
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 52: // press4, hide character 2
                            event = new cc.EventCustom('changeSetting');
                            event.setUserData({
                                target: 'controller',
                                id: 2
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 32: // press space
                            event = new cc.EventCustom('changeSetting');
                            event.setUserData({
                                target: 'reset'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;


                        case 37: // press left arrow
                            event = new cc.EventCustom('action');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                action: 'left'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 38: //press up arrow
                            event = new cc.EventCustom('action');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                action: 'up'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 39: // press right arrow
                            event = new cc.EventCustom('action');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                action: 'right'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 40: // press down arrow
                            event = new cc.EventCustom('action');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                action: 'down'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;

                        // change background
                        case 67: // press c
                            event = new cc.EventCustom('changeSetting');
                            event.setUserData({
                                target: 'board',
                                bg: 'forest'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 88: // press x
                            event = new cc.EventCustom('changeSetting');
                            event.setUserData({
                                target: 'board',
                                bg: 'space'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;

                        // change princess color
                        case 81: // press q, color pink
                            event = new cc.EventCustom('updateCharacter');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                event: 'color',
                                value: 0 // pink
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 87: // press w, color green
                            event = new cc.EventCustom('updateCharacter');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                event: 'color',
                                value: 1 // green
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 69: // press e, color blue
                            event = new cc.EventCustom('updateCharacter');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                event: 'color',
                                value: 2 // blue
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;

                        // actions:
                        case 68: // press d
                            event = new cc.EventCustom('action');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                action: 'dance'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 83: // press s
                            event = new cc.EventCustom('action');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                action: 'sleep'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 85: // press u
                            event = new cc.EventCustom('action');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                action: 'dressup'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 77: // press m
                            event = new cc.EventCustom('action');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                action: 'magic'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 76: // press l
                            event = new cc.EventCustom('action');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                action: 'love'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 84: // press t
                            event = new cc.EventCustom('action');
                            event.setUserData({
                                player_id: +Config.ls.getItem('controller'),
                                action: 'tantrum'
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;

                        case 54: // press 6
                            event = new cc.EventCustom('objects');
                            event.setUserData({
                               targetObject: 0,
                               visible: true
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 55: // press 7
                            event = new cc.EventCustom('objects');
                            event.setUserData({
                                targetObject: 1,
                                visible: true
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 56: // press 8
                            event = new cc.EventCustom('objects');
                            event.setUserData({
                                targetObject: 2,
                                visible: true
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                        case 57: // press 9
                            event = new cc.EventCustom('objects');
                            event.setUserData({
                                targetObject: 3,
                                visible: true
                            });
                            cc.eventManager.dispatchEvent(event);
                            break;
                    }
                }
            }, this);
        }
    },

    sendGetRequest: function() {
        var that = this;
        var xhr = cc.loader.getXMLHttpRequest();

        xhr.open("GET", "http://localhost:3000/instruction.json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //var httpStatus = xhr.statusText;
                var responseObject = JSON.parse(xhr.responseText);

                if(responseObject.empty) {
                    //that.xhrStatusLabel.setString("No data");
                    //console.log("no data");
                } else {
                    //that.xhrStatusLabel.setString(responseObject.data);
                    console.log(responseObject.data);
                    that.commandSequence.push(responseObject.data);
                }
            } else {
                //that.xhrStatusLabel.setString("Serve Problem, Error Code: " + xhr.status);
            }
        };

        xhr.send();
    },



    isRunning: false,

    dispatchInstruction: function() {
        if(this.commandSequence.length > 0) {
            var that = this;
            var commandObject = this.commandSequence.shift();
            var event;

            //console.log(commandObject);

            switch(commandObject.type.trim()) {
                case 'show character':
                    event = new cc.EventCustom('updateCharacter');
                    event.setUserData({
                        player_id: +Config.ls.getItem('controller'),
                        event: 'color',
                        value: this.color_id[commandObject.value.trim()],
                        isRunning: this.isRunning
                    });
                    cc.eventManager.dispatchEvent(event);
                    break;
                case 'hide character':
                    event = new cc.EventCustom('updateCharacter');
                    event.setUserData({
                        player_id: +Config.ls.getItem('controller'),
                        event: 'updateVisibility',
                        value: false,
                        isRunning: this.isRunning
                    });
                    cc.eventManager.dispatchEvent(event);
                    break;
                case 'add object':
                    event = new cc.EventCustom('objects');
                    event.setUserData({
                        targetObject: this.object_id[commandObject.value.trim()],
                        visible: true,
                        isRunning: this.isRunning
                    });
                    cc.eventManager.dispatchEvent(event);
                    break;
                case 'remove object':
                    event = new cc.EventCustom('objects');
                    event.setUserData({
                        targetObject: this.object_id[commandObject.value.trim()],
                        visible: false,
                        isRunning: this.isRunning
                    });
                    cc.eventManager.dispatchEvent(event);
                    break;
                case 'set bg':
                    event = new cc.EventCustom('changeSetting');
                    event.setUserData({
                        target: 'board',
                        bg: commandObject.value,
                        isRunning: this.isRunning
                    });
                    cc.eventManager.dispatchEvent(event);
                    break;
                case 'run':
                    this.run(commandObject.steps, commandObject.func);
                    break;
                default:
                    break;
            }
        }
    },

    steps: null,
    funcSteps: null,
    run: function(steps, funcSteps) {
        if(!this.isRunning) {
            this.isRunning = true;
            this.steps = steps;
            this.funcSteps = funcSteps;
            this.executeNext();
        }
    },

    executeNext: function() {
        var that = this;
        if(this.steps && this.steps.length > 0){
            var current_step = this.steps.shift().trim();
            console.log("current step: " + current_step);
            if(current_step === 'function') {
                if(this.funcSteps) {
                    this.steps = this.funcSteps.concat(this.steps);
                }
                this.executeNext();
            } else {
                var event = new cc.EventCustom('action');
                event.setUserData({
                    player_id: +Config.ls.getItem('controller'),
                    action: current_step
                });
                cc.eventManager.dispatchEvent(event);
            }
        } else {
            setTimeout(function(){
                that.resetGameSettings();
            }, 1200);
        }
    },

    resetController: function(){
        this.isRunning = false;
        this.steps = null;
        this.funcSteps = null;
    },

    resetGameSettings: function() {
        var event = new cc.EventCustom('changeSetting');
        event.setUserData({
            target: 'reset'
        });
        cc.eventManager.dispatchEvent(event);
    }
});
