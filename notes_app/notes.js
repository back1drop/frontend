 const edit_btn = document.querySelector(".edit_btn");
      const notes_cont = document.querySelector(".notes_cont");
      function create() {
        const note_box_container = document.createElement("div");
        note_box_container.classList.add("note_box");
        notes_cont.appendChild(note_box_container);
        const text = document.createElement("textarea");
        text.classList.add("text_box");
        note_box_container.appendChild(text);
        const img = document.createElement("img");
        img.src = "images/delete.png";
        img.classList.add("delete");
        note_box_container.appendChild(img);
        img.addEventListener("click", () => {
          note_box_container.remove();
        });
      }
      edit_btn.addEventListener("click", create);