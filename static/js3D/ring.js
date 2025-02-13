class Ring extends THREE.Mesh {
    constructor() {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha
        console.log("RING")
        let rozmiar = settings.getSettings().geometry

        this.geometry = new THREE.RingGeometry( rozmiar.parameters.width/5, rozmiar.parameters.width/8, 6 );
        this.material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.add(this.mesh)
    }
}


