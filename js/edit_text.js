function editText() {
    var textarea = document.getElementById("content_arduino");
    var editBtn = document.getElementById("edit-button");

    if (textarea.readOnly) {
        editBtn.classList.toggle("red-text");
        textarea.readOnly = false;
    }
    else {
        editBtn.classList.toggle("red-text");
        textarea.readOnly = true;
    }
}