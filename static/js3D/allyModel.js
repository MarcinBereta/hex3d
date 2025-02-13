class AllyModel extends THREE.Object3D {

    constructor() {
        super()
        this.mesh = null
        this.mixer = null
        this.TableOfMixer=[]
        this.clock = new THREE.Clock();

    }

    loadModel(url, callback) {

        let that = this
        let loader = new THREE.JSONLoader();

        loader.load(url, function (geometry) {
            var material1=new THREE.MeshBasicMaterial(
                {
                    map: new THREE.TextureLoader().load("js3d/vader.png"), // dowolny plik png, jpg
                    morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
                });
            that.mesh = new THREE.Mesh(geometry, material1) // w materiale morphTargets:true
            let rozmiar = settings.getSettings().geometry
            that.mesh.scale.set(rozmiar.parameters.width/150, rozmiar.parameters.width/150, rozmiar.parameters.width/150);
            that.mesh.position.y=10;
            that.mesh.name = "vader"
            that.mesh.rotation.y=Math.PI/2;
            that.mixer = new THREE.AnimationMixer(that.mesh);
            that.mixer.clipAction("Stand").play();
            that.TableOfMixer.push({mixer: that.mixer,
                                    mesh: that.mesh
            })
            that.add(that.mesh)
            //
            callback(that);

        })
    }
    updateModel() {
        var delta = this.clock.getDelta();
        this.TableOfMixer.forEach(mixer => {
                if (mixer.mixer) mixer.mixer.update(delta)    
            
        });
       
    }

    //funkcja do zmiany animacji

    setAnimation (animationName, mesh) {
        this.TableOfMixer.forEach(mixer => {
            if(mixer.mesh==mesh){
                mixer.mixer.uncacheRoot(mesh)
                mixer.mixer.clipAction(animationName).play();
            } 
        
    });
    }

}
