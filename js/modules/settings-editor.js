/**
 * Settings Editor Module
 * 
 * Funcionalidades para o editor de configurações:
 * - Validação de banners
 * - Manipulação de imagens
 * - Validação de arquivos
 * - Mensagens de erro
 */

(function () {
    var $input = document.querySelectorAll('.editor-body input[type="file"]');
    var $btnRemove = document.querySelectorAll('.editor-body .btn-remove');
    var path = document.getElementById('url-host-images').value;
    var imageNotCharged = path + '/img/settings/image-not-charged.jpg';
    var $firstSection = 265;
    var $fonts = document.getElementById('font_theme');
    var $fontPreview = document.getElementById('font-preview');

    var $bannerTypes = document.querySelectorAll('.switcher-banner');

    var validaBanner = function(){
        $bannerTypes.forEach(function (value) {
            if(!document.getElementById('home_slick').checked){
                value.disabled = true;
                value.checked = false;
            }else{
                value.disabled = false;
            }
        }); 
    }

    validaBanner();

    document.getElementById('home_slick').addEventListener('click', function (evt) {
        validaBanner();
    });

    var getInputImage = function (value) {
        var nameInput = value.name;
        var targetInput = document.getElementById(nameInput);
        return targetInput;
    }

    var getImage = function (value) {
        var nameInput = value.name;
        var targetInput = document.getElementById(nameInput);
        var img = targetInput.nextElementSibling.childNodes[1] ? targetInput.nextElementSibling.childNodes[1] : '' ;
        return img;
    }

    var removeImage = function (value) {
        getImage(value).src = imageNotCharged;
        getInputImage(value).value = '';
    }

    var validaImage = function (value) {
        return /(^\S+)+(.png|.svg|.jpeg|.jpg|.gif)$/.test(value.value.split('\\')[2]) ? true : false;
    }

    var errorMessage = function (el) {
        var input = document.querySelectorAll(`.error-message-${el}`)[0];
        console.log(input)
        var template = `
        <div class="uk-alert-danger" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            <p>Verifique o nome do arquivo, ele n&#227;o deve conter espa&#231;os em branco, e nem caracteres especiais, al&#233;m de possuir as seguintes extens&#245;es <b>(.png, .jpg, .jpeg, .jpg, .gif e .svg)<b></p>
        </div>
        `
        input.innerHTML = template;
    }

    var changeImage = function (value, evt) {
        var img = getImage(value);
        var validImage = validaImage(value)

        if (validImage) {
            var file = evt.target.files[0];
            var reader = new FileReader();

            reader.addEventListener('load', function (e) {
                var temp = new Image();
                temp = img;
                temp.src = reader.result;
            }, false);

            reader.readAsDataURL(file);
            var input = document.querySelectorAll(`.error-message-${evt.target.name}`)[0];
            input.innerHTML = '';
        } else {
            evt.target.value = '';
            errorMessage(evt.target.name)
        }
    }

    // Event listeners
    $input.forEach(function (input) {
        input.addEventListener('change', function (evt) {
            changeImage(input, evt);
        });
    });

    $btnRemove.forEach(function (btn) {
        btn.addEventListener('click', function (evt) {
            evt.preventDefault();
            removeImage(btn);
        });
    });

    // Exportar funções para uso global
    window.validaBanner = validaBanner;
    window.removeImage = removeImage;
    window.errorMessage = errorMessage;
    window.changeImage = changeImage;
})(); 