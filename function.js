
//On attend la fin du chargement de kla page
$().ready(function(){
  // Variable globale
  var counter = 0;
  var currentPerson = "";
  var url = "https://iwa2015.herokuapp.com/api/todo/";

  //Binding des evenements et des fonctions
  $("input[value='Afficher']").click(getUser);
  $("input[value='Ajouter']").click(saveTodo);
  $("input[value='Tout effacer']").click(removeAll);
  $("input[value='Supprimer la séléction']").click(removeSel);

  function getUser() {
    //Appel ajax
    $.get(url + $("#personId").val(),
      function(data){
          data.forEach(function(todoMessage) {
            addTodo(todoMessage);
          });
          enableAddTodo();
        }
    ).fail(function(){
          alert("Error !!");
      });
}

  function enableAddTodo(){
    $("#todoMessage").prop( "disabled", true );
    $("input[value='Ajouter']").prop( "disabled", true );
  }

  function saveTodo(){
    // Récupération du message
    var todoMessage = $("#todoMessage").val();
    $("#todoMessage").val(""); //On vide le contenu de l'input
    //Appel ajax
    $.post(url + currentPerson, {"message" : todoMessage},
        //Callback appelé a la fin de la requete si succes
        function(data){
            addTodo(todoMessage);
        }).fail(function(){
          alert("Error !! Try again ;)");
        })
  }

  function addTodo(todoMessage) {
        // Création du nouvel élément de la liste
    //Maintenant, on se base QUE sur le faite que l'element et coché pour le récupéré (voir removeSel())
    var newElement = "<li><input type='checkbox'> "+ todoMessage + "</li>";
    counter++;
    // Ajout du nouvel élément à la liste
    $("#todoList").append(newElement);
  }

  function removeAll() {
    $.post(url + currentPerson + "/delete", {},
        function(data){
          if(data.statusText == 200) {
            // On récupère l'élément liste et On vide son contenu
            $("#todoList").children().remove();
          }
        }).fail(function(){
          alert("Error !! Try again ;)");
        });
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
