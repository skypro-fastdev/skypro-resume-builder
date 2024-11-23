
function  LegendSection(store) {

    return {
        $template: `
            <header class="clearfix">
            
            <h3 class="w-50 float-start">Легенда</h3>

            <div class="form-check form-switch w-50 float-end pt-1">
              <input class="form-check-input" type="checkbox" role="switch" id="legendSwitch" v-model="model.legend_on" @click="fillFields()">
              <label class="form-check-label" for="legendSwitch">Добавить легенду</label>
            </div>
            
            </header>
            

              <div  v-if="model.legend_on">
              
              <div class="alert alert-info text-muted mt-3">
                Для работы нужен опыт, а для опыта работа? Не беда, мы создадим вам убедительную легенду!
                
                <details class="mt-2">
                <summary>Тонкая настройка</summary>
                <textarea v-model="model.legend_prompt"  cols="30" rows="4" class="form-control"></textarea>
                </details>               
                
                
              </div>  
              
              <div class="mt-3 mb-3">
              
                <select @change="fillFields()" v-model="model.legend_type" class="form-select">
                    <option value="ITDEPARTMENT">Работа в IT отделе работодателя</option>
                    <option value="INTERNSHIP">Стажировка по новой специальности</option>
                    <option value="FREELANCE">Фриланс проекты</option>
                    <option value="NO">Без легенды</option>
                </select></div>
                
                <p>
                    <button v-if="store.sections.legend=='ready'" @click="load()" class="btn btn-dark" >✨ Сгенерировать</button>
                    <button v-if="store.sections.legend=='loading'"  class="btn btn-dark mt-2"disabled>Идет генерация</button>
                </p>
              
                <div class="row">
                  <div class="col-md-6 col-xs-12 pt-3">
                    <input type="text"  v-model="model.recent_job_organisation" class="form-control" placeholder="Работодатель, напр ООО Вишенка">
                  </div>
                  <div class="col-md-6 col-xs-12 pt-3">
                    <input type="text" v-model="model.recent_job_position" class="form-control" placeholder="Должность">
                  </div>
                  <div class="col-md-6 col-xs-12 pt-3">
                    <input type="text" v-model="model.recent_job_industry"  class="form-control" placeholder="Индустрия, напр 'Производство мебели'">
                  </div>
                  <div class="col-md-3 col-xs-6 pt-3">
                    <input type="text" v-model="model.recent_job_from" class="form-control" placeholder="2015-01-01">
                  </div>
                  <div class="col-md-3 col-xs-6 pt-3">
                    <input type="text" v-model="model.recent_job_to" class="form-control" placeholder="2019-01-01">
                  </div>
                </div>
    

                <textarea v-model="model.recent_job_experience" class="form-control mt-3" cols="30" rows="4" placeholder="Опишите ваш опыт работы и достижения или доверьте это ИИ"></textarea>
               </div>
            </div> 
            </header>
        
        `,

        fillFields() {

            this.model.recent_job_position = this.model.profession_pretty

            if (this.model.legend_type==="ITDEPARTMENT") {

                this.model.recent_job_industry = this.model.previous_job_industry
                this.model.recent_job_organisation = this.model.previous_job_organisation

            }else if (this.model.legend_type==="INTERNSHIP"){

                this.model.recent_job_industry = "<заполните поле>"
                this.model.recent_job_organisation = "<заполните поле>"

            }else if (this.model.legend_type==="FREELANCE"){

                this.model.recent_job_position = this.model.profession_pretty + " на фрилансе"
                this.model.recent_job_industry = "Разные компании"
                this.model.recent_job_organisation = "Фриланс"

            }


        },

        load() {

            store.setStatus("legend", "loading")

            const requestData = {
                student_id: this.model.student_id,
                legend_type: this.model.legend_type,
                prompt: this.model.legend_prompt,
            }

            console.log(requestData)

            axios.post(LEGENDURL, requestData)

                .then(response => {
                    console.log("Выполнена загрузка"+ JSON.stringify(response))
                    this.model.recent_job_experience = response.data.response;
                    store.setStatus("legend", "ready")

                })
                .catch(error => {
                    console.log("Произошла ошибка")
                    this.error = 'Error fetching data';

                })

        }
    }
}