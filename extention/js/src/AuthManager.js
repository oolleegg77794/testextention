
class AuthManager {

    sendMessage(type, text){
        chrome.runtime.sendMessage({
            type : type,
            text : text
        });
    }

    constructor(query) {
        this.authUrl = "https://test.extention/api/authenticate"
        this.regUrl = "https://test.extention/api/register"
        this.logOutUrl = "https://test.extention/api/logout"
        this.chromeStorage = new ChromeStorage()
        this.toolbar = new WtgToolBar()
        this.query = query


        switch (this.query.type) {
            case 'auth' :
                this.auth()
                break;
            case 'reg' :
                this.reg()
                break;
            case 'logout' :
                this.logOut()
                break;
        }


    }

    auth()
    {
        this.formRequest(
            this.authUrl,
            {
                email: this.query.email,
                password: this.query.password
            },
            (response) =>  {
                if("error" !== response) {
                    this.chromeStorage.setChromeStorage({session: response})
                    this.chromeStorage.setChromeStorage({status: 'autorisated'})
                    this.chromeStorage.setChromeStorage({email: this.query.email})
                    this.sendMessage('success','Вас авторизовано!')
                    $('#iframe2').remove()
                    this.toolbar.render_index()
                }
                if ("error" === response) {
                    this.sendMessage('error','Не правильний email або пароль!')
                }
            }
        )

    }

    reg()
    {
        this.formRequest(
            this.regUrl,
            {
                email: this.query.email,
                password: this.query.password
            },
            () => {
                console.log('success register')
            }
        )

    }

    logOut()
    {
        this.formRequest(
            this.logOutUrl,
            {},
            () => {
                this.chromeStorage.setChromeStorage({status: 'not autorisated'})
                console.log('success logout')
                $('#iframe1').remove()
                this.toolbar.render_logout()
            }
        )
    }


    formRequest(url, data, onSuccess, type = "POST")  {
        $.ajax({
            type:type,
            url: url,
            data: data,
            success: onSuccess
        });
    }



}


