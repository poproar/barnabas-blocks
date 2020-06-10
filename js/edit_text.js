function editText() {
    var textarea = document.getElementById("content_arduino");
    var editBtn = document.getElementById("edit-button");
    var blocksTab = document.getElementById('tab_blocks');//className = 'taboff hide';


    if (textarea.readOnly) {
        editBtn.classList.toggle("red-text");
        blocksTab.classList.toggle("hide");
        textarea.readOnly = false;
    }
    else {
        editBtn.classList.toggle("red-text");
        blocksTab.classList.toggle("hide");
        textarea.readOnly = true;
    }
}