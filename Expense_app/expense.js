
      const add_btn = document.querySelector(".add_btn");
      const add_filter = document.querySelector(".add_filter");
      const clear = document.querySelector(".clear");
      const spend_input = document.querySelector(".spend_input");
      const category = document.querySelector("#category");
      const category2 = document.querySelector("#category2");
      const description_box = document.querySelector(".description_box");
      const spend_date = document.querySelector(".spend_date");
      const expense_head = document.querySelector(".expense_head");
      const total_transactions = document.querySelector(".total_transactions");
      const avg_expense = document.querySelector(".avg_expense");
      const recent_expenses = document.querySelector(".recent_expenses");
      const filterDate = document.querySelector(".filter_date");

      // Modal elements
      const editModal = document.querySelector(".edit_modal");
      const editAmount = document.querySelector(".edit_amount");
      const editCategory = document.querySelector(".edit_category");
      const editDescription = document.querySelector(".edit_description");
      const editDate = document.querySelector(".edit_date");
      const saveEdit = document.querySelector(".save_edit");
      const cancelEdit = document.querySelector(".cancel_edit");

      let sum = 0;
      let counter = 0;
      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      let currentEditIndex = null;

      function renderExpenses() {
        document.querySelectorAll(".expense_cont").forEach((e) => e.remove());
        sum = 0;
        counter = 0;

        expenses.forEach((exp, index) => {
          const expense_cont = document.createElement("div");
          expense_cont.classList.add("expense_cont");
          recent_expenses.appendChild(expense_cont);

          const current_expenses = document.createElement("div");
          const expense_btns = document.createElement("div");
          current_expenses.classList.add("current_expenses");
          expense_btns.classList.add("expense_btns");
          expense_cont.appendChild(current_expenses);
          expense_cont.appendChild(expense_btns);

          const stall1 = document.createElement("div");
          const stall2 = document.createElement("div");
          stall1.classList.add("stall1");
          stall2.classList.add("stall2");
          current_expenses.appendChild(stall1);
          current_expenses.appendChild(stall2);

          const description_item = document.createElement("p");
          const date_of_spend = document.createElement("p");
          description_item.classList.add("description_item");
          description_item.textContent = exp.description;
          date_of_spend.classList.add("date_of_spend");
          date_of_spend.textContent = exp.date;
          stall1.appendChild(description_item);
          stall1.appendChild(date_of_spend);

          const category_type = document.createElement("p");
          const amount_spent = document.createElement("p");
          category_type.classList.add("category_type");
          category_type.textContent = exp.categoryText;
          amount_spent.classList.add("amount_spent");
          amount_spent.textContent = `KSH.${exp.amount}`;
          stall2.appendChild(category_type);
          stall2.appendChild(amount_spent);

          const edit_btn = document.createElement("button");
          const delete_btn = document.createElement("button");
          edit_btn.textContent = "📝 EDIT";
          delete_btn.textContent = "🚮 DELETE";
          edit_btn.classList.add("edit_btn");
          delete_btn.classList.add("delete_btn");
          expense_btns.appendChild(edit_btn);
          expense_btns.appendChild(delete_btn);

          // Update totals
          sum += parseFloat(exp.amount);
          counter++;

          // Edit button functionality
          edit_btn.addEventListener("click", () => {
            currentEditIndex = index;
            openEditModal(exp);
          });

          // Delete button functionality
          delete_btn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this expense?")) {
              expenses.splice(index, 1);
              updateLocalStorage();
              renderExpenses();
            }
          });
        });

        updateStats();
      }

      // ---------- Update Totals ----------
      function updateStats() {
        const average = counter > 0 ? Math.round(sum / counter) : 0;
        expense_head.textContent = `KSH.${sum}`;
        avg_expense.textContent = `KSH.${average}`;
        total_transactions.textContent = counter;
      }

      // ---------- Add New Expense ----------
      add_btn.addEventListener("click", () => {
        if (
          spend_input.value !== "" &&
          category.value !== "" &&
          description_box.value !== "" &&
          spend_date.value !== ""
        ) {
          const expense = {
            amount: parseFloat(spend_input.value),
            category: category.value,
            categoryText: category.options[category.selectedIndex].text,
            description: description_box.value,
            date: spend_date.value,
          };

          expenses.push(expense);
          updateLocalStorage();
          renderExpenses();

          spend_input.value = "";
          category.value = "";
          description_box.value = "";
          spend_date.value = "";
        } else {
          alert("Please fill in all fields!");
        }
      });

      // ---------- Edit Modal Functions ----------
      function openEditModal(exp) {
        editModal.style.display = "flex";
        editAmount.value = exp.amount;
        editCategory.value = exp.category;
        editDescription.value = exp.description;
        editDate.value = exp.date;
      }

      cancelEdit.addEventListener("click", () => {
        editModal.style.display = "none";
      });

      saveEdit.addEventListener("click", () => {
        const updatedExp = {
          amount: parseFloat(editAmount.value),
          category: editCategory.value,
          categoryText: editCategory.options[editCategory.selectedIndex].text,
          description: editDescription.value,
          date: editDate.value,
        };

        expenses[currentEditIndex] = updatedExp;
        updateLocalStorage();
        renderExpenses();
        editModal.style.display = "none";
      });

      // ---------- Filters ----------
      function normalizeDate(dateString) {
        let cleanDate = dateString.replace(/\//g, "-");
        let date = new Date(cleanDate);
        return date.toISOString().split("T")[0];
      }

      add_filter.addEventListener("click", () => {
        const filtdate = filterDate.value;
        const filtCat = category2.options[category2.selectedIndex]?.text;

        document.querySelectorAll(".expense_cont").forEach((expenseCont) => {
          const stall1 = expenseCont.querySelector(".stall1");
          const stall2 = expenseCont.querySelector(".stall2");
          const categoryType = stall2.children[0].textContent.trim();
          const addDate = stall1.children[1].textContent.trim();

          // Normalize the date
          const normalizedAddDate = normalizeDate(addDate);
          const normalizedFiltDate = filtdate ? normalizeDate(filtdate) : null;

          let show = true;

          // Apply filters independently
          if (normalizedFiltDate && normalizedAddDate !== normalizedFiltDate) {
            show = false;
          }

          if (filtCat && filtCat !== categoryType) {
            show = false;
          }

          expenseCont.style.display = show ? "flex" : "none";
        });
      });

      clear.addEventListener("click", () => {
        filterDate.value = "";
        category2.value = "";
        document
          .querySelectorAll(".expense_cont")
          .forEach((exp) => (exp.style.display = "flex"));
      });

      // ---------- LocalStorage ----------
      function updateLocalStorage() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
      }

      // Load on start
      renderExpenses();
    