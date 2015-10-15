
//On attend la fin du chargement de kla page
$().ready(function(){
  // Variable globale
  var counter = 0;

  //Binding des evenements et des fonctions
  $("input[value='Ajouter']").click(addTodo);
  $("input[value='Tout effacer']").click(removeAll);
  $("input[value='Supprimer la séléction']").click(removeSel);


  function addTodo() {
    // Récupération du message
    var todoMessage = $("#todoMessage").val();
    $("#todoMessage").val(""); //On vide le contenu de l'input

    // Création du nouvel élément de la liste
    //Maintenant, on se base QUE sur le faite que l'element et coché pour le récupéré (voir removeSel())
    var newElement = "<li><input type='checkbox'> "+ todoMessage + "</li>";
    counter++;
    // Ajout du nouvel élément à la liste
    $("#todoList").append(newElement);
  }

  function removeAll() {
    // On récupère l'élément liste et On vide son contenu
    $("#todoList").children().remove();
  }

  function removeSel() {
    // On récupère les éléments coché. Il sont fourni sous forme d'un tableau
    var checkboxes = $("input:checked");// input:checked => tous les inputs qui sont cochés

    // each va parcourir l'ensemble du tableau et fournir les index de chaque element.
    // cela evite de faire for (i=0; i < tab.lenght -1; i++)
    checkboxes.each(function(index){
      // On supprime le parent (<li>) de l'element correspondant du tableau
      checkboxes[index].parentNode.remove();
    });
  }
});
