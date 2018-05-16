$(function(){
    resizeBox();
    $(window).resize(function () {
        resizeBox();
    })
    
    /* CONNEXION */
    $('#box-index form button').click(function(e) {
        var input = $('#box-index form input');
        e.preventDefault();
        input.each(function(element) {
            if($(this).val() !== '') {
                console.log('ok');
                $('#box-index form').submit();
            } else {
                console.log('Not ok');
                $(this).addClass('error').siblings('label').addClass('error');
            }
        })
    })
    $('.fb-login-button, ._5h0o').on('click', function() {
        window.location = "/inbox.html";
    })
    
    /* INDEX FORM */
    $("#box-index input.form-control").on('focus', function() {
        $(this).removeClass('error').siblings('label').addClass('focus').removeClass('error');
    }).on('blur', function() {
        $(this).siblings('label').removeClass('focus');
    })
    $("#box-index input.form-control").keyup(function() {
        if($(this).val() != "") {
            $(this).siblings('label').addClass('full');
        } else {
            $(this).siblings('label').removeClass('full');
        }
    })
    
    /* INBOX NAVBAR */
    if ($("#navbarNav").length) {
        var position, width;
        $("#navbarNav ul li").mouseenter(function() {
            width = $(this).width();
            position = $(this).position();
//            console.log('Width: '+width+' - left: '+position.left);
            $("ul .follower").width(width).offset({left: (position.left+31.0016)});
        }).mouseleave(function() {
            $("ul .follower").width(0).offset({left: 0});
        });
    }
    
    /* INBOX MESSAGES */
    $("#box-inbox table.list tr").on('click', function() {
        var img = $(this).children('.img').html();
        var name = $(this).children('.name').html();
        var msg = $(this).children('.msg').html();
        var id = $(this).children('.name').data('id');
        $(this).parents('.table').css("margin-left","-102%");
        /* Put informations on the new table */
        $('.messages th.img, .contact .img').html(img);
        $('.messages th.name').html(name).attr('data-id', id);
        $('.contact .msg').html(msg);
    });
    $("#box-inbox table.messages tr .back").on('click', function() {
        $('.table.list').css("margin-left","0%");
    });
    /* SAVE MESSAGE */
    $("#box-inbox .write textarea").on('change', function(){
        $("#box-inbox .write #send").on('click', function(){
            if($("#box-inbox .write textarea").val() !== '' && $("#box-inbox .write textarea").val() !== ' ') {
                // Add message
                sendMessage();
            } else {
                console.log('Not good');
            }
        })
    })
    /* Send message when Keypress Enter */
    $("#box-inbox .write textarea").keypress(function (e) {
        var key = e.which;
        var code = (e.keyCode ? e.keyCode : e.which);
        // Don't acccepte new line
        $(this).val( $(this).val().replace( /\r?\n/gi, '' ));
        // Key code for Enter
        if(code == 13) {
            if($(this).val() !== '' || $(this).val() !== ' ') {
                // Add message
                sendMessage();
            } else {
                console.log('Not good');
            }
        }
    })
    /* Pop-up */
    $("#box-inbox .write #add").on('click', function(e){
        e.stopPropagation();
        position = $(this).position();
        $("#box-inbox .popup").css({"left": (position.left - 31), "top": (position.top - 145), "display": "block"}).fadeIn();
    })
    $(document).click(function(e) {
        if($("#box-inbox .popup").length){
            $("#box-inbox .popup").fadeOut();
        }
    });
});


/* ALL FUNCTIONS */

/* Resize the content */
var resizeBox = function () {
    var size = $("#box-inbox .col-md-auto").width() + 'px';
    $("#box-inbox .table").css('min-width', size);
}

/* Send message */
var sendMessage = function() {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes();
    var contact = $(".contact_info .name").html();
    var contact_id = $(".contact_info .name").data('id');
    var message = $("#box-inbox .write #message_write").val();
    var template = '<tr class="add user last"><td></td><td colspan="3"><div class="bubble"><span class="time"></span><p class="msg"></p></div></td><td class="prof"><div class="arrow"></div><div class="img"><img src="http://resize2-elle.ladmedia.fr/r/700,,forcex/img/var/plain_site/storage/images/beaute/cheveux/coupe-de-cheveux/cheveux-boucles/cheveux-boucles-metisse2/56048993-1-fre-FR/Cheveux-boucles-metisse.jpg" alt="Emilie"></div></td></tr>';
    var lastElem = $("#box-inbox table.messages tbody tr.last");
    lastElem.after(template);
    /* Clear all of the last */
    $("#box-inbox table.messages tbody tr").removeClass('last');
    /* Change the data */
    $("#box-inbox table.messages tbody tr.add .time").html(time);
    $("#box-inbox table.messages tbody tr.add .msg").html(message);
    /* Add the class Last on the new */
    $("#box-inbox table.messages tbody tr.add").addClass('last');
    $("#box-inbox table.messages tbody tr.last").removeClass('template hidden add');
    $("#box-inbox .write textarea").val('');
    if($("#box-inbox .answer").length == 0) {
        console.log('nop');
        $("tr.writing").fadeIn();
        setTimeout(function() { answer() }, 2000);
    }
}
/* Answer auto message */
var answer = function(e) {
    $("tr.writing").fadeOut();
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes();
    var img = $("tr.contact .img").html();
    var template = '<tr class="contact add"><td class="prof"><div class="arrow"></div><div class="img"></div></td><td colspan="3"><div class="bubble"><span class="time">10:42</span><p class="msg">When do you want meet? I will be so happy to see you again :D <br>Stephanie is very good on design and front-end stuff :p</p></div></td><td></td></tr>';
    var lastElem = $("#box-inbox table.messages tbody tr.last");
    lastElem.after(template);
    /* Clear all of the last */
    $("#box-inbox table.messages tbody tr").removeClass('last');
    /* Change the data */
    $("#box-inbox table.messages tbody tr.add .time").html(time);
    $("#box-inbox table.messages tbody tr.add .img").html(img);
    /* Add the class Last on the new */
    $("#box-inbox table.messages tbody tr.add").addClass('last answer');
    $("#box-inbox table.messages tbody tr.last").removeClass('template hidden add');
    $("#box-inbox .write textarea").val('');
}
