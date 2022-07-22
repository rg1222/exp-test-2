var timeline = [];

// Preload stimuli
const preload = {type: jsPsychPreload, images: ['assets/img/blue.png','assets/img/orange.png','assets/img/face_blue.jpg','assets/img/face_orange.jpg']};
timeline.push(preload);

// Introduction
const intro_trial = {
    type: jsPsychHtmlButtonResponse,//see docs for plugin details
    stimulus: '<p style="color:blue"> <b>Hi Kyle :)</b> </p> <br><br>',
    choices: ['Press this button to start the experiment']
};
timeline.push(intro_trial);

// Enter Fullscreen Mode
timeline.push({
    type: jsPsychFullscreen,
    fullscreen_mode: true
});

// Task Instructions
const instructions_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
                <p>In this experiment, a circle will appear in the center 
                of the screen.</p><p>If the circle is <strong style="color:blue">blue</strong>, 
                press the letter <strong  style="color:blue">F</strong> on the keyboard as fast as you can.</p>
                <p>If the circle is <strong style="color:orange">orange</strong>, press the letter <strong style="color:orange">J</strong> 
                as fast as you can.</p>
                <div style='width: 700px;'>
                <div style='float: left;'><img src='assets/img/blue.png'></img>
                <p class='small'><strong>Press the F key</strong></p></div>
                <div style='float: right;'><img src='assets/img/orange.png'></img>
                <p class='small'><strong>Press the J key</strong></p></div>
                </div>
                <p><br><br><b>Press any key to begin.</b></p>
            `
};
timeline.push(instructions_trial);

// Trial Definitions
const blue_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'assets/img/blue.png',
    choices: ['f', 'j']
};
const orange_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'assets/img/orange.png',
    choices: ['f', 'j']
};
const craig_blue_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'assets/img/face_blue.jpg',
    choices: ['f', 'j']
};
const craig_orange_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'assets/img/face_orange.jpg',
    choices: ['f', 'j']
};
var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: function(){
        return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
    },
    data: {
        task: 'fixation'
    }
};

// Defining Task Procedure:
//  stimuli (shape)
var test_stimuli = [
    { stimulus: "assets/img/blue.png", correct_response: 'f'},
    { stimulus: "assets/img/orange.png", correct_response: 'j'}
];
//  stimuli (face)
var craig_stimuli = [
    { stimulus: "assets/img/face_blue.jpg", correct_response: 'f'},
    { stimulus: "assets/img/face_orange.jpg", correct_response: 'j'}
];
//  trial (shape)
var test = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    data: {
        task: 'response',
        image_type: 'circle',
        correct_response: jsPsych.timelineVariable('correct_response')
    },
    on_finish: function(data){
        data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
    }
};
//  order (shape)
var test_procedure = {
    timeline: [fixation, test],
    timeline_variables: test_stimuli,
    randomize_order: true,
    repetitions: 6
};
//  trial (face)
var craig = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    data: {
        task: 'response',
        image_type: 'face',
        correct_response: jsPsych.timelineVariable('correct_response')
    },
    on_finish: function(data){
        data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
    }
};
//  order (face)
var craig_procedure = {
    timeline: [fixation, craig],
    timeline_variables: craig_stimuli,
    randomize_order: true,
    repetitions: 2
};

// Push Task
timeline.push(test_procedure);
timeline.push(craig_procedure);

// Wrap-Up
var debrief_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        var trials = jsPsych.data.get().filter({task: 'response'});
        var correct_trials = trials.filter({correct: true});
        var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
        var rt = Math.round(correct_trials.select('rt').mean());

        return `<p>You responded correctly on ${accuracy}% of the trials.</p>
        <p>Your average response time was ${rt}ms.</p>
        <p>Press any key to complete the experiment. Thank you!</p>`;
    }
};
timeline.push(debrief_block);

//exit fullscreen mode
timeline.push({
    type: jsPsychFullscreen,
    fullscreen_mode: false
});