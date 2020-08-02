// all songs
const imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
const somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
const tooManyCooks = ['c', 'g', 'f'];
const iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
const babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
const creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
const army = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'];
const paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'];
const toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7','g7'];
const bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];

var songs = [];    // difficulity and chords
var labels = [];    // category of all difficulity
var allChords = [];    // category of all chords
var labelCounts = [];    // amount of every difficulity 
var labelProbabilities = [];    // probabilities of difficulities in all songs
var chordCountsInLabels = {};    // all chords and their number in each difficulity
var probabilityOfChordsInLabels = {};    // probalities of every chords in each dififluity

/**
 * add songs and difficulty
 * 
 * @param {Array} chords
 * @param {String} label 
 *   */ 
function train(chords, label) {
    songs.push([label, chords]);
    labels.push(label);
    // chords collection
    for (var i = 0; i < chords.length; i++) {
        if (!allChords.includes(chords[i])) {
            allChords.push(chords[i]);
        }
    }
    // count difficulity number
    (!!(Object.keys(labelCounts).includes(label))) ? labelCounts[label] += 1 : labelCounts[label] = 1;
};

/**
 * get number of songs
 */
function getNumberOfSongs() {
    return songs.length;
};

/**
 * set probabilities of difficulities in all songs
 * 
 * @param {number} numberOfSongs
 */
function setLabelProbabilities() {
    Object.keys(labelCounts).forEach(function (label) {
        var numberOfSongs = getNumberOfSongs();
        labelProbabilities[label] = labelCounts[label] / numberOfSongs;
    });
};

/**
 * get all chords and their number in all difficulity
 * 
 * @param {Array} chord
 * @param {String} label 
 */
function setChordCountsInLabels() {
    songs.forEach(function (label) {
        if (chordCountsInLabels[label[0]] === undefined) {
            chordCountsInLabels[label[0]] = {};
        }
        label[1].forEach(function (chord) {
            if (chordCountsInLabels[label[0]][chord] > 0) {
                chordCountsInLabels[label[0]][chord] =
                    chordCountsInLabels[label[0]][chord] + 1;
            } else {
                chordCountsInLabels[label[0]][chord] = 1;
            }
        });
    });
}

/**
 * get probalities of every chords in each dififluity
 * 
 * @param {String} label
 * @param {String} chord
 */
function setProbabilityOfChordsInLabels() {
    probabilityOfChordsInLabels = chordCountsInLabels;
    Object.keys(probabilityOfChordsInLabels).forEach(function (label) {
        Object.keys(probabilityOfChordsInLabels[label]).forEach(function (chord) {
            probabilityOfChordsInLabels[label][chord] = probabilityOfChordsInLabels[label][chord] * 1.0 / songs.length;
        });
    });
}

train(imagine, 'easy');
train(somewhere_over_the_rainbow, 'easy');
train(tooManyCooks, 'easy');
train(iWillFollowYouIntoTheDark, 'medium');
train(babyOneMoreTime, 'medium');
train(creep, 'medium');
train(paperBag, 'hard');
train(toxic, 'hard');
train(bulletproof, 'hard');
setLabelProbabilities();
setChordCountsInLabels();
setProbabilityOfChordsInLabels();

/**
 * know the difficulity of new chord
 * 
 * @param {Array} chords 
 */
function classify(chords) {
    let ttal = labelProbabilities;
    console.log(ttal);
    let classified = {};
    Object.keys(ttal).forEach(function (obj) {
        let first = labelProbabilities[obj] + 1.01;
        chords.forEach(function (chord) {
            let probabilityOfChordInLabel =
                probabilityOfChordsInLabels[obj][chord];
            if (probabilityOfChordInLabel === undefined) {
                first + 1.01;
            } else {
                first = first * (probabilityOfChordInLabel + 1.01);
            }
        });
        classified[obj] = first;
    });
    console.log(classified);
};
classify(['d', 'g', 'e', 'dm']);
classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);