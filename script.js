document.addEventListener('DOMContentLoaded', () => {
    let createBox = document.querySelector(".createBox");
    let notes = document.querySelector(".notes");
    let input = document.getElementById("userInput");
    let i = 0;
    let zIndexCounter = 1;
    let dragNote = null;
    let offsetX, offsetY;

    document.getElementById("create").addEventListener("click", () => {
        createBox.style.display = "block";
        input.focus();
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            createNote();
        }
    });

    function createNote() {
        if (input.value.trim() === "") return;

        let div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
            <div class="details"><h3>${input.value}</h3></div>
            <div class="buttons">
                <button class="edit"><i class="fa-solid fa-edit"></i></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
                <button class="color"><i class="fa-solid fa-palette"></i></button>
            </div>
        `;

        // Fill random colors in note
        div.style.backgroundColor = getRandomColor();

        div.style.zIndex = zIndexCounter++;
        div.addEventListener('mousedown', (e) => {
            dragNote = div;
            offsetX = e.clientX - div.getBoundingClientRect().left;
            offsetY = e.clientY - div.getBoundingClientRect().top;
            div.style.zIndex = zIndexCounter++;
        });

        div.querySelector('.delete').addEventListener('click', () => {
            div.remove();
        });

        div.querySelector('.edit').addEventListener('click', () => {
            let newText = prompt("Edit your note:", div.querySelector('.details h3').textContent);
            if (newText !== null) {
                div.querySelector('.details h3').textContent = newText;
            }
        });

        div.querySelector('.color').addEventListener('click', () => {
            div.style.backgroundColor = getRandomColor();
        });

        notes.appendChild(div);

        input.value = "";
        createBox.style.display = "none";
    }

    document.addEventListener('mousemove', (e) => {
        if (dragNote) {
            dragNote.style.left = `${e.clientX - offsetX}px`;
            dragNote.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        dragNote = null;
    });

    function getRandomColor() {
        const colors = ["#c2ff3d", "#ff3de8", "#3dc2ff", "#04e022", "#bc83e6", "#ebb328"];
        if (i >= colors.length) {
            i = 0;
        }
        return colors[i++];
    }
});
