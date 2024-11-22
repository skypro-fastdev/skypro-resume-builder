PREVIOUSJOBURL = "https://fastapi-cors-proxy.onrender.com/api/exec?v=EXPERIENCE_REAL"

function PreviousJobSection(store){

    return {

        $template: `
        
            <h3>Прошлое место работы</h3>
            <div class="row">
              <div class="col-md-6 col-xs-12 pt-3">
                <input type="text"  v-model="model.previous_job_organisation" class="form-control" placeholder="Работодатель, напр ООО Вишенка">
              </div>
              <div class="col-md-6 col-xs-12 pt-3">
                <input type="text" v-model="model.previous_job_position" class="form-control" placeholder="Должность">
              </div>
              <div class="col-md-6 col-xs-12 pt-3">
                <input type="text" v-model="model.previous_job_industry"  class="form-control" placeholder="Индустрия, напр 'Производство мебели'">
              </div>
              <div class="col-md-3 col-xs-6 pt-3">
                <input type="text" v-model="model.previous_job_from" class="form-control" placeholder="2000-10-01">
              </div>
              <div class="col-md-3 col-xs-6 pt-3">
                <input type="text" v-model="model.previous_job_to" class="form-control" placeholder="2020-10-01">
              </div>
            </div>

            <div class="alert alert-info text-muted mt-3">
            
                <small>ИИ опишет обязанности и приукрасит достижения так, как это нравится эйчару и работодателю.  Вы сможете отредактировать их или уточнть задачу для ИИ</small>
                
<!--                <details class="mt-2">-->
<!--                <summary>Тонкая настройка</summary>-->
<!--                <textarea v-model="model.previous_job_prompt"  cols="30" rows="4" class="form-control"></textarea>-->
<!--                </details>-->

                <div class="mt-3">
                    <button v-if="store.sections.previous_job=='ready'" @click="load()" class="btn btn-dark" >✨ Сгенерировать</button>
                    <button v-if="store.sections.previous_job=='loading'"  class="btn btn-dark mt-2"disabled>Идет генерация</button>
                </div>
              
            </div>
            <textarea v-model="model.previous_job_experience" class="form-control mt-3" cols="30" rows="4" placeholder="Опишите ваш опыт работы и достижения или доверьте это ИИ"></textarea>
        `,

        load() {

            store.setStatus("previous_job", "loading")

            axios.post(PREVIOUSJOBURL, {student_id: this.model.student_id, profession: this.model.profession, prompt: this.model.previous_job_prompt})

                .then(response => {
                    console.log("Выполнена загрузка"+ JSON.stringify(response))
                    this.model.previous_job_experience = response.data.response;
                    store.setStatus("previous_job", "ready")

                })
                .catch(error => {
                    console.log("Произошла ошибка")
                    this.error = 'Error fetching data';

                })

        }

    }






}