
function CoverSection(store){

    return {

        $template: `

            <h4>Генерация ковра</h4>
            <div class="alert alert-info text-muted mt-3">
              <small>ИИ напишет сопроводительное письмо, которое понравится эйчару и работодателю.  Расскажет, почему вы заинтересовались этой вакансией и почему именно вы на нее подходите.</small>
            </div>
            <input type="text" v-model="model.resume_cover_vacancy_url" class="form-control" placeholder="Ссылка на вакансию или ее ID">
            
            <div class="mt-3" v-if="model.resume_cover!=''">
                <textarea v-model="model.resume_cover" rows="5" class="form-control"></textarea>
            </div>
            
            <p>
                <button v-if="store.sections.cover=='ready'" @click="load()" class="btn btn-dark" >✨ Сгенерировать</button>
                <button v-if="store.sections.cover=='loading'"  class="btn btn-dark mt-2"disabled>Идет генерация</button>
            </p>
        
        `,

        get_vacancy_id(){
            const regex = /\d{4,}/g;
            const matches = this.model.resume_cover_vacancy_url.match(regex);
            if (!matches) { console.log("Не удалось распарсить url"); return null; }
            return matches.reduce((longest, current) => {
                return current.length > longest.length ? current : longest;
            }, "");

        },

        load() {

            store.setStatus("cover", "loading")

            const requestData =  {
                student_id: this.model.student_id,
                resume: this.model.resume_markdown,
                profession: this.model.profession,
                vacancy_hh_id: this.get_vacancy_id(),
            }

            console.log(requestData)

            axios.post(COVERURL, requestData)

                .then(response => {
                    console.log("Выполнена загрузка"+ JSON.stringify(response))
                    this.model.resume_cover = response.data.response;
                    store.setStatus("cover", "ready")

                })
                .catch(error => {
                    console.log("Произошла ошибка")
                    this.error = 'Error fetching data';

                })

        }

    }


}