const appState = {

    stations: [],

    sessions: [],

    currentStation: null,

    selectedPlan: null,

    currentSession: null,

    modalOpen: false

};

export default appState;
export function setStations(stations){

    appState.stations = stations;

}

export function getStations(){

    return appState.stations;

}
export function setCurrentStation(station){

    appState.currentStation = station;

}

export function getCurrentStation(){

    return appState.currentStation;

}
export function setSelectedPlan(plan){

    appState.selectedPlan = plan;

}

export function getSelectedPlan(){

    return appState.selectedPlan;

}
export function addSession(session){

    appState.sessions.push(session);

}

export function getSessions(){

    return appState.sessions;

}