class Base3D {
    draw3D(value) {
        var bieg = false;
        var czy1 = false;
        var czy2 = false;
        var model = new Model()
        var modelik;
        var TableOfFire = []
        var ringrotation;
        var modelcopy = new THREE.Object3D();
        var objectlist = [];
        var rotation1;
        var allAlly = [];
        var modcont = new THREE.Object3D();
        var clickedVect = new THREE.Vector3(0, 0, 0);
        var directionVect = new THREE.Vector3(0, 0, 0);
        var clickedVect2 = new THREE.Vector3(0, 0, 0);
        var directionVect2 = new THREE.Vector3(0, 0, 0);
        var clickedVect3= new THREE.Vector3(0,0,0)
        var scene = new THREE.Scene();
        var axes = new THREE.AxesHelper(1000)
        var cube
        var cameraradius=200;
        scene.add(axes);
        light.control();
        light.getLights();
        light.getContainers();
        var stan;
        var SpotLight;
        let miejsce = level.returnTab();
        console.log(miejsce)
        miejsce.forEach(miej => {
            allyModel.loadModel("js3D/vader.js", function (modeldata) {
                var cont = new THREE.Object3D()
                cont.name = "CONTAINER_TEST";
                let axes1 = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu
                axes1.position.y = 10;
                var mod = modeldata.children[0];
                console.log(mod)
                cont.add(modeldata.children[0])
                modeldata.position.y = 2
                cont.add(axes1)
                var lightpoint = light.getPointLightAlly();
                cont.add(lightpoint)
                lightpoint.position.y = 50;
                lightpoint.position.z = mod.position.z;
                lightpoint.position.x = mod.position.x;
                $(cont).mouseover(function () {
                    ring = new Ring();
                    scene.add(ring)
                });
                let obj = {
                    conti: cont,
                    ally: mod,
                    axe: axes1,
                    run: true,
                    marked: false
                }
                scene.add(cont)
                cont.position.z = miej.z;
                cont.position.x = miej.x;
                allAlly.push(obj)
            })
        })
        var ognisko1 = new Fire()
        var FirePlace = level.GetFirePoz();
        console.log(FirePlace)
        FirePlace.forEach((location) => {
            let FireContainer = new THREE.Object3D();
            let ognisko = ognisko1.generate()
            ognisko.position.x = location.x
            ognisko.position.z = location.z
            FireContainer.add(ognisko)
            let rozmiar = settings.getSettings().geometry.parameters.width
            let light = new THREE.PointLight(0xff6600, 1, rozmiar * 1.5);
            light.position.set(location.x, 40, location.z);
            FireContainer.add(light)
            TableOfFire.push({
                FirePlace: ognisko,
                Light: light
            })
            scene.add(FireContainer)
        })
        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2()
        var ring;
        var camera = new THREE.PerspectiveCamera(
            45,    // kąt patrzenia kamery (FOV - field of view)
            window.innerWidth / window.innerHeight,    // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            10000    // maksymalna renderowana odległość od kamery
        );
        let geometry1 = new THREE.PlaneGeometry(10000, 10000, 5, 5);
        let material1 = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide, wireframe: true });
        var plane = new THREE.Mesh(geometry1, material1);
        plane.position.set(0, 0, 0)
        plane.name = "Floor"
        plane.rotation.x = Math.PI / 2;
        //scene.add(plane)
        scene.add(value)
        var geometry = new THREE.SphereGeometry(5, 32, 32);
        var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        var sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        model.loadModel("js3D/tris.js", function (modeldata) {
            let miejsce321 = level.GetFirstPoz();
            modcont.add(modeldata)
            modelik = modeldata.children[0]
            modelcopy.add(modeldata)
            var geometry3 = new THREE.BoxGeometry(1, 1, 1);
            var material3 = new THREE.MeshBasicMaterial({ color: 0xc0c0c0 });
            cube = new THREE.Mesh(geometry3, material3);
            SpotLight = new THREE.SpotLight(0xff0000, 20, 100);
            modelcopy.add(cube);
            SpotLight.position.set(0, 50, 0);
            SpotLight.target = cube;
            cube.position.y = 10;
            modelcopy.add(SpotLight)
            var lightpoint = light.getPointLightModel();
            modelcopy.add(lightpoint)
            modelcopy.position.set(miejsce321[0].x, 0, miejsce321[0].z)
            // console.log("model został załadowany", modelik)
            scene.add(modelcopy) // data to obiekt kontenera zwrócony z Model.js
            modelik.position.y = -10
            model.setAnimation("stand", modelik);

        })
        $("#root").on("mousedown", () => {
            poruszanie();
            czy2 = true
        })

        $("#root").on("mousemove", function () {
            if (czy2 == true) {
                poruszanie();

            } else {
                mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
                mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
                raycaster.setFromCamera(mouseVector, camera);
                var intersects = raycaster.intersectObjects(scene.children, true);
                if (intersects[0] != undefined) {


                    if (intersects[0].object.parent.children[0].name == "vader") {
                        for (let a = 0; a < allAlly.length; a++) {
                            if (allAlly[a].conti.uuid == intersects[0].object.parent.uuid) {
                                if (allAlly[a].run == true) {
                                    if (ringrotation == false) {
                                        ring = new Ring();
                                        ring.position.x = allAlly[a].conti.position.x
                                        ring.position.z = allAlly[a].conti.position.z
                                        ring.rotation.x = Math.PI / 2;
                                        ring.position.y = 12;
                                        scene.add(ring)
                                        ringrotation = true;
                                    }

                                }
                            }
                        }
                    } else {
                        if (ringrotation == true) {
                            console.log(scene.children)
                        }
                        ringrotation = false;
                        scene.remove(ring);
                        ring = undefined;
                    }
                }
            }
        })
        $("#root").on("mouseup", function () {
            czy2 = false;
        })
        function poruszanie() {
            mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);
            if (intersects.length > 0) {
                if (intersects[0].object.parent.children[0].name == "vader") {
                    for (let a = 0; a < allAlly.length; a++) {
                        if (allAlly[a].conti.uuid == intersects[0].object.parent.uuid) {

                            if (allAlly[a].run == true) {
                                if (ringrotation == false) {

                                    ring = new Ring();
                                    ring.position.x = allAlly[a].conti.position.x
                                    ring.position.z = allAlly[a].conti.position.z
                                    ring.rotation.x = Math.PI / 2;
                                    ring.position.y = 12;
                                    scene.add(ring)
                                    ringrotation = true;
                                }

                            }


                            if (objectlist.includes(allAlly[a])) {

                            } else {
                                objectlist.push(allAlly[a])
                                allyModel.setAnimation("Run", allAlly[a].ally);
                                objectlist.forEach((ally) => {
                                    allyModel.setAnimation("Stand", ally.ally);
                                    allyModel.setAnimation("Run", ally.ally);

                                })

                            }
                        }
                    }
                } else {
                    if (ringrotation == true) {
                        console.log(scene.children)
                    }
                    ringrotation = false;
                    scene.remove(ring);
                    ring = undefined;
                }
                console.log("BIEG:" + bieg)

                if (intersects[0].object.name == "Floor") {
                    if (bieg == false) {
                        model.setAnimation("run", modelik);
                        objectlist.forEach((ally) => {
                            allyModel.setAnimation("Run", ally.ally);

                        })
                        bieg = true;
                    }
                    console.log(intersects[0].object)
                    modelik.position.y = 10;
                    clickedVect = intersects[0].point
                    clickedVect.y = 0;
                    sphere.position.x = clickedVect.x
                    sphere.position.y = clickedVect.y
                    sphere.position.z = clickedVect.z
                    directionVect = clickedVect.clone().sub(modelcopy.position).normalize() // sub - > odejmij pozycję playera od pozycji kliknięcia
                    var angle = Math.atan2(
                        modelcopy.position.clone().x - clickedVect.x,
                        modelcopy.position.clone().z - clickedVect.z
                    )
                    modelik.rotation.y = angle + Math.PI * 1.5;
                    rotation1 = angle + (Math.PI / 4) * 2 + Math.PI;
                    czy1 = true;

                }
            }
        }
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setSize(window.innerWidth, window.innerHeight);
        $("#root").append(renderer.domElement);

        $("#campoz").on("input", function(){
            console.log("TEST")
            console.log($("#campoz").val())
            cameraradius=$("#campoz").val()
            console.log(cameraradius)
        })
        camera.position.set(1000, 1000, 1000)
        camera.lookAt(scene.position)
        var obrot = 0;
        let rozmiar = settings.getSettings().geometry
        function render() {
            requestAnimationFrame(render);
            //   allyModel.updateModel()
            renderer.render(scene, camera);

            TableOfFire.forEach(tab => {
                clickedVect3 = tab.FirePlace.position
                let distance = Math.floor(Math.round((modelcopy.position.clone().distanceTo(clickedVect3))))
                if (distance <= 170) {
                    ognisko1.update(tab.FirePlace);

                    tab.FirePlace.visible = true;
                    tab.Light.intensity = 1;
                } else {
                    tab.FirePlace.visible = false;
                    tab.Light.intensity = 0;
                }

            })

            var delta = clock.getDelta();
            if (czy1 == true) {
                console.log(Math.floor(Math.round((modelcopy.position.clone().distanceTo(clickedVect)))))
                if (Math.floor(Math.round((modelcopy.position.clone().distanceTo(clickedVect)))) < 8) {
                    czy1 = false
                    model.setAnimation("stand", modelik);
                    objectlist.forEach((ally) => {
                        allyModel.setAnimation("Stand", ally.ally);


                    })
                    bieg = false;
                }

                modelcopy.rotation.y = directionVect.y
                modelcopy.translateOnAxis(directionVect, 3)
                camera.position.x = modelcopy.position.x + rozmiar.parameters.width*(cameraradius/rozmiar.parameters.width)
                camera.position.z = modelcopy.position.z + rozmiar.parameters.width*(cameraradius/rozmiar.parameters.width)
                camera.position.y = modelcopy.position.y + (rozmiar.parameters.width * 1.5)*(cameraradius/rozmiar.parameters.width)
                camera.lookAt(modelcopy.position)

            }
            if (objectlist.length > 0) {


                for (let z = 0; z < objectlist.length; z++) {
                    if (z == 0) {
                        clickedVect2 = modelcopy.position


                        directionVect2 = clickedVect2.clone().sub(objectlist[z].conti.position).normalize() // sub - > odejmij pozycję playera od pozycji kliknięcia
                        var angle2 = Math.atan2(
                            objectlist[z].conti.position.clone().x - clickedVect2.x,
                            objectlist[z].conti.position.clone().z - clickedVect2.z

                        )
                        //   console.log(angle)
                        objectlist[z].ally.rotation.y = angle2 - Math.PI / 2
                        objectlist[z].axe.rotation.y = angle2 + Math.PI
                        console.log(objectlist[z].conti.position.clone().distanceTo(clickedVect2))

                        if (objectlist[z].conti.position.clone().distanceTo(clickedVect2) > 50) {

                            objectlist[z].conti.translateOnAxis(directionVect2, 5)
                            objectlist[z].conti.rotation.y = directionVect2.y
                        } else {
                            if (objectlist[z].run == true) {
                                objectlist[z].conti.position.z = objectlist[z].conti.position.z - 20
                                objectlist[z].run = false
                                //   allyModel.setAnimation("Stand", objectlist[z].ally);
                            }

                        }
                    } else {
                        clickedVect2 = objectlist[z - 1].conti.position

                        directionVect2 = clickedVect2.clone().sub(objectlist[z].conti.position).normalize() // sub - > odejmij pozycję playera od pozycji kliknięcia
                        var angle2 = Math.atan2(
                            objectlist[z].conti.position.clone().x - clickedVect2.x,
                            objectlist[z].conti.position.clone().z - clickedVect2.z

                        )
                        //   console.log(angle)
                        objectlist[z].ally.rotation.y = angle2 - Math.PI / 2
                        objectlist[z].axe.rotation.y = angle2 + Math.PI


                        if (objectlist[z].conti.position.clone().distanceTo(clickedVect2) > 40) {
                            objectlist[z].conti.translateOnAxis(directionVect2, 5)
                            objectlist[z].conti.rotation.y = directionVect2.y

                        } else {
                            if (objectlist[z].run == true) {
                                objectlist[z].run = false
                                objectlist[z].conti.position.z = objectlist[z].conti.position.z - 50
                                //    allyModel.setAnimation("Stand", objectlist[z].ally);
                            }

                        }
                    }


                }
            }
            if (cube != undefined) {
                cube.position.x = Math.sin(obrot / 20) * 60;
                cube.position.z = Math.cos(obrot / 20) * 60;
                obrot++;
            }
            if (ringrotation == true) {
                ring.rotation.z += 0.01;
            }
            allyModel.updateModel();
            model.updateModel(delta)
        }
        render();
    }
    move() {

    }
}