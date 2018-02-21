var $fileInput = $(".cdn--drop--input");
var $droparea  = $(".cdn--dropper");

var noop = () => {};

$fileInput.on("dragenter focus click", function() { $droparea.addClass("is-active");    });
$fileInput.on("dragleave blur drop",   function() { $droparea.removeClass("is-active"); });

$fileInput.on("change", function() {
    var filesCount = $(this)[0].files.length;
    var $textContainer = $(this).prev(".cdn--drop--num");
    if (filesCount === 1) $textContainer.text($(this).val().split("\\").pop());
    else $textContainer.text(filesCount + " files selected");
});

$("#submit").on("click", function(){
    var files = $(".cdn--drop--input").get(0).files;

    if (files.length > 0){
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            formData.append("uploads[]", file, file.name);
        }
        $.ajax({
            url: "/upload",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(data){
                $("#status").removeClass("cdn--status--failure");
                $("#status").addClass("cdn--status--success");
                $("#status").text("Upload successful!");
            },
            error: function(error){
                $("#status").removeClass("cdn--status--success");
                $("#status").addClass("cdn--status--failure");
                $("#status").text("Upload failed!");
            },
            xhr: function() {
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) { noop(); }, false);
                return xhr;
            }
        });
    }
});
