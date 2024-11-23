
function ChecklistSection(store){

    return {

        $template: `
        
        <h4>Проверить по чеклисту</h4>
        <p class="text-muted">Для профессии {{model.profession_pretty}}</p>
       
            <p v-for="checkpoint in model.resume_checklist">
                <span v-if="checkpoint.value==1"> ✅ </span>
                <span v-if="checkpoint.value==0"> ❌ </span>
                <span v-if="checkpoint.value==0.5"> 🤔 </span>
                {{ checkpoint.title }}
            </p>
    
        <p>
            <button v-if="store.sections.checklist=='ready'" @click="load()" class="btn btn-dark" >✨ Запустить проверку</button>
            <button v-if="store.sections.checklist=='loading'"  class="btn btn-dark mt-2"disabled>Идет проверка</button>
        </p>
          
        `,

        load() {

            store.setStatus("checklist", "loading")

            axios.post(CHECKURL, {student_id: this.model.student_id, resume: this.model.resume_markdown, profession: this.model.profession})

                .then(response => {
                    console.log("Выполнена загрузка"+ JSON.stringify(response))
                    this.model.resume_checklist = response.data;
                    store.setStatus("checklist", "ready")

                })
                .catch(error => {
                    console.log("Произошла ошибка")
                    this.error = 'Error fetching data';

                })

        }

    }

}