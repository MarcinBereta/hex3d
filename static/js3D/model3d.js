var container = new THREE.Object3D()
var meshModel
var mixer
var delta
var clock = new THREE.Clock();
class Model {

    constructor() {
    }

    loadModel = function (url, callback) {

        var loader = new THREE.JSONLoader();

        loader.load(url, function (geometry, modelMaterial) {
            console.log(geometry)
            console.log(container)
            var modelMaterial = new THREE.MeshBasicMaterial(
                {
                    map: new THREE.TextureLoader().load("js3d/prototype_fett.png"), // dowolny plik png, jpg
                    morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
                });
            // ładowanie modelu jak poprzednio
            meshModel = new THREE.Mesh(geometry, modelMaterial)
            meshModel.name = "BOBA";
            meshModel.position.y = 15; // ustaw pozycje modelu
            let rozmiar = settings.getSettings().geometry
            meshModel.scale.set(rozmiar.parameters.width/150, rozmiar.parameters.width/150, rozmiar.parameters.width/150); // ustaw skalę modelu
            //utworzenie mixera jak poprzednio
            //dodanie modelu do kontenera (na poprzednich zajęciach był to testowy sześcian)
            container.add(meshModel)
            mixer = new THREE.AnimationMixer(meshModel)
            mixer.clipAction("stand").play()
            // zwrócenie kontenera
            callback(container);

        });
    }
    
    updateModel(delta) {
        if (mixer) mixer.update(delta)

    }
    getPlayerCont() {
        return meshModel
    }

    //animowanie postaci
    setAnimation(anim, model){
        mixer.uncacheRoot(model)
        mixer.clipAction(anim).play();
    }

    getPlayerMesh() {
        return this.meshModel
    }


}