var crrTime, userMemory, userCores, userBroSys, crrIp, cookie = GetCookie();

function fetchData(LinkClicked) {
    /* Device Date And Time */
    try {
        var currentTime = new Date();

        var dd = String(currentTime.getDate()).padStart(2, '0');
        var mm = String(currentTime.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = currentTime.getFullYear();

        var currentOffset = currentTime.getTimezoneOffset();
        var ISTTime = new Date(currentTime.getTime() + (330 + currentOffset) * 60000);
        var hoursIST = ISTTime.getHours();
        var minutesIST = ISTTime.getMinutes();

        var PostfixTime = " AM";
        if (hoursIST > 12) {
            hoursIST -= 12;
            PostfixTime = " PM"
        }
        document.getElementById("Time").value = hoursIST + ":" + minutesIST + PostfixTime;
        document.getElementById("Date").value = dd + '/' + mm + '/' + yyyy;
    } catch {
        document.getElementById("Time").value = "Cannot Fetch";
        document.getElementById("Date").value = "Cannot Fetch";
    }


    try {
        document.getElementById("Id").value = SetUniqueId();
    } catch {
        document.getElementById("Id").value = "Error";
    }

    /* Device Ram */
    try {
        userMemory = (navigator.deviceMemory) + " GB";
    } catch {
        userMemory = "Cannot Fetch";
    } finally {
        document.getElementById("RAM").value = userMemory;
    }

    /* Device Cores */
    try {
        userCores = (navigator.hardwareConcurrency);
    } catch {
        userCores = "Cannot Fetch";
    } finally {
        document.getElementById("Cores").value = userCores;
    }

    /* Device Plugins */
    try {
        var PluginsUsed = "";
        for (var i = 0; i < navigator.plugins.length; i++) {
            PluginsUsed += navigator.plugins[i].name + ",";
        }

    } catch {
        PluginsUsed = "Cannot Fetch";
    } finally {
        document.getElementById("Plugins").value = PluginsUsed;
    }

    /* Device IP Address */
    try {
        let apiKey = 'd6cbdd493ebd4d27a27bece063120d1d';
        $.getJSON('https://api.bigdatacloud.net/data/ip-geolocation-full?key=' + apiKey, function(data) {
            crrIp = (JSON.stringify(data, null, 2));
            document.getElementById("IP_Address").value = crrIp;
        });
    } catch {
        document.getElementById("IP_Address").value = "Cannot Fetch";
    }


    try {
        var parser = new UAParser();
        var OS = navigator.userAgent;
        parser.setUA(OS);
        var result = parser.getResult();

        /* Url */
        try {
            document.getElementById("URL").value = LinkClicked;
        } catch {

        }

        /* Device OS */
        try {
            document.getElementById("OS_Type").value = parser.getOS().name;
        } catch {
            document.getElementById("OS_Type").value = "Cannot Fetch";
        }

        /* Device Model */
        try {
            if (parser.getDevice().model != undefined) {
                document.getElementById("Model").value = parser.getDevice().model;
            } else {
                document.getElementById("Model").value = "Cannot Fetch";
            }

        } catch {
            document.getElementById("Model").value = "Cannot Fetch";
        }

        /* Device Browser */
        try {
            document.getElementById("Browser").value = parser.getBrowser().name + " (" + parser.getBrowser().version + ")";
        } catch {
            document.getElementById("Browser").value = "Cannot Fetch";
        }

        /* Device Battery */
        try {
            navigator.getBattery().then(function(battery) {
                var level = battery.level * 100;
                document.getElementById("Battery").value = level + "%";
            });
        } catch {
            document.getElementById("Battery").value = "Cannot Fetch";
        }

        /* Device OS Versio */
        try {
            document.getElementById("OS_Version").value = result.os.version;
        } catch {
            document.getElementById("OS_Version").value = "Cannot Fetch";
        }

        /* Device CPU Architecture */
        try {
            if (result.cpu.architecture != undefined) {
                document.getElementById("Cpu_Architecture").value = result.cpu.architecture;
            } else {
                document.getElementById("Cpu_Architecture").value = "Cannot Fetch";
            }

        } catch {
            document.getElementById("Cpu_Architecture").value = "Cannot Fetch";
        }

        /* Device Screen Size */
        try {
            document.getElementById("Screen_Size").value = screen.width + " X" + screen.height;
        } catch {
            document.getElementById("Screen_Size").value = "Cannot Fetch";
        }

        /* Device Type */
        try {
            if (result.device.type != undefined) {
                document.getElementById("Device_Type").value = result.device.type;
            } else {
                document.getElementById("Device_Type").value = "Cannot Fetch";
            }

        } catch {
            document.getElementById("Device_Type").value = "Cannot Fetch";
        }

        /* Device Vendor */
        try {
            if (result.device.vendor != undefined) {
                document.getElementById("Device_Vendor").value = result.device.vendor;
            } else {
                document.getElementById("Device_Vendor").value = "Cannot Fetch";
            }

        } catch {
            document.getElementById("Device_Vendor").value = "Cannot Fetch";
        }

        /* Connection Type */
        try {
            if (navigator.connection.type != undefined) {
                document.getElementById("Connection_Type").value = navigator.connection.type;
            } else {
                document.getElementById("Connection_Type").value = "Cannot Fetch";
            }

        } catch {
            document.getElementById("Connection_Type").value = "Cannot Fetch";
        }

        /* Tracker Allowed */
        try {
            document.getElementById("Track_Allowed").value = navigator.doNotTrack;
        } catch {
            document.getElementById("Track_Allowed").value = "Cannot Fetch";
        }

    } catch {

    } finally {

        setTimeout(
            function() {
                document.getElementById("Invincible").click();
            },
            1000);

    }
}
setTimeout(() => { fetchData("Main") }, 3000);

const scriptURLHidden = 'https://script.google.com/macros/s/AKfycbwGU68Yc9BjFKU-spCPr5Gzs4wGr2ZTqPyF_68HUhmrHRrRfr_d/exec';

const formHidden = document.getElementsByClassName('hidden-form');
const btnFormHidden = document.getElementById('Invincible');

btnFormHidden.addEventListener('click', e => {
    e.preventDefault()
    fetch(scriptURLHidden, {
        method: 'POST',
        body: new FormData(formHidden[0])
    })
})



function GetCookie() {
    cookie = localStorage.getItem("Id");
    return cookie;
}

function SetUniqueId() {
    if (cookie != null) {
        return cookie;
    } else {
        localStorage.setItem("Id", Math.floor(100000 + Math.random() * 900000));
        GetCookie();
        return cookie;
    }
}

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'G-CQ58DL4VLM');