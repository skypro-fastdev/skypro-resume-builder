GENERATEPERSONALPOINT = "https://fastapi-cors-proxy.onrender.com/api/exec?v=ABOUT"

function Personal(){

    return {


        loadPersonal() {
            this.model.isLoading = true;
            this.model.error = null;

            axios.post(GENERATEPERSONALPOINT, {"student_id": this.model.student_id})
                .then(response => {
                    console.log("Выполнена загрузка"+ JSON.stringify(response))
                    this.model.personal = response.data.response;
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
        },




    }

}

