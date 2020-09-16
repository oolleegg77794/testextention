class DataManager {

    getData(url, data, onSuccess, type = "GET")  {
        $.ajax({
            type:type,
            url: url,
            data: data,
            success: onSuccess
        });
    }

}