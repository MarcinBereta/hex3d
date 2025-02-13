class Hex3D {
    constructor() {
        this.lightconstructor = new THREE.Object3D()
        this.lightconstructor2 = new THREE.Object3D()
        this.enemyArray = []
        console.log("cos")
    }
    drawHex(doors1, doors2, structure) {
        var container = new THREE.Object3D() // kontener na obiekty 3D
        let geometry = settings.getSettings().geometry
        let material;
        switch (structure) {
            case "wall":
                material = settings.getSettings().material;
                break;
            case "Enemy":
                material = new THREE.MeshPhongMaterial({ color: 0xffff00, map: new THREE.TextureLoader().load( 'wood.jpg')  })

                break;
            case "TREASURE":
                material = new THREE.MeshPhongMaterial({ color: 0x00ffff, map: new THREE.TextureLoader().load( 'wood.jpg')  })
                var geometry3 = new THREE.BoxGeometry(20, 20, 20);
                var material3 = new THREE.MeshPhongMaterial({ color: 0xc0c0c0, map: new THREE.TextureLoader().load( 'wood.jpg')  });
                var cube = new THREE.Mesh(geometry3, material3);
                container.add(cube)
                break;
            case "LIGHT":
                material = new THREE.MeshPhongMaterial({ color: 0xff00ff, map: new THREE.TextureLoader().load( 'wood.jpg')  })
               


                break;
        }
        var radius = geometry.parameters.width * (7 / 8) // zmienna wielkość hexagona, a tym samym całego labiryntu
        var wall = new THREE.Mesh(geometry, material); // prostopadłościan - ściana hex-a
        for (var i = 0; i < 6; i++) {
            if (i != doors1 && i != doors2) {
                var side = wall.clone()
                side.geometry.width = radius / 2            // klon ściany
                side.geometry.height = radius
                side.position.z = radius * Math.cos(i * Math.PI / 3)
                side.position.x = radius * Math.sin(i * Math.PI / 3)
            }
            else {
                var side = doors.drawHex(i)
                side.position.z = radius * Math.cos(i * Math.PI / 3)
                side.position.x = radius * Math.sin(i * Math.PI / 3)
            }
            side.lookAt(container.position)    // nakierowanie ściany na środek kontenera 3D  
            container.add(side)                // dodanie ściany do kontenera

        }
        geometry = new THREE.CylinderGeometry(geometry.parameters.width + 3, geometry.parameters.width + 3, 1, 6);
        material = new THREE.MeshPhongMaterial({ color: 0x00ff00,  map: new THREE.TextureLoader().load( 'wood.jpg')  });
        var cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.y = -25
        cylinder.rotation.y = 1 / 2
        cylinder.name="Floor"
        container.add(cylinder);
        return container
    }
    getlight() {
        return this.lightconstructor
    }
    getMesh() {
        return this.lightconstructor2
    }
    getEnemyData(){
        console.log(hex3D.enemyArray)
        return hex3D.enemyArray
    }
}