function boardSelect() {
    if ($("#board-select").data("board") == "nano") {
        window.localStorage.board = "uno";
        $("#board-select").data("board", "uno");
        document.getElementById("board-show").innerText = "UNO";
    } else {
        window.localStorage.board = "nano";
        $("#board-select").data("board", "nano");
        document.getElementById("board-show").innerText = "NOGGIN";

    }
}