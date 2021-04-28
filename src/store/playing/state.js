const Store = window.require('electron-store')

const store = new Store();

export default function () {
  return {
    currentSong: store.get('currentSong') || '',
    playerVisible: store.get('playerVisible') || true,
    stopAnimations: false,
    background: store.get('background') || '../src/assets/space.jpg'
  }
}
