PUBLISHURL = "https://hhgate.onrender.com/resume"


function PublishSection(store) {

    return {

        $template: `
        
         <h4>Публикация на HH</h4>
         
         <div v-if="model.hh_code == ''">
            
            <div class="alert alert-info text-muted mt-3">
            <small>Предоставьте нам доступ к HH и мы сами опубликуем ваше резюме. Обещаем не шалить!</small>
            </div>
            <p><a :href="'https://hh.ru/oauth/authorize?response_type=code&client_id='+model.hh_client_id" class="btn btn-dark">🔐 Предоставить доступ</a></p>
      
        </div>
        
        
        <!-- <div class="alert alert-info text-muted mt-3">{{model.hh_code}}</div> -->
         
         <div v-if="model.hh_access_token && !model.hh_id">
            <div class="alert alert-info text-muted mt-3">
                <small>Связь c HeadHunter установлена. Проверьте резюме перед публикацией!</small>
                
                <button class="btn btn-dark w-100 btn-lg" @click="publish()"> Опубликовать на HH</button>
               </div>
         </div>
         
         <div v-if="model.hh_id">
            <div class="alert alert-info text-muted mt-3">
                <small>Резюме опубликовано</small>
                {{model.hh_id}}
                
                <p><a :href="'https://hh.ru/resume/'+model.hh_id.split('/').pop()" class="btn btn-dark">Посмотреть резюме на hh.ru</a></p>
            </div>
         </div>         
         
         
         <button class="btn btn-outline-dark w-100 mt-3" @click="reset_hh_codes()">Сбросить авторизацию</button>

        `,

        publish() {

            const requestData = JSON.parse(JSON.stringify(this.model));
            requestData["skill_set"] = ""
            requestData["student_first_name"] = this.model.student_full_name.split(" ")[1]
            requestData["student_last_name"] = this.model.student_full_name.split(" ")[0]

            axios.post(PUBLISHURL, requestData )

            .then(response => {
                console.log("Отправляем"+ JSON.stringify(response))
                this.model.hh_id = response.data.hh_id;

            })
            .catch(error => {
                console.log(`Произошла ошибка при публикации ${error} ${JSON.stringify(error.response)} `)
                alert("Произошла ошибка при публикации. ")

            })

        },

        reset_hh_codes() {

            this.model.hh_code = ""
            this.model.hh_access_token = ""
            this.model.hh_id = ""
            console.log("Интеграция с HeadHunter сброшена")

        },

        mounted(){



        }


    }

}