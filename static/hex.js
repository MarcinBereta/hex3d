class Hex {
    constructor() {
        this.container = []
    }
    handle(value) {
        let val = 0, val2 = 3;
        switch (value.text()) {
            case "":
                value.html("</br></br></br></br>"+String.fromCodePoint(0x2191))
                val = 1;
                break;
            case String.fromCodePoint(0x2191):
                value.html("</br></br></br></br>"+ String.fromCodePoint(0x2197))
                val = 2;
                break;
            case String.fromCodePoint(0x2197):
                value.html("</br></br></br></br>"+String.fromCodePoint(0x2198))
                val = 3;
                break;
            case String.fromCodePoint(0x2198):
                value.html("</br></br></br></br>"+ String.fromCodePoint(0x2193))
                val = 4;
                break;
            case String.fromCodePoint(0x2193):
                value.html("</br></br></br></br>"+ String.fromCodePoint(0x2199))
                val = 5;
                break;
            case String.fromCodePoint(0x2199):
                value.html("</br></br></br></br>"+ String.fromCodePoint(0x2196))
                val = 6;
                break;
            case String.fromCodePoint(0x2196):
                value.html("")
                val = 0;
                break;
        }
        return val
    }
    send(tab, dl) {
        $.ajax({
            url: "/",
            data: { size: dl, table: tab },
            type: "POST",
            success: function (dane) {

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }
    receive() {
        var tab=[]
        $.ajax({
            url: "/receive",
            data: {},
            type: "POST",
            success: function (dane) {
                $('#sel1')
                    .val(Math.sqrt(dane[0].size))
                    .trigger('change');
                for (let i = 0; i < dane[0].size; i++) {
                    tab.push({
                        DIRIN:  dane[0].table[i].dirIn,
                        DIROUT: dane[0].table[i].dirOut,
                        TYPE: dane[0].table[i].type,
                        WHICH: dane[0].table[i].which,
                        POZX: dane[0].table[i].pozx,
                        POZY: dane[0].table[i].pozy
                    })
                    switch (dane[0].table[i].dirIn) {
                                        /*
2190 ← LEFTWARDS ARROW
2191 ↑ UPWARDS ARROW
2192 → RIGHTWARDS ARROW
2193 ↓ DOWNWARDS ARROW
2196 ↖ NORTH WEST ARROW
2197 ↗ NORTH EAST ARROW
2198 ↘ SOUTH EAST ARROW
2199 ↙ SOUTH WEST ARROW                */
                        case "0":
                            $("#" + i).html("")
                            break;
                        case "1":
                            $("#" + i).html("</br></br></br></br>"+String.fromCodePoint(0x2191))
                            break;
                        case "2":
                            $("#" + i).html("</br></br></br></br>"+String.fromCodePoint(0x2197))
                            break;
                        case "3":
                            $("#" + i).html("</br></br></br></br>"+ String.fromCodePoint(0x2198))
                            break;
                        case "4":
                            $("#" + i).html("</br></br></br></br>"+ String.fromCodePoint(0x2193))
                            break;
                        case "5":
                            $("#" + i).html("</br></br></br></br>"+ String.fromCodePoint(0x2199))
                            break;
                        case "6":
                            $("#" + i).html("</br></br></br></br>"+ String.fromCodePoint(0x2196))
                            break;
                    }
                }

            },
            error: function (xhr, status, error) {
            },
        })
        return {tab:tab}
    }
}