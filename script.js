let taskList = [];

let inputTask = document.getElementById("task");
let inputTaskDesc = document.getElementById("taskDesc");
let inputTaskDate = document.getElementById("taskDate");

const addTask = () => {
  let task = document.getElementById("task").value;
  let taskDesc = document
    .getElementById("taskDesc")
    .value.replace(/\n/g, "<br>");
  let taskDate = document.getElementById("taskDate").value;

  const errPopUp = (err) => {
    let popUpNotify = document.createElement("div");
    popUpNotify.classList.add("errPopUp");
    popUpNotify.innerHTML = `<p>${err}</p>`;
    document.body.appendChild(popUpNotify);

    setTimeout(() => {
      popUpNotify.remove();
    }, 3000);
  };

  console.log("função chamada!");

  if (task === "") {
    errPopUp("Preencha o nome da tarefa!");
    inputTask.style.borderColor = "#FA4B4E";

    setTimeout(() => {
      inputTask.style.borderColor = "";
    }, 3000);

    inputTask.focus();
  } else if (taskDesc === "") {
    errPopUp("Preencha a descrição da tarefa!");
    inputTaskDesc.style.borderColor = "#FA4B4E";

    setTimeout(() => {
      inputTaskDesc.style.borderColor = "";
    }, 3000);

    inputTaskDesc.focus();
  } else {
    if (taskDate) {
      const [year, month, day] = taskDate.split("-");
      const formattedTaskDate = `${day}/${month}/${year}`;

      taskList.push({
        task: task,
        description: taskDesc,
        date: formattedTaskDate,
      });

      inputTask.style.borderColor = "#B8C1EC";
      inputTaskDesc.style.borderColor = "#B8C1EC";

      inputTask.value = "";
      inputTaskDesc.value = "";
      inputTaskDate.value = "";

      createTask(task, taskDesc, formattedTaskDate);
      console.log("Tarefa com data criada!");
      console.log(taskList);
    } else {
      inputTask.style.borderColor = "#B8C1EC";
      inputTaskDesc.style.borderColor = "#B8C1EC";

      inputTask.value = "";
      inputTaskDesc.value = "";
      inputTaskDate.value = "";

      taskList.push({ task: task, description: taskDesc, date: "" });

      createTask(task, taskDesc);
      console.log("Tarefa sem data criada!");
      console.log(taskList);
    }
  }
};

const createTask = (task, taskDesc, formattedTaskDate) => {
  let today = new Date();

  let dd = today.getDate().toString().padStart(2, "0");
  let mm = (today.getMonth() + 1).toString().padStart(2, "0");
  let yyyy = today.getFullYear();

  const container = document.querySelector(".container");

  const activities = document.querySelector(".activities");

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("taskCard");

  const titleCard = document.createElement("div");
  titleCard.classList.add("titleCard");
  titleCard.innerHTML = `<p>${task}</p>`;

  const descCard = document.createElement("div");
  descCard.classList.add("descCard");
  descCard.innerHTML = `<p>${taskDesc}</p>`;

  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  buttons.style.display = "none";

  const editButton = document.createElement("img");
  editButton.src = "https://img.icons8.com/pulsar-line/480/edit.png";
  editButton.alt = "Botão Editar";

  editButton.onclick = () => {
    let taskIndex = taskList.findIndex(
      (t) =>
        (t.task === task && t.description === taskDesc) ||
        t.date === formattedTaskDate
    );

    if (taskIndex !== -1) {
      const editScreen = document.createElement("div");
      editScreen.classList.add("editScreen");

      editScreen.addEventListener("click", () => {
        editScreen.style.display = "none";
      });

      const editCard = document.createElement("div");
      editCard.classList.add("editCard");

      editCard.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      const editTaskInput = document.createElement("input");
      editTaskInput.type = "text";
      editTaskInput.value = taskList[taskIndex].task;

      const editDescInput = document.createElement("textarea");
      editDescInput.value = taskList[taskIndex].description;

      const editDateInput = document.createElement("input");
      editDateInput.type = "date";

      if (taskList[taskIndex].date) {
        const [day, month, year] = taskList[taskIndex].date.split("/");
        editDateInput.value = `${year}-${month}-${day}`;
      }

      const saveButton = document.createElement("button");
      saveButton.textContent = "Salvar";

      editCard.appendChild(editTaskInput);
      editCard.appendChild(editDescInput);
      editCard.appendChild(editDateInput);
      editCard.appendChild(saveButton);

      editScreen.appendChild(editCard);

      document.body.appendChild(editScreen);

      saveButton.onclick = () => {
        taskList[taskIndex].task = editTaskInput.value;
        task = taskList[taskIndex].task;

        taskList[taskIndex].description = editDescInput.value;
        taskDesc = taskList[taskIndex].description.replace(/\n/g, "<br>");

        if (taskList[taskIndex].date) {
          taskList[taskIndex].date = editDateInput.value
            .split("-")
            .reverse()
            .join("/");
          formattedTaskDate = taskList[taskIndex].date;
        }

        titleCard.innerHTML = `<p>${task}</p>`;
        descCard.innerHTML = `<p>${taskDesc}</p>`;

        if (!dateCard && formattedTaskDate) {
          dateCard = document.createElement("div");
          dateCard.classList.add("dateCard");
          taskDiv.appendChild(dateCard);
        }

        if (dateCard) {
          dateCard.innerHTML = `<p>${formattedTaskDate}</p>`;
        }

        editScreen.remove();

        console.log("Tarefa editada:", taskList[taskIndex]);
      };
    }
  };

  const doneButton = document.createElement("img");
  doneButton.src =
    "https://img.icons8.com/material-outlined/384/checked--v1.png";
  doneButton.alt = "Botão Feito";

  doneButton.onclick = () => {
    let taskIndex = taskList.findIndex(
      (t) =>
        (t.task === task && t.description === taskDesc) ||
        t.date === formattedTaskDate
    );

    const taskDone = document.createElement("div");
    taskDone.classList.add("taskDone");

    const info = document.createElement("div");
    info.innerHTML += `<p>${task}</p>`;
    info.innerHTML += `<p>${dd}/${mm}/${yyyy}</p>`;

    const checked = document.createElement("div");
    checked.classList.add("checked");

    const taskChecked = document.createElement("img");
    taskChecked.classList.add("taskChecked");
    taskChecked.src =
      "https://img.icons8.com/material-outlined/384/checked--v1.png";
    taskChecked.alt = "Tarefa realizada";

    checked.appendChild(taskChecked);
    taskDone.appendChild(info);
    taskDone.appendChild(checked);
    activities.appendChild(taskDone);

    taskDiv.remove();

    if (taskIndex !== -1) {
      taskList.splice(taskIndex, 1);
    }
  };

  const undoneButton = document.createElement("img");
  undoneButton.src =
    "https://img.icons8.com/material-outlined/384/cancel--v1.png";
  undoneButton.alt = "Botão Desfeito";

  undoneButton.onclick = () => {
    let taskIndex = taskList.findIndex(
      (t) =>
        t.task === task &&
        t.description === taskDesc &&
        t.date === formattedTaskDate
    );

    const taskUndone = document.createElement("div");
    taskUndone.classList.add("taskUndone");

    const info = document.createElement("div");
    info.innerHTML += `<p>${task}</p>`;
    info.innerHTML += `<p>${dd}/${mm}/${yyyy}</p>`;

    const undone = document.createElement("div");
    undone.classList.add("undone");

    const taskUnchecked = document.createElement("img");
    taskUnchecked.classList.add("taskUnchecked");
    taskUnchecked.src =
      "https://img.icons8.com/material-outlined/384/cancel--v1.png";
    taskUnchecked.alt = "Tarefa não realizada";

    undone.appendChild(taskUnchecked);
    taskUndone.appendChild(info);
    taskUndone.appendChild(undone);
    activities.appendChild(taskUndone);

    taskDiv.remove();

    if (taskIndex !== -1) {
      taskList.splice(taskIndex, 1);
    }
  };

  buttons.appendChild(editButton);
  buttons.appendChild(doneButton);
  buttons.appendChild(undoneButton);

  taskDiv.appendChild(buttons);

  let dateCard = null;

  if (formattedTaskDate) {
    dateCard = document.createElement("div");
    dateCard.classList.add("dateCard");
    dateCard.innerHTML = `<p>${formattedTaskDate}</p>`;

    taskDiv.appendChild(titleCard);
    taskDiv.appendChild(descCard);
    taskDiv.appendChild(dateCard);

    container.appendChild(taskDiv);
  } else {
    taskDiv.appendChild(titleCard);
    taskDiv.appendChild(descCard);

    container.appendChild(taskDiv);
  }

  taskDiv.addEventListener("mouseover", (event) => {
    if (event) {
      taskDiv.style.backgroundColor = "#B8C1EC";
      taskDiv.style.flexDirection = "column-reverse";
      titleCard.style.display = "absolute";
      descCard.style.display = "none";
      buttons.style.display = "flex";

      if (dateCard) {
        dateCard.style.display = "none";
      }
    }
  });

  taskDiv.addEventListener("mouseleave", (event) => {
    if (event) {
      taskDiv.style.backgroundColor = "#EEBBC3";
      taskDiv.style.flexDirection = "column";
      titleCard.style.display = "block";
      descCard.style.display = "block";
      buttons.style.display = "none";

      if (dateCard) {
        dateCard.style.display = "block";
      }
    }
  });
};

let form = document.getElementsByClassName("taskForm")[0];
let mobileButton = document.getElementsByClassName("mobileButton")[0];
const activitiesContainer = document.getElementsByClassName(
  "activitiesContainer"
)[0];
const main = document.getElementsByClassName("main")[0];

form.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

const showForm = () => {
  form.style.display = "flex";
  form.style.animation = "start 0.5s ease-out";
  activitiesContainer.style.display = "none";
  mobileButton.style.display = "none";
};

const hideForm = () => {
  form.style.animation = "retractForm 0.5s ease-out";
  mobileButton.style.display = "flex";
  activitiesContainer.style.display = "flex";
  setTimeout(() => {
    form.style.display = "none";
  }, 500);
};

const showActivities = () => {
  console.log("showActivities acionado!");

  let displayState = window.getComputedStyle(activitiesContainer).display;

  if (displayState === "none") {
    activitiesContainer.style.display = "flex";
    activitiesContainer.style.animation = "start 0.5s ease-out";
    form.style.height = "100svh";
    form.style.animation = "expand 1s ease-out";
  } else if (displayState === "flex") {
    activitiesContainer.style.animation = "retract 0.5s ease-out";
    form.style.height = "65svh";
    form.style.animation = "retract 0.5s ease-out";

    setTimeout(() => {
      activitiesContainer.style.display = "none";
    }, 1000);
  }
};
window.addEventListener("resize", () => {
  if (window.innerWidth > 601) {
    form.style.display = "flex";
    form.style.height = "100dvh";
    mobileButton.style.display = "none";
  }
  if (window.innerWidth < 600) {
    form.style.height = "65svh";
  }
});

let activities = document.getElementsByClassName("activities")[0];

activitiesContainer.addEventListener("mouseenter", () => {
  activities.style.justifyContent = "flex-start";
});
activitiesContainer.addEventListener("mouseleave", () => {
  activities.style.justifyContent = "flex-end";
});
