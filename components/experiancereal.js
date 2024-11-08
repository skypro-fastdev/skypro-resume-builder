GENERATEEXPERIENCEREAL = "https://fastapi-cors-proxy.onrender.com/api/exec?v=EXPERIENCE_REAL"

function ExperienceReal(){

    return {


        loadExperience() {

            this.model.isLoading = true;
            this.model.error = null;

            console.log("loadExperience")

            axios.post(GENERATEEXPERIENCEREAL, this.model)
                .then(response => {
                    console.log("Выполнена загрузка"+ JSON.stringify(response))
                    this.model.experience_real = response.data.response;
                    this.isLoading = false;
                    this.model.isLoaded = true;
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
