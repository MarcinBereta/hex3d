class Light {
    constructor() {
        this.ContainerOfContainers = []
        this.ContainerOfLights = []
    }
    getLight() {
        let rozmiar = settings.getSettings().geometry.parameters.width
        let container = new THREE.Object3D()
        var light = new THREE.PointLight(0xffff00, 5, rozmiar*1.5);
        var geometry = new THREE.SphereGeometry(10, 32, 32);
        var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        var sphere = new THREE.Mesh(geometry, material);
        light.intensity = 0.02
        container.add(light)
        container.add(sphere)
        this.ContainerOfLights.push(light)
        this.ContainerOfContainers.push(container)
        container.position.y = 20;
        return container;
    }
    getPointLightModel(){
        let rozmiar = settings.getSettings().geometry.parameters.width
        let container = new THREE.Object3D()
        var light = new THREE.PointLight(0xffff00, 1 , rozmiar);
        container.add(light)
        this.ContainerOfLights.push(light)
        this.ContainerOfContainers.push(container)
        container.position.y = 20;
        return container;
    }
    getPointLightAlly(){
        let rozmiar = settings.getSettings().geometry.parameters.width
        console.log(rozmiar)
        let container = new THREE.Object3D()
        var light = new THREE.PointLight(0x0000ff, 10 , rozmiar);
        container.add(light)
        this.ContainerOfLights.push(light)
        this.ContainerOfContainers.push(container)
        container.position.y = 20;
        return container;
    }
    getContainers() {
       // console.log(this.ContainerOfContainers)
        return this.ContainerOfContainers;
    }
    getLights() {
     //   console.log(this.ContainerOfLights)
        return this.ContainerOfLights;
    }
    control() {
        let lights = light.getLights()
        let containers = light.getContainers()
        $("#LightInt").on("change", function () {
      //      console.log(lights)

            lights.forEach((light) => {
                light.intensity = this.value / 5
            })
        })
        $("#LightPoz").on("change", function () {

            containers.forEach((container) => {
                container.position.y = this.value
            })
        })
    }
}