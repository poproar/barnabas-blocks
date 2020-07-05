function lessonSelect() {
    if ($("#lesson-select").data("lesson") == "bot") {
        window.localStorage.board = "racer";
        $("#lesson-select").data("lesson", "racer");
        document.getElementById("lesson-show").innerText = "RACER";
        document.getElementById("lesson-icon").innerText = 'directions_car';
    } else {
        window.localStorage.board = "bot";
        $("#lesson-select").data("lesson", "bot");
        document.getElementById("lesson-show").innerText = "ROBOT";
        document.getElementById("lesson-icon").innerText = 'portrait';
    }
    buildtoolBox();
}