//loading examples via ajax
var ajax;
function createAJAX() {
    if (window.ActiveXObject) { //IE
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                return null;
            }
        }
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        return null;
    }
}

function onSuccess() {
    if (ajax.readyState == 4) {
        if (ajax.status == 200) {
            try {
                var xml = Blockly.Xml.textToDom(ajax.responseText);
            } catch (e) {
                alert('Error parsing XML:\n' + e);
                return;
            }
            var count = Blockly.mainWorkspace.getAllBlocks().length;
            if (count && confirm('Replace existing blocks?\n"Cancel" will merge.')) {
                Blockly.mainWorkspace.clear();
            }
            Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
        } else {
            alert("Server error");
        }
    }
}

function load_by_url(uri) {
    ajax = createAJAX();
    if (!ajax) {
        alert('Not compatible with XMLHttpRequest');
        return 0;
    }
    if (ajax.overrideMimeType) {
        ajax.overrideMimeType('text/xml');
    }

    ajax.onreadystatechange = onSuccess;
    ajax.open("GET", uri, true);
    ajax.send("");
}