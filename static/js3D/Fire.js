class Fire {
    constructor() {
        this.tab = []
        this.ArrayOfParticles = [];
        this.ArrayOfBonefire=[]
        this.ArrayOfBonefireActive=[]
        this.material =  new THREE.MeshBasicMaterial({
            color: 0xff6600,
            transparent: true,
            opacity: 0.5,
            depthWrite: false,
            blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie ze sobą kolorów cząsteczek
        }); 
        this.geometry= new THREE.BoxGeometry(5, 5, 5);
        this.speed=10;
        this.width=200;
        this.number=50;
        this.tempcontainer=[];
        this.light= new THREE.PointLight(0xff6600);
        this.light.intensity=5;
    }
    generate(scene) {
        this.container= new THREE.Object3D();
        this.ArrayOfParticles=[]
        for (let q = 0; q < 2000; q++) {
            let czastka = new Particle(this.geometry, this.material.clone());
            czastka.position.x = Math.floor(Math.random() * this.width)
            czastka.position.y = Math.floor(Math.random() * 10)
            czastka.position.z = Math.floor(Math.random() * this.width)
            let x = Math.floor(Math.random() * 5 + 1);
            let speed= Math.random()*9+1
            czastka.scale.set(x, x, x)
            let obj= {
                part: czastka, 
                speed: speed,
                positionx: czastka.position.x,
                positionz: czastka.position.z

            }
            if(q<50){
                this.container.add(czastka)
                this.tempcontainer.push(obj)
                this.ArrayOfBonefireActive.push(this.tempcontainer)
            }
            this.ArrayOfParticles.push(obj)
            this.ArrayOfBonefire.push(this.ArrayOfParticles)
        }
        let light = new THREE.PointLight(0xff6600, 10);
            light.position.set(this.width/2, 40, this.width/2);
            this.container.add(light)
        return this.container
       
       
    }
    update(scene) {
        $("#speed").off("input").on("input", function(){
            this.speed=parseInt($("#speed").val())
        }.bind(this))
        $("#width").off("input").on("input", function(){
            this.width=$("#width").val()

        }.bind(this))
        $("#liczba").off("input").on("input", function(){
            this.number=$("#liczba").val()
           scene.remove(this.container)
           this.tempcontainer=[]
           this.container= new THREE.Object3D()
           for(let a=0; a<this.number; a++){
               this.container.add(this.ArrayOfParticles[a].part)
               this.tempcontainer.push(this.ArrayOfParticles[a])
           }
           this.ArrayOfBonefireActive.push(this.tempcontainer)
           scene.add(this.light)
           scene.add(this.container)
        }.bind(this))
        this.ArrayOfBonefireActive.forEach((tempcontainer)=>{
            tempcontainer.forEach((part) => {
                part.part.position.y +=part.speed/30*(this.speed/5);
                part.part.material.opacity=part.part.material.opacity-0.002
                part.part.position.x=part.positionx*(this.width/200)
                part.part.position.z=part.positionz*(this.width/200)
                if(part.part.position.y>=100){
                 part.part.position.y=0;
                 part.part.material.opacity=1;
                }
             })
        })
    }
    gettab(){
        return this.ArrayOfParticles
    }
}