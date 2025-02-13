class Player {

    constructor() {

        this.container = new THREE.Object3D()

        var geometry = new THREE.BoxGeometry(10, 10, 10);
        var material = new THREE.MeshBasicMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 0.5
        });
        this.player = new THREE.Mesh(geometry, material);

        this.container.add(this.player) // kontener w którym jest player

        this.axes = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu

        this.container.add(this.axes)
    }



    //funkcja zwracająca cały kontener

    getPlayerCont() {
        return this.container
    }

    //funkcja zwracająca playera czyli sam sześcian

    getPlayerMesh() {
        return this.player
    }
    getAxis(){
        return this.axes
    }

}