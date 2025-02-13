class Doors3D {
    constructor() {
        console.log("Doors")
    }
        drawHex(doors1) {
        let geometry = settings.getSettings().geometry
        let geometry2=settings.getSettings().geometry
        let material = settings.getSettings().material
        var radius =geometry.parameters.width*(7/8) // zmienna wielkość hexagona, a tym samym całego labiryntu
        geometry= new THREE.BoxGeometry(geometry.parameters.width/3, geometry.parameters.height , geometry.parameters.depth),

        material=new THREE.MeshPhongMaterial({ color: 0x00ffff,  map: new THREE.TextureLoader().load( 'wood.jpg') });
        var container = new THREE.Object3D() // kontener na obiekty 3D
        var wall = new THREE.Mesh(geometry, material); // prostopadłościan - ściana hex-a
        for (var i = 0; i < 2; i++) {
            var side = wall.clone()
            side.position.x=i*(radius-radius/4)-geometry2.parameters.width/3
            side.position.z=0
            container.add(side)
        }
        return container
    }
}