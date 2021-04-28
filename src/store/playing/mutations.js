const Store = window.require('electron-store')

const store = new Store();

export function SET_CURRENT_SONG (state, song) {
    state.currentSong = song;
    store.set('currentSong', song);
}

export function TOGGLE_PLAYER_VISIBLE (state) {
    state.stopAnimations = false;
    state.playerVisible = !state.playerVisible;
    store.set('playerVisible', state.playerVisible);
}

export function SET_ANIMATIONS (state, arg) {
    state.stopAnimations = arg
}