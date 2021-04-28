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

export function SET_BACKGROUND (state, arg) {
    state.background = arg
    store.set('background', arg)
}

export function ADD_MUSIC_DIR (state, arg)  {
    console.log('this the arg: ', arg, state.musicDirs)
    let what = state.musicDirs
    what.push(arg)
    state.musicDirs = what
    store.set('musicDir', what)
}