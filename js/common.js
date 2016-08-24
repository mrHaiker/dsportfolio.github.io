(function() {
   
    var app = {
         
        initialize: function () {
            this.setUpListeners();
        },
 
        setUpListeners: function () {
            $('form').on('submit', app.submitForm);
            $('form').on('keydown', 'input', app.removeError);
        },
 
        submitForm: function (e) {
            e.preventDefault();
            
            var form = $(this),
                submitBtn = form.find('button[type="submit"]');
 
            if( app.validateForm(form) === false ) return false;

             //alert("Ваше сообщение отправленно, ожидайте ответа!");

            submitBtn.attr('disabled', 'disabled');
 
            var str = form.serialize();
 
            $.ajax({
                url: 'contact_form/contact_process.php',
                type: 'POST',
                data: str
            })
            .done(function(msg) {
                if(msg === "OK"){
                    var result = "<div class='bg-success'>Ваше сообщение отправленно, ожидайте ответа!</div>"
                    form.html(result);
                }else{
                    form.html(msg);
                }
            })
            .always(function() {
                submitBtn.removeAttr('disabled');
            });
            
        },
 



        validateForm: function (form){
            var inputs = form.find('input'),
                valid = true;
 
           // inputs.tooltip('destroy');
            
            if (valid) {
                $.each(inputs, function(index, val) {
                    var input = $(val),
                       
                        val = input.val(),
                        formGroup = input.parents('.6u'),
                        label = formGroup.find('label').text().toLowerCase(),
                        textError = "Не все поля заполнены, сообщение не отправленно!"
                        
                        if(val.length === 0) {
                            alert(textError);
                            valid = false;
                            return valid;
                        }

                 });
            };
            return valid;
        },
 


        removeError: function () {
            $(this).tooltip('destroy').parents('.form-group').removeClass('has-error');
        }       
         
    }
 
    app.initialize();
 
}());