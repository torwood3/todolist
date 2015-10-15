
//On attend la fin du chargement de kla page
$().ready(function(){
  // Variable globale
  var currentPerson = "";
  var url = "https://iwa2015.herokuapp.com/api/todo/";

  //Binding des evenements et des fonctions
  $("input[value='Afficher']").click(getUser);
  $("input[value='Ajouter']").click(saveTodo);
  $("input[value='Tout effacer']").click(removeAll);
  $("#todoList").on('click','button.done',removeSel); //Je met un listenner sur todolist, et lorsqu'on cliquera sur
  // l'element qui a la class "done", la fonction se lance

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
      var newElement = "<li class=\"list-group-item\"> " + todoMessage
          + "<button class=\"btn btn-success btn-xs pull-right done\"><span class=\"glyphicon glyphicon-ok\"></span></button>"
          + "</li>";
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

  function removeSel(event) {
      //Event, c'est toute les informations concernent l'envenement qui a déclenché la fonction.
      //Ici c'est donc un click, qui a pour "target" le boutton done. Ensuite on remonte au parent 'li' et on le supprime
      event.target.parentNode.remove();
  }
});
