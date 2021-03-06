define([
    'core/core'
], function(core){
    core.log('notes module loaded');

    var constants = {
        octavesToCalculate: 4,
        startAtOctave: 1  //0 is too low
    };
    //http://www.phy.mtu.edu/~suits/notefreqs.html
//    var notes={
//        c0:{
//            frequency:333,
//            playableNote:{},
//            notesInKey:['c#',''],  <-- not done yet
//            octave: 0
//        },
//        'c#0':{
//            ...
//    };

    var noteSymbols = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
    function createNotesForEachOctave(){
        var notes = {};
        //
        for(var octave =constants.startAtOctave; octave < constants.octavesToCalculate; ++octave){
            for(var noteSymbolIndex in noteSymbols){
                var noteSymbol = noteSymbols[noteSymbolIndex];
                var noteSymbolWithOctave = noteSymbol + octave;
                notes[noteSymbolWithOctave] = createNote(noteSymbol, octave);
            }
        }

        return notes;
    }

    function createNote(noteSymbol, octave){
        return {
            noteSymbol: noteSymbol,
            octave: octave,
            frequency:null,
            playableNote: {},
            notesInKey:[]
        };
    }
    //    The basic formula for the frequencies of the notes of the equal tempered scale is given by
    //    fn = f0 * (a)n
    //    where
    //    f0 = the frequency of one fixed note which must be defined. A common choice is setting the A above middle C (A4) at f0 = 440 Hz.
    //        n = the number of half steps away from the fixed note you are. If you are at a higher note, n is positive. If you are on a lower note, n is negative.
    //        fn = the frequency of the note n half steps away.
    //        a = (2)1/12 = the twelth root of 2 = the number which when multiplied by itself 12 times equals 2 = 1.059463094359...
    //
    //        The wavelength of the sound for the notes is found from
    //    Wn = c/fn
    //    where W is the wavelength and c is the speed of sound. The speed of sound depends on temperature, but is approximately 345 m/s at "room temperature."
    function calculateFrequencies(){
        var baseFrequency = 440;
        var baseOctave = 4;
        var baseNoteStep = 10;
        var baseNotexOctave =  baseNoteStep + baseOctave* 12;
        core.log('baseNotexOctave: ' + baseNotexOctave);
        var a = Math.pow(2, (1/12));

        var octavesToCalculate = constants.octavesToCalculate;
        var currentStep = 1;
        for(var note in notes){
                var halfStepsFromBase = (currentStep + (1 * 12)) - baseNotexOctave;
                //var halfStepsFromBase = (currentStep + (octave * 12)) - baseNotexOctave;
                core.log('halfStepsFromBase: '+ halfStepsFromBase);
                var frequency = baseFrequency * Math.pow(a, halfStepsFromBase);
                core.log('note: {0} octave:{1} has frequency {2}', note, notes[note].octave, frequency);
                notes[note].frequency = frequency;
                ++currentStep;
        }
        return notes;
    }

//    function calculateFrequencies(){
//        var baseFrequency = 440;
//        var baseOctave = 4;
//        var baseNoteStep = 10;
//        var baseNotexOctave =  baseNoteStep + baseOctave* 12;
//        core.log('baseNotexOctave: ' + baseNotexOctave);
//        var a = Math.pow(2, (1/12));
//
//        var octavesToCalculate = constants.octavesToCalculate;
//        var currentStep = 1;
//        for(var note in notes){
//            for(var octave=0; octave <= octavesToCalculate; ++octave){
//                var halfStepsFromBase = (currentStep + (octave * 12)) - baseNotexOctave;
//                //core.log('halfStepsFromBase: '+ halfStepsFromBase);
//                var frequency = baseFrequency * Math.pow(a, halfStepsFromBase);
//                core.log('note: {0} octave:{1} has frequency {2}', note, octave, frequency);
//                notes[note].frequencies.push(frequency);
//            }
//            ++currentStep;
//        }
//        return notes;
//    }

    var notes = createNotesForEachOctave();
    calculateFrequencies();

    return notes;
});