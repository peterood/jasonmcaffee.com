define([
    'core/core',
    'lib/models/chordical/notes'
], function(core, notes){
    core.log('Note Model module loaded.');

    //todo: polyfill https://github.com/g200kg/WAAPISim

    //var context;// = core.audio.audioContext;//new webkitAudioContext();//you can only have 1 context per window   http://stackoverflow.com/questions/14958175/html5-audio-api-audio-resources-unavailable-for-audiocontext-construction

    //http://tympanus.net/codrops/2013/06/10/web-audio-stylophone/
    /**
     * playable note which uses the instrument model to determine which sound types to play.
     * the instrument model holds the user selected options, including oscillator type, sound nodes (gain, echo, etc), etc
     * @type {*}
     */
    var NoteModel = core.mvc.Model.extend({
        initialize:function(attributes, options){
            core.log('Note initialize called with note: ' + attributes.note + ' octave: ' + attributes.octave);

            if(!attributes.instrument){core.log('ERROR: instrument is required to construct a note'); return;}
            if(!attributes.note){attributes.note = 'c';}
            if(!attributes.octave){attributes.octave = 3;}
//            if(!attributes.destination){attributes.destination = core.audio.audioContext.destination;}     cant do this here. do it on play

            core.log('Note frequency is: ' + attributes.frequency);

            this.context = core.audio.audioContext;//each page can have up to 2 contexts (IIRC). use an alias due to prior refactor.
            this.attributes.keyCodeTriggers = [];
        },
        defaults:{
            //when a keyboard key is pressed (1, 2, a, b, etc) we need to find which notes should be played.
            //each note has an array of triggers with the dom generated value e.g. 1 is 49
            //keyCodeTriggers:[]
        },
        //returns the current destination (e.g. speakers, gain node, etc)
        //useful if you want to insert a new destination.
        getContextDestination: function(){

        },
        /**
         *
         * @param key - dom keyCode value
         */
        addKeyCodeTrigger:function(keyCode){
            this.attributes.keyCodeTriggers.push(keyCode);
        },
        /**
         * tells you if the provided keycode should trigger this note.
         * @param keyCode
         * @returns {boolean}
         */
        isTriggeredByKeyCode: function(keyCode){
            for(var i = 0; i < this.attributes.keyCodeTriggers.length; ++i){
                if(this.attributes.keyCodeTriggers[i] === keyCode){return true;}
            }
            return false;
        },
        /**
         * returns the web audio frequency for given note and octave.
         * @param note - a, b, c, c#, db, bb, etc.
         * @param octave
         * @return {*}
         */
//        getNoteFrequency:function(note, octave){
//            core.log('getNoteFrequency called for note:' + note + ' octave: ' + octave);
//            var match = notes[note];
//            if(!match){core.log('no match found for note'); return;}
//            return match.frequencies[octave];
//        },
        /**
         * Uses the this.model's selected sound to play a note
         */
        play:function(){
            core.log('Note.play() called');
            //touch events can be weird. prevent notes from never ending.
            if(this.isPlaying){return;}
            this.isPlaying = true;
            this.selectedSound = this.get('instrument').get('selectedSound');  //always reset so we can change sounds and not have to recreate notes
            switch(this.selectedSound.type){
                case  'oscillator': this._playOscillator(); break;
            }
        },
        /**
         * You must explicitly stop a note from playing after it has been play()ed
         */
        stop:function(){
            this.isPlaying = false;
            core.log('Note.stop() called');
            this.selectedSound = this.get('instrument').get('selectedSound');  //always reset so we can change sounds and not have to recreate notes
            switch(this.selectedSound.type){
                case  'oscillator': this._stopOscillator(); break;
            }
        },
        /**
         * uses the selected sound's selectedSubType to play an oscillator type. (SINE, TRIANGLE, etc)
         * @private
         */
        _playOscillator:function(){
            this.oscillator = this.context.createOscillator();
            this.oscillator.type = this.convertOscillatorSubTypeToNative(this.selectedSound.selectedSubType);
            this.oscillator.frequency.value = this.get('frequency');
            this.oscillator.connect(this.get('destination') || this.context.destination); // Connect our oscillator to the speakers.
            //this.oscillator.connect(this.get('destination'));
            //http://www.w3.org/TR/webaudio/#DeprecationNotes
            if(this.oscillator.start){
                this.oscillator.start(0);
            }else{
                this.oscillator.noteOn(0);
            }

        },

        /**
         * Oscillators must be explicitly stopped after being played.
         * @private
         */
        _stopOscillator:function(){
            if(this.oscillator.stop){
                this.oscillator.stop(0);
            }else{
                this.oscillator.noteOff(0);
            }

            this.oscillator.disconnect();
        },
        /**
         * The selectedSubType select option stores string values for the applicable sub types. (SINE, TRIANGLE, etc)
         * This function takes the stored string and converts it into webkit audio's
         * @param stringSubType
         * @return {Number}
         */
        convertOscillatorSubTypeToNative:function(stringSubType){
            switch(stringSubType){
                case 'SINE': return 0;
                case 'SQUARE': return 1;
                case 'SAWTOOTH': return 2;
                case 'TRIANGLE': return 3;
                default: return 0;
            }
        }
    });

    return NoteModel;
});