const sounds = {

    timerEnd: new Audio("../resources/end-sound.wav"),

    payment: new Audio("../resources/sell-succes.wav"),

    addHour: new Audio("../resources/add-time.wav"),

    notification: new Audio("../resources/begin-time.wav")

};

export function playSound(name){

    const sound = sounds[name];

    if(!sound) return;

    sound.currentTime = 0;

    sound.play();

}