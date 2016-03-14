/*{
    "curly": true,
    "eqeqeq": true,
    "forin": true,
    "immed": true,
    "indent": 4,
    "latedef": true,
    "newcap": true,
    "nonew": true,
    "quotmark": "double",
    "undef": true,
    "unused": true,
    "strict": true,
    "trailing": true,
    "node": true,
    "predef":["_"]
}*/
/*globals $:false*/
var main = function() {
            var addlist;

            function getvalue() {
                $.getJSON("http://localhost:3000/actors", function(data) {

                    data.forEach(function(actorname) {

                        if (JSON.stringify(actorname.starred) === "true") {
                            addlist = "<li class='mdl-list__item'>" + "<span class='mdl-list__item-primary-content'>" + "<i class='material-icons mdl-list__item-avatar'>person</i>" + actorname.name + "</span>" + "<span class='mdl-list__item-secondary-content' >" + "<a class='mdl-list__item-secondary-action' href='#'><i id=" + actorname.id + "  class='material-icons'>star</i></a>" + "</span>" + "</li>";
                            $(addlist).appendTo("ul.mdl-list");

                        } else {
                            addlist = "<li class='mdl-list__item'>" + "<span class='mdl-list__item-primary-content'>" + "<i class='material-icons mdl-list__item-avatar'>person</i>" + actorname.name + "</span>" + "<span class='mdl-list__item-secondary-content' >" + "<a class='mdl-list__item-secondary-action' href='#'><i id=" + actorname.id + " class='material-icons'>star_border</i></a>" + "</span>" + "</li>";

                            $(addlist).appendTo("ul.mdl-list");
                        }
                    });

                });
            }
            $("button").on("click", function(textname) {

                if ($("#username").val()) {
                    var stringname = $("#username").val();
                    $.post("http://localhost:3000/actors", {
                        name: stringname,
                        "starred": "false"
                    });
                    $("ul").empty();
                    $("#username").val("");
                    getvalue();
                }

            });

            getvalue();
            $(document).on("click", ".mdl-list__item-secondary-content .material-icons", function(event) {

                var id = $(this).attr("id");
                var iconElement = $(this);
                $.getJSON("http://localhost:3000/actors", function(data) {
                    data.forEach(function(actorname) {

                        if (id === JSON.stringify(actorname.id)) {
                            //  alert(id);

                            if (JSON.stringify(actorname.starred) === "true") {
                                //   alert($(iconElement).text());
                                $(iconElement).replaceWith("<i id=" + JSON.stringify(actorname.id) + " class='material-icons'>star_border</i>");
                                $.ajax({
                                    url: 'http://localhost:3000/actors/' + id,
                                    type: 'PUT',
                                    data: JSON.stringify({
                                        name: actorname.name,
                                        starred: false
                                    }),
                                    contentType: 'application/json',
                                    success: function(res) {
                                     //   alert("successtrue");
                                    }
                                });
                            } else {
                                $(iconElement).replaceWith("<i id=" + JSON.stringify(actorname.id) + " class='material-icons'>star</i>");
                                $.ajax({
                                    url: 'http://localhost:3000/actors/' + id,
                                    type: 'PUT',
                                    data: JSON.stringify({
                                        name: actorname.name,
                                        starred: true
                                    }),
                                    contentType: 'application/json',
                                    success: function(res) {
                                      //  alert("successfalse");
                                    }
                                });
                            }
                        }
                    });
               });
             });
        };
        $(document).ready(main);