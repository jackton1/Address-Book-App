var AddressBook = {
    addContact: function () {
        var re  = new RegExp("[0-9]{10}");
        var select = document.getElementById("contacts");
        var username = document.getElementById("user-name");
        var phoneNumber = document.getElementById("phone-num");
        var option = document.createElement("option");
        option.value = username.value;
        option.text = option.value;
        option.setAttribute("data-phoneNumber", phoneNumber.value);
        if(username.value !== "" && phoneNumber.value !== "" && re.test(phoneNumber.value)){
            select.add(option);
        }else{
            (username.value === "") ? username.style.border = "2px solid red" : phoneNumber.style.border = "2px solid red" ;
            (username.value !== "")? username.style.border = "" : phoneNumber.style.border = "" ;
        }
    },
    showContact: function selectContact(select) {
            var option = select.options[select.selectedIndex];
            var ul = document.getElementById('contact-list');

            var choices = ul.getElementsByTagName('input');
            for (var i = 0; i < choices.length; i++)
                if (choices[i].value == option.value)
                    return;

            var li = document.createElement('li');
            var input = document.createElement('input');
            var text = document.createTextNode(option.firstChild.data);

            input.type = 'hidden';
            input.name = 'contacts[]';
            input.value = option.value;

            li.appendChild(input);
            li.appendChild(text);
            li.setAttribute('onclick', "this.parentNode.removeChild(this)");
            ul.appendChild(li);
        },
    deleteContact: function () {
        var select = document.getElementById("contacts");
        for (var i = select.options.length - 1; i >= 0; i--){
            if (select.options[i].selected){
                select.remove(select.options.selectedIndex);
            }
        }
    }

};



