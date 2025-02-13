console.log("level 3d")
class Level3D {
    constructor() {
        this.getdata()
        this.container = new THREE.Object3D()
        this.direkin = 0;
        this.direkout = 0;
    }
    getdata() {
        var tab = []
        $.ajax({
            url: "/getData", // url post-a na serwerze
            data: {}, // przykładowe dane
            type: "POST",
            success: function (data) {
                console.log(data[0])
                data[0].table.forEach(lvl => {
                    tab.push(lvl)
                })
                console.log(tab)
                level.drawlvl(tab)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    drawlvl(data) {
        let datasort = data.sort(this.sort)
        let geometry = settings.getSettings().geometry
        let howmany = parseInt(geometry.parameters.width * 2 - geometry.parameters.width / 4);
        let howmany2 = parseInt(geometry.parameters.width * 2 - geometry.parameters.width);
        // console.log(geometry)
        //     console.log(data.lenght)
        let prev, light, mesh;
        this.table = [];
        this.firstpoz = []
        this.firepoz = [];
        var x = 0;
        console.log(datasort)
        //     console.log(data)
        datasort.forEach(poz=>{
            if(poz.dirIn!=0){
                prev=parseInt(poz.dirIn)
            }
        })
        console.log("prev"+prev)
        datasort.forEach(lvl => {
            if (lvl.dirIn != 0) {
                let direkin = 66;
                let direkout = 66;
                switch (parseInt(lvl.dirIn)) {
                    case 1:
                        direkin = 3
                        break;
                    case 2:
                        direkin = 2;
                        break;
                    case 3:
                        direkin = 1;
                        break;
                    case 4:
                        direkin = 0;
                        break;
                    case 5:
                        direkin = 5;
                        break;
                    case 6:
                        direkin = 4;
                        break;
                    default:

                }
                switch (prev) {
                    case 1:
                        direkout = 4
                        break;
                    case 2:
                        direkout = 5;
                        break;
                    case 3:
                        direkout = 0;
                        break;
                    case 5:
                        direkout = 2;
                        break;
                    case 4:
                        direkout = 1;
                        break;
                    case 0:
                        direkout = 3;
                        break;
                    default:
                }
                //    console.log(direkin, direkout)
                let hex;
                if (prev != undefined) {
                    console.log(lvl)
                    hex = hex3D.drawHex(direkin, direkout, lvl.type)

                } else {
                    hex = hex3D.drawHex(direkin, direkout, lvl.type)

                }
                if (lvl.type == "Enemy") {
                    this.table.push({
                        z: lvl.x * howmany,
                        x: lvl.y * howmany2
                    })
                }

                if (lvl.type == "LIGHT") {
                    this.firepoz.push({
                        z: lvl.x * howmany,
                        x: lvl.y * howmany2
                    })
                }


                this.container.add(hex)
                if (x == 0) {
                    this.firstpoz.push({
                        z: lvl.x * howmany,
                        x: lvl.y * howmany2
                    })
                }

                hex.position.z = lvl.x * howmany;
                hex.position.x = lvl.y * howmany2;
                x++;
                prev = direkin

            }


        })
        console.log(this.firepoz)
        base.draw3D(this.container);

    }
    returnTab() {
        console.log(this.table)
        return this.table
    }
    sort(a, b) {
        if (parseInt(a.which) < parseInt(b.which)) {
            return -1;
        }
        if (parseInt(a.which) > parseInt(b.which)) {
            return 1;
        }
        return 0;
    }
    GetFirstPoz() {
        return this.firstpoz
    }
    GetFirePoz() {
        console.log(this.firepoz)
        return this.firepoz
    }


}