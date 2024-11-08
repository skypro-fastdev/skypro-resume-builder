CHECKRESUMEENDPOINT = "https://fastapi-cors-proxy.onrender.com/api/exec?v=CHECK_RESUME_BY_PROFESSION"

function CheckForm(){

    return {

        loadData(event){

            this.fetchData()
        },

        fetchData() {
            this.model.isLoading = true;
            this.model.error = null;

            // Axios GET request
            axios.post(CHECKRESUMEENDPOINT, this.model)
                .then(response => {
                    console.log("Выполнена загрузка"+ JSON.stringify(response))
                    this.model.checklist = response.data;
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