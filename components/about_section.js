ABOUTURL = "https://fastapi-cors-proxy.onrender.com/api/exec?v=ABOUT"

function AboutSection(store) {

    return {

        load(){

            store.setStatus("about", "loading")

            axios.post(ABOUTURL, {"student_id": this.model.student_id, "prompt": this.model.about_prompt})

            .then(response => {
                console.log("Выполнена загрузка"+ JSON.stringify(response))
                this.model.about = response.data.response;
                store.setStatus("about", "ready")
            })
            .catch(error => {
                console.log("Произошла ошибка")
                this.model.error = 'Error fetching data';
                store.setStatus("about", "error")
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