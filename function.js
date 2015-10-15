// Variable globale
var counter = 0;

function addTodo() {
  // Récupération du message
  var input = document.getElementById("todoMessage");
  var todoMessage = input.value;
  // On efface le champs liste
  input.value = "";
  // On récupère l'élément liste
  var listContainer = document.getElementById("todoList");
  // Création du nouvel élément de la liste
  var newElement = document.createElement("li");
  var newElementId = counter++;
  newElement.setAttribute("id", newElementId);
  newElement.innerHTML = "<input type='checkbox' name='todoCheck' value='" + newElementId + "'> " + todoMessage;
  // Ajout du nouvel élément à la liste
  listContainer.appendChild(newElement);
}

function removeAll() {
  // On récupère l'élément liste
  var listContainer = document.getElementById("todoList");
  // On vide son contenu
  listContainer.innerHTML = "";
}

function removeSel() {
  // On récupère les éléments du DOM
  var listeContainer = document.getElementById("todoList");
  var checkboxes = document.getElementsByName("todoCheck");
  // On boucle sur chaque élément
  for(var i = checkboxes.length-1; i >= 0; i--) {
    // Si la checkbox est cochée ...
    if(checkboxes[i].checked) {
      // On supprime la ligne !
      var todo = document.getElementById(checkboxes[i].value);
      todo.parentNode.removeChild(todo);
    }
  }
}


