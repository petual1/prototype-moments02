const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
const closeIcon = popupBox.querySelector("header i");
const titleTag = popupBox.querySelector("input[type='text']");
const descTag = popupBox.querySelector("textarea");
const deadlineTag = popupBox.querySelector("input[type='date']");
const addBtn = popupBox.querySelector("button");

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Adicionar nova anotação";
    addBtn.innerText = "Adicionar anotação";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = deadlineTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        const leftDeadline = new Date(left[leftIndex].deadline).getTime();
        const rightDeadline = new Date(right[rightIndex].deadline).getTime();

        if (leftDeadline > rightDeadline) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else if (leftDeadline < rightDeadline) {
            result.push(right[rightIndex]);
            rightIndex++;
        } else {
            if (left[leftIndex].priority < right[rightIndex].priority) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function showNotes() {
    if (!notes) return;

    notes = mergeSort(notes);

    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let deadlineDate = note.deadline ? new Date(note.deadline + "T00:00:00Z") : null;
        let formattedMonth = deadlineDate ? months[deadlineDate.getUTCMonth()] : null;
        let formattedDate = deadlineDate ? deadlineDate.getUTCDate() : null;
        let formattedYear = deadlineDate ? deadlineDate.getUTCFullYear() : null;
        let deadlineFormatted = deadlineDate ? `${formattedMonth} ${formattedDate}, ${formattedYear}` : 'None';

        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <span>Prazo: ${deadlineFormatted}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}', '${note.deadline}')"><i class="uil uil-pen"></i>Editar</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Excluir</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Você tem certeza que deseja excluir essa anotação?");
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, filterDesc, deadline) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    deadlineTag.value = deadline;
    popupTitle.innerText = "Atualizar uma anotação";
    addBtn.innerText = "Atualizar anotação";
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
        description = descTag.value.trim(),
        deadline = deadlineTag.value.trim();

    if (title || description) {
        let currentDate = new Date(),
            month = months[currentDate.getMonth()],
            day = currentDate.getDate(),
            year = currentDate.getFullYear();

        let noteInfo = {
            title,
            description,
            priority: notes.length + 1, 
            deadline: deadline || null, 
            date: `${month} ${day}, ${year}`
        }
        if (!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = {
                ...noteInfo,
                deadline: deadline || null 
            };
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});
