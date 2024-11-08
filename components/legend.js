GENERATELEGENDENDPOINT = "https://fastapi-cors-proxy.onrender.com/api/exec?v=EXPERIENCE_LEGEND"

function Legend(){

    return {

    loadLegend() {
        this.model.isLoading = true;
        this.model.error = null;

        axios.post(GENERATELEGENDENDPOINT, this.model)
            .then(response => {
                console.log("Выполнена загрузка"+ JSON.stringify(response))
                this.model.legend = response.data.response;
                this.model.isLoading = false
                this.model.isLoaded = true
            })
            .catch(error => {
                console.log("Произошла ошибка")
                this.model.error = 'Error fetching data';
                this.model.isLoading = false
            })
            .finally(() => {
                this.model.isLoading = false
            });
    },

    pushToResume() {

        this.model.resume += this.model.legend

    }


    }

}

