
function  LegendSection(store) {

    return {
        $template: `
            <header class="clearfix">
             
            <h3 class="w-50 float-start">Легенда</h3>

            <div class="form-check form-switch w-50 float-end pt-1">
              <input class="form-check-input" type="checkbox" role="switch" id="legendSwitch" v-model="model.legend_on" @click="fillFields()">
              <label class="form-check-label" for="legendSwitch">🔥 Добавить легенду</label>
            </div>
            
            
            </header>
            
            <div class="alert alert-info text-muted mt-3">
            Для работы нужен опыт, а для опыта работа? Не беда, мы создадим вам убедительную легенду!
            </div>
            

              <div  v-if="model.legend_on">
              
              <div class="alert alert-info text-muted mt-3">
              
                 <p>Наш первый приоритет — помочь вам раскрыть ваш существующий опыт так, чтобы в новой профессии он стал вашей опорой. Но если вы чувствуете, что ваш опыт совсем далек от сферы IT — воспользуйтесь этой опцией.</p>
            
              
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
                </select></div>
                
                <p>
                    <button v-if="store.sections.legend=='ready'" @click="load()" class="btn btn-dark" >✨ Сгенерировать</button>
                    <button v-if="store.sections.legend=='loading'"  class="btn btn-dark mt-2"disabled>Идет генерация</button>
                </p>
              
                <div class="row">
                  <div class="col-md-6 col-xs-12 pt-3">
                    <small class="text-muted">Работодатель</small>
                    <input type="text"  v-model="model.recent_job_organisation" class="form-control" placeholder="Работодатель, напр ООО Вишенка">
                  </div>
                  <div class="col-md-6 col-xs-12 pt-3">
                    <small class="text-muted">Должность</small>
                    <input type="text" v-model="model.recent_job_position" class="form-control" placeholder="Должность">
                  </div>
                  <div class="col-md-6 col-xs-12 pt-3">
                    <small class="text-muted">Индустрия</small>
                    <input type="text" v-model="model.recent_job_industry"  class="form-control" placeholder="Индустрия, напр 'Производство мебели'">
                  </div>
                  <div class="col-md-3 col-xs-6 pt-3">
                    <input type="text" v-model="model.recent_job_from" class="form-control" placeholder="2015-01-01">
                    <small class="text-muted">{{ ruDate(model.recent_job_from) }}</small>
                  </div>
                  <div class="col-md-3 col-xs-6 pt-3">
                    <input type="text" v-model="model.recent_job_to" class="form-control" placeholder="2019-01-01">
                    <small class="text-muted">{{ ruDate(model.recent_job_to) }}</small>
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

                this.model.recent_job_industry = "<заполните после генерации>"
                this.model.recent_job_organisation = "<заполните после генерации>"

            }else if (this.model.legend_type==="FREELANCE"){

                this.model.recent_job_position = this.model.profession_pretty + " на фрилансе"
                this.model.recent_job_industry = "Разные компании"
                this.model.recent_job_organisation = "Фриланс"

            }

            this.updateTime()

        },

        updateTime() {

            const dateTo = getDateRandomDaysAgo(2, 30)
            const dateFrom = getDateRandomDaysAgo(150, 400)

            this.model.recent_job_from = formatDate(dateFrom)
            this.model.recent_job_to = formatDate(dateTo)

            const previousDateTo = parseDate(this.model.previous_job_to)
            const previousDateFrom = parseDate(this.model.previous_job_to)

            console.log(dateFrom)
            console.log(previousDateTo)

            if (dateFrom < previousDateTo && this.model.legend_on ) {

                alert("Мы сгенерировали дата начала новой работы – они раньше, чем закончилась прошлая. Возможно, это стоит поправить :)")
            }


        },

        load() {

            store.setStatus("legend", "loading")

            const requestData = {
                student_id: this.model.student_id,
                legend_type: this.model.legend_type,
                recent_job_organisation: this.model.recent_job_organisation,
                recent_job_position: this.model.recent_job_position,
                recent_job_industry: this.model.recent_job_industry,
                student_location: this.model.student_location,
                student_gender: this.model.student_gender,
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
                    console.log("Произошла ошибка" + JSON.stringify(error))
                    this.model.recent_job_experience = "Не получилось сгенерировать, попробуйте еще раз, если все еще не работает – напишите в поддержку!";
                    store.setStatus("legend", "ready")
                })

        }
    }
}