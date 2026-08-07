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
export function setCurrentSession(session){

    appState.currentSession = session;

}

export function getCurrentSession(){

    return appState.currentSession;

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
export function updateStation(updatedStation) {

    const index = appState.stations.findIndex(

        station => station.id === updatedStation.id

    );

    if (index === -1) return;

    appState.stations[index] = updatedStation;

}
export function updateSession(updatedSession) {

    const index = appState.sessions.findIndex(

        session => session.id === updatedSession.id

    );

    if (index === -1) return;

    appState.sessions[index] = updatedSession;

}
export function getSessionById(id){

    return appState.sessions.find(

        session => session.id === id

    );

}