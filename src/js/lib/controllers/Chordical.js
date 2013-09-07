/*


 */

define([
    'core/core',
    'lib/views/Chordical',
    'lib/views/chordical/InstrumentEdit',
    'lib/models/chordical/Note',      //playable note
    'lib/models/chordical/notes',    //singleton of notes that has NoteModels created and assigned to that notes can be played.
    'lib/models/chordical/Instrument'
], function(core, ChordicalView, InstrumentEditView, NoteModel, notes, InstrumentModel){
    core.log('Chordical controller module loaded');

    var Controller = core.mvc.Controller.extend({
        initialize:function(){
            core.log('Chordical Controller constructor called.');
            core.audio.init(); //in order to use web audio, we must create a new context, which will be assigned to core.audio.audioContext
        },
        action:function(routeName, pageName){
            core.log('Chordical Controller action called with routeName:{0} pageName:{1}', routeName, pageName);

            switch(pageName){
                case "edit": this.editPageAction(); break;
                case "instrument":this.instrumentPageAction(); break;
                default:this.homePageAction();
            }

        },

        getNotesModel:function(){
            core.log('Chordical Controller createNotesModel called');
            if(this.notesModel){return this.notesModel;}

            //instrument dictates how the notes are constructed   (selected sound, destination, etc)
            this.getInstrumentModel();

            //by default, assign a keyCode to a note in this order.
            var keyOrder = [
             // 1   2   3   4   5   6   7   8   9   0
                49, 50, 51, 52, 53, 54, 55, 56, 57, 48,
             // q   w   e   r   t   y   u   i   o   p
                81, 87, 69, 82, 84, 89, 85, 73, 79, 80
            ];
            var keyOrderIndex = 0;
            //create a note model for each note.
            //keyboard widget uses this to play notes via the instrument.
            for(var note in notes){
                notes[note].playableNote = new NoteModel({note:note, instrument:this.instrumentModel});
                //assign a keycode so the note can be played when keyboard key (1,2,a, etc) is keyed down
                notes[note].playableNote.addKeyCodeTrigger(keyOrder[keyOrderIndex++]);
            }
            this.notesModel = {
                notes: notes,
                instrument: this.instrumentModel,
                findNotesTriggeredByKeyCode:function(keyCode){
                    var notesTriggeredByKeyCode = [];
                    for(var note in this.notes){
                        if(this.notes[note].playableNote.isTriggeredByKeyCode(keyCode)){
                            notesTriggeredByKeyCode.push(this.notes[note]);
                        }
                    }
                    return notesTriggeredByKeyCode;
                }
            };

            core.log('notesModel is: \n' + JSON.stringify(this.notesModel, null, 2));
            return this.notesModel;
        },
        getInstrumentModel:function(){
            core.log('Chordical Controller createSoundsModel called');
            if(this.instrumentModel){return this.instrumentModel;}
            this.instrumentModel = new InstrumentModel();
            return this.instrumentModel;
        },
        /**
         * default home page provides a keyboard interface to play multiple notes at once.
         * The notesModel is created to instruct the view which notes to display
         */
        homePageAction:function(){
            core.log('home page action called.');
            this.getNotesModel();
            this.chordicalView = new ChordicalView({model:this.notesModel});
            this.chordicalView.render();

            core.ui.transitionPage(this.chordicalView);
        },
        editPageAction:function(){
            alert('edit not implemented yet');
        },
        instrumentPageAction:function(){
            this.getInstrumentModel();
            this.instrumentEditView = new InstrumentEditView({model:this.instrumentModel});
            core.log('selectedSoundOption: ' + this.instrumentModel.attributes.selectedSoundOption);
            this.instrumentEditView.render();
            core.ui.transitionPage(this.instrumentEditView);
        }
    });

    return new Controller();//singleton
});
