class DataManager {

    constructor() {
        this.chromeStorage = new ChromeStorage()
        this.authToolbarUrl = "http://test.extention/token"
    }


    authToolbar()
    {

        this.getData(
            this.authToolbarUrl,
            {},
            (response) => {
                let token = response.slice(0,-2)
                console.log(token)
                this.chromeStorage.setChromeStorage({session: token})
                this.chromeStorage.setChromeStorage({status: 'autorisated'})
                this.chromeStorage.getChromeStorage('session', result => {
                    console.log(result)
                })
            }
        )

    }

    dataSender() {

        this.chromeStorage.getChromeStorage('session', result => {
            this.getData(
                "https://test.extention/api/domain",
                {
                    domain: window.location.href,
                    token: result,
                    manager: 'App\\Models\\Manager'
                },
                (data) =>  {
                    console.log(data);
                    this.js_status(data.status);
                    this.js_type(data.type);
                    this.js_link_type(data.link_type);
                    this.js_referring_domains(data.referring_domains);
                    this.js_organic_search_traffic(data.organic_search_traffic);
                    this.js_server_status(data.url_status)
                    this.js_avatar(data.manager.avatar)
                }
            )
        })

    }

    getData(url, data, onSuccess, type = "GET")  {
        $.ajax({
            type:type,
            url: url,
            data: data,
            success: onSuccess
        });
    }


    js_status(status){
        switch (status) {
            case 'url is not in DB' :
                $('#js_status_1, #js_status_2').addClass( "bg-green" )
                break;
            case 'url is in DB' :
                $('#js_status_1, #js_status_2').addClass( "bg-red" )
                break;
            case 'url is in DB, but site is under moderation' :
                $('#js_status_1, #js_status_2').addClass( "bg-yellow" )
                break;
        }
    }

    js_type(type) {
        $('#js_type').text(type);
    }

    js_link_type(link_type) {
        $('#js_link_type').text(link_type);
    }

    js_referring_domains(referring_domains){
        $('#js_referring_domains').text(referring_domains);
    }

    js_organic_search_traffic(organic_search_traffic) {
        $('#js_referring_domains').text(organic_search_traffic);
    }

    js_server_status(server_status) {
        switch (server_status) {
            case '200' :
                console.log(server_status)
                $('#js_server_status').addClass( "ok" ).text(server_status);
                break;
            case '404' :
                $('#js_server_status').addClass( "error" ).text(server_status);
                break;
        }

    }

    js_avatar(avatar){
        $("#js_avatar").attr("src", "chrome-extension://"+chrome.runtime.id+"/images/"+avatar);
    }

}