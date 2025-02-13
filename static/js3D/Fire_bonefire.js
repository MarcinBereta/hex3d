class Fire {
    constructor() {
        this.ArrayOfParticles = [];
        this.ArrayOfBonefire = []
        this.ArrayOfBonefireActive = []
        this.material = new THREE.MeshBasicMaterial({
            color: 0xff6600,
            transparent: true,
            opacity: 0.5,
            depthWrite: false,
            blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie ze sobą kolorów cząsteczek
        });
        this.geometry = new THREE.BoxGeometry(5, 5, 5);
        this.speed = 5;
        this.width = 100;
        this.number = 50;
        this.tempcontainer = [];
        this.light = new THREE.PointLight(0xff6600);
        this.light.intensity = 5;
        this.ArrayOfObject = [];
        this.czypierwszy=true;
    }
    generate(scene) {
        this.container = new THREE.Object3D();
        this.ArrayOfParticles = []
        for (let q = 0; q < 200; q++) {
            console.log("cos")
            let czastka = new Particle(this.geometry, this.material.clone());
            czastka.position.x = Math.floor(Math.random() * this.width)
            czastka.position.y = Math.floor(Math.random() * 10)
            czastka.position.z = Math.floor(Math.random() * this.width)
            let x = Math.floor(Math.random() * 5 + 1);
            let speed = Math.random() * 9 + 1
            czastka.scale.set(x, x, x)
            let obj = {
                part: czastka,
                speed: speed,
                positionx: czastka.position.x,
                positionz: czastka.position.z

            }
            if (q < this.number) {
                this.container.add(czastka)
                this.tempcontainer.push(obj)
               
            }
            this.ArrayOfParticles.push(obj)
           
        }
        this.ArrayOfBonefireActive.push(this.tempcontainer)
        this.ArrayOfBonefire.push(this.ArrayOfParticles)

        let light = new THREE.PointLight(0xff6600, 1);
        light.position.set(this.width / 2, 40, this.width / 2);
        this.container.add(light)
        this.ArrayOfObject.push(this.container)
        return this.container


    }
    update(scene, tabpoz) {
        $("#size").off("input").on("input", function () {
            this.number = $("#size").val()
            this.ArrayOfObject.forEach((cont) => {
                scene.remove(cont)
            })
            this.ArrayOfObject = []
            this.ArrayOfBonefireActive = []
            let x=0;
            this.ArrayOfBonefire.forEach((bonefire) => {
                this.tempcontainer=[]
              //  console.log(bonefire[0])
                this.container = new THREE.Object3D()
                console.log(this.number)
                for (let a = 0; a < this.number; a++) {
                    this.container.add(bonefire[a].part)
                    this.tempcontainer.push(bonefire[a])
                }
                let light = new THREE.PointLight(0xff6600, this.number/20);
                light.position.set(this.width / 2, 40, this.width / 2);
                this.container.add(light)
                this.ArrayOfBonefireActive.push(this.tempcontainer)
                this.ArrayOfObject.push(this.container)
                this.container.position.x=tabpoz[x].x
                this.container.position.z=tabpoz[x].z
                scene.add(this.container)
                x++;
            })


        }.bind(this))
        this.ArrayOfBonefireActive.forEach((tempcontainer) => {
            tempcontainer.forEach((part) => {
                if(this.czypierwszy==true){
                    part.part.position.y += part.speed / 10 ;

                }else{
                    part.part.position.y += part.speed*100000;

                }
                part.part.material.opacity = part.part.material.opacity - 0.004;
                part.part.position.x = part.positionx * (this.number / 200)
                part.part.position.z = part.positionz * (this.number / 200)
                if (part.part.position.y >= this.number*2.5) {
                    part.part.position.y = 0;
                    part.part.material.opacity = 1;
                }
            })
        })
    }
    gettab() {
        return this.ArrayOfParticles
    }
}