class AllyTest extends THREE.Object3D {

    constructor() {
        super()
      this.mesh = new THREE.Mesh(
           new THREE.BoxGeometry(20, 20, 20),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
       );
       this.mesh.name="TESTOWY";
       this.add(this.mesh)
    }

}