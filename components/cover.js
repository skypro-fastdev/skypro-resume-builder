GENERATECOVERENDPOINT = "https://fastapi-cors-proxy.onrender.com/api/exec?v=COVER"

function Cover(){

    return {

        loadCover() {
            this.model.isLoading = true;
            this.model.error = null;

            axios.post(GENERATECOVERENDPOINT, this.model)
                .then(response => {
                    console.log("Выполнена загрузка"+ JSON.stringify(response))
                    this.model.cover = response.data.response;
                    this.isLoading = false
                    this.model.isLoaded = true
                })
                .catch(error => {
                    console.log("Произошла ошибка")
                    this.error = 'Error fetching data';
                    this.model.isLoading = false
                })
                .finally(() => {
                    this.model.isLoading = false
                });
        }


    }

}

