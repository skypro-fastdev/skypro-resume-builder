UPLOADBASEURL = "https://hhgate.onrender.com/photo/"
function PhotoSection(){

    return {

        $template: `
        
            <h3>Фото</h3>
            <div class="alert alert-info text-muted mt-3">
              <small>На фото резюме должно быть хорошо видно лицо. Снимок должен быть сдержанным, при этом легким и непринужденным. </small>
            </div>
            <input type="file" ref="fileInput" class="form-control" > <button class="btn btn-dark mt-3" @click="upload()">📷 &nbsp; Загрузить</button>

        `,

        upload(){

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

                })
                .catch(error => {
                    console.error(error); // Handle upload errors
            });

        }

    }

}