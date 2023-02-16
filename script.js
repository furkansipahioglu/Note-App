const addNote = document.querySelector(".add-note");
const popupBox = document.querySelector(".popup-container");
const popupTitle = popupBox.querySelector("header p");
const closePopup = popupBox.querySelector("header i");
const addBtn = popupBox.querySelector("button");
const titleNote = popupBox.querySelector("input");
const descNote = popupBox.querySelector("textarea");
const img_Input = document.querySelector("#imageInput");
const imgShow = document.getElementById("imgc");

var uploadedImage;
var update = false,
  noteId;

const monthsName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notesStorage = JSON.parse(localStorage.getItem("notes") || "[]");

img_Input.addEventListener("change", (e) => {
  const image = e.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(image);

  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
  });
});

addNote.addEventListener("click", () => {
  popupBox.classList.add("show");
});

closePopup.addEventListener("click", () => {
  update = false;
  titleNote.value = "";
  descNote.value = "";
  img_Input.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add New Note";
  popupBox.classList.remove("show");
});

function getDate() {
  let date = new Date();
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    year: date.getFullYear(),
    hour: date.getHours(),
  };
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleNote.value,
    noteDesc = descNote.value,
    imgInput = uploadedImage;
  uploadedImage = "";
  let day = getDate().day;
  let monthindex = getDate().month;
  month = monthsName[monthindex];
  let year = getDate().year;

  if (noteTitle || noteDesc) {
    let Notes = {
      title: noteTitle,
      desc: noteDesc,
      imgFile: imgInput,
      date: `${day} ${month} ${year} `,
    };
    // console.log(Notes);
    if (!update) {
      notesStorage.push(Notes);
    } else {
      update = false;
      notesStorage[noteId] = Notes;
    }

    localStorage.setItem("notes", JSON.stringify(notesStorage));
    show();
    closePopup.click();
  }
});

function imgSelect(img) {
  if (img == "") {
    console.log("boş");
  } else {
    return img;
  }
}

function deleteNotes(index) {
  let deleteConfirm = confirm("Are you sure?");
  if (!deleteConfirm) return;
  notesStorage.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesStorage));
  show();
}

function updateNotes(index, title, desc, img) {
  update = true;
  noteId = index;
  addNote.click();
  addBtn.innerText = "Update";
  popupTitle.innerText = "Update a Note";
  // console.log(index, title, desc);
  titleNote.value = title;
  descNote.value = desc;
  // console.log(img);
  uploadedImage = img;
}

function show() {
  document.querySelectorAll(".note").forEach((note) => note.remove());

  notesStorage.map((note, index) => {
    let content = `<li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span
            >${note.desc}</span
          >
          <div class="image">
            <img
              id="imgc"
              src=${imgSelect(note.imgFile)}
              alt=""
            />
          </div>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="menu">
              <li onclick="updateNotes(${index},'${note.title}','${
      note.desc
    }','${note.imgFile}')"><i class="uil uil-pen"></i>Edit</li>
              <li onclick="deleteNotes(${index})"><i class="uil uil-trash"></i>Delete</li>
            </ul>
          </div>
        </div>
      </li>`;

    addNote.insertAdjacentHTML("afterend", content);
  });
}

show();
