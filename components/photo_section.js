
function PhotoSection(store){

    return {

        $template: `
        
            <h3>Фото</h3>
            
            <div v-if="model.hh_access_token">
                <div class="alert alert-info text-muted mt-3">
                  <small>На фото резюме должно быть хорошо видно лицо. Снимок должен быть сдержанным, при этом легким и непринужденным. </small>
                </div>
               
                <input type="file" ref="fileInput" class="form-control" > 
                        
                <button v-if="store.sections.photo=='ready'" @click="upload()" class="btn btn-dark mt-3" >📷 Загрузить</button>
                <button v-if="store.sections.photo=='loading'"  class="btn btn-dark mt-2" disabled>Идет загрузка</button>
                
            </div>
            
            <div v-if="!model.hh_access_token">
                <div class="alert alert-info text-muted mt-3">
                  <small>Предоставьте доступ к личному кабинету на HH.ru чтобы загружать фотографии</small>
                </div>
               
            </div>            
            
        `,

        upload(){

            store.setStatus("photo", "loading")

            const file = this.$refs.fileInput.files[0];

            if(!file){alert("Вы не выбрали фото для загрузки")}

            const formData = new FormData();
            formData.append('file', file);
            formData.append('hh_access_token', this.model.hh_access_token)

            const upload_photo_url = UPLOADBASEURL+this.model.student_id

            axios.post(upload_photo_url, formData, { headers: {'Content-Type': 'multipart/form-data' } })
                .then(response => {
                    console.log(response.data); // Handle successful upload response

                    this.model.hh_photo_id = response.data["id"]
                    this.model.hh_photo_small = response.data["small"]
                    this.model.hh_photo_medium = response.data["medium"]

                    store.setStatus("photo", "ready")

                })
                .catch(error => {
                    const responseData = error.response
                    console.log(`Ошибка при публикации ${error}`)
                    console.log(responseData)
                    store.setStatus("photo", "ready")
                    alert(`Произошла ошибка при публикации: ${JSON.stringify(responseData)}`)
            });

        }

    }

}