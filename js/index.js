function showTaskPopup() {
  $("#mask").removeClass("hide");
  $("#popup").removeClass("hide");
}

function hideTaskPopup() {
  $("#mask").addClass("hide");
  $("#popup").addClass("hide");
}

function getAllTasks() {
  Parse.initialize("7nCPrOFcea39MgH4XeHu89RHGfljf854zPtGi0UV", "YexppRxfQ42Q7YtTvIpZgWyprVClwnmdKw2oNAAB");

  var TaskObject = Parse.Object.extend("Task");
  var query = new Parse.Query(TaskObject);
  query.find({
      success: function(results) {
          for (var i = 0; i < results.length; i++) {
              //if(results[i].get('userid') == userid)
              insertTask(results[i].get("taskName"), results[i].get("task"));
          }
      }
  });
}

function addTask() {
  var taskName = $("#taskName").val();
  var task = $("#task").val();

  Parse.initialize("7nCPrOFcea39MgH4XeHu89RHGfljf854zPtGi0UV", "YexppRxfQ42Q7YtTvIpZgWyprVClwnmdKw2oNAAB");

  var TaskObject = Parse.Object.extend("Task");
  var taskObject = new TaskObject();
  taskObject.set("taskName", taskName);
  taskObject.set("task", task);
  //var userid = document.getElementById("userid").innerHTML;
  //taskObject.set("userid", userid);
  taskObject.save(null, {
      success: function(object) {
          insertTask(taskName, task);
          hideTaskPopup();
      }
  });
}

function insertTask(taskName, task) {
  var newdiv = $("<div></div>");
  newdiv.addClass("flexable");
  //newdiv.addClass(objID);
  newdiv.append("<div class='taskName'>" + taskName + " - </div>");
  newdiv.append("<div class='task'> " + task + "</div>");
  newdiv.append("<input type='button' value='Delete Task' class='button' onclick='deleteTask(this)'/>");
  $("#tasks").append(newdiv);
}

function deleteTask(object) {
  var TaskObject = Parse.Object.extend("Task");
  var query = new Parse.Query(TaskObject);
  //var objID = $(object).attr("id");
  query.get(null, {
      success: function(result) {
          result.destroy({
              success: function(complete) {
                  //window.location.reload();
                  //$("." + objID).html(" ");
                  this.html(" ");
              }
          });
      }
  });
}

document.onload = getAllTasks();
