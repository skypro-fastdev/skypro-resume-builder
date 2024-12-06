ABOUTURL = "https://fastapi-cors-proxy.onrender.com/api/exec?v=ABOUT"

function AboutSection(store) {

    return {

        load(){

            store.setStatus("about", "loading")

            const requestData = {

                student_id: this.model.student_id,

                previous_job_position: this.model.previous_job_position,
                previous_job_position: this.model.previous_job_position,
                previous_job_industry: this.model.previous_job_industry,

                education_organisation: this.model.education_organisation,
                education_industry: this.model.education_industry,

                student_location: this.model.student_location,
                student_gender: this.model.student_gender,
                prompt: this.model.about_prompt,

            }

            axios.post(ABOUTURL, requestData)

            .then(response => {
                console.log("Выполнена загрузка"+ JSON.stringify(response))
                this.model.about = response.data.response;
                store.setStatus("about", "ready")
            })
            .catch(error => {
                console.log("Произошла ошибка" + JSON.stringify(error))
                this.model.about = "Не получилось сгенерировать, попробуйте еще раз, если все еще не работает – напишите в поддержку!";
                store.setStatus("about", "ready")
            })
        },


        $template: `
        
            <h3>О себе</h3>

            <div class="alert alert-info text-muted mt-3">
              <small>ИИ опишет обязанности и приукрасит достижения так, как это нравится эйчару и работодателю.  Вы сможете отредактировать их или уточнть задачу для ИИ</small>

              <details class="mt-2">
                <summary>Тонкая настройка</summary>
                <textarea  v-model="model.about_prompt"  cols="30" rows="4" class="form-control"></textarea>
              </details>
              <div>
                  <button @click="load()" class="btn btn-dark mt-2" v-if="store.sections.about=='ready'">✨ Сгенерировать {{model.isLoading}}</button>
                  <button class="btn btn-dark mt-2" v-if="store.sections.about=='loading'" disabled>Идет генерация</button>
              </div>
              
            </div>

            <textarea v-model="model.about" class="form-control mt-3" cols="30" rows="4" placeholder="Расскажите про себя или доверьте это ИИ"></textarea>
            <div class="mt-2" v-if="model.about.length > 2">
              <small>⬆️ Добавьте сюда ссылку на портфолио (если дизайнер) или Github (если разрабтчик) после генерации</small>
            </div>
        `

    }


}