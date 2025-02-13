class Settings {
    constructor() {
        console.log("Settings")
        
    }

    getSettings() {
        let settings = {

            zmiennaA: 20,
            zmiennaB: 30,
            geometry: new THREE.BoxGeometry(200, 150, 10),
            material: new THREE.MeshPhongMaterial({ color: 0x00ff00, map: new THREE.TextureLoader().load( 'wood.jpg')  }),
        }
        return settings
    }
}