GENERATEBASICINFO = "https://fastapi-cors-proxy.onrender.com/api/exec?v=BASICINFO"

function BasicInfo(){

    return {

        loadBasicInfo() {

            this.model.isLoading = true;
            this.model.error = null;

            if (!this.model.student_id) {
                alert("Айди ученика не задан")
            }

            const postData = { "student_id": this.model.student_id+""}

            console.log(postData)

            axios.post(GENERATEBASICINFO, postData)
                .then(response => {
                    console.log("Выполнена загрузка"+ JSON.stringify(response))
                    this.model.basic_info = response.data;
                    this.model.isLoading = false;
                    this.model.isLoaded = true;
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



    }

}
