function PublishSection(store) {

    return {

        $template: `
         
         <div v-if="model.hh_access_token && !model.hh_resume_published_id">
         
            <h4>Публикация на HH</h4>
         
            <div class="alert alert-info text-muted mt-3">
                <small>Связь c HeadHunter установлена. Проверьте резюме перед публикацией!</small>
            </div>  
            
                <button class="btn btn-outline-dark  mt-2" @click="validate()">Проверить заполнение полей</button>
                <button class="btn btn-outline-dark 0 mt-2" @click="reset_hh_codes()">Сбросить авторизацию</button>
              
                <button v-if="store.sections.publish=='ready'" class="btn btn-dark w-100 btn-lg" @click="publish()"> Опубликовать на HH</button>
                <button v-if="store.sections.publish=='loading'" class="btn btn-dark w-100 btn-lg" disabled>Идет публикация</button>      
         
         </div>
         
         <div v-if="model.hh_resume_published_id">
            <div class="alert alert-info text-muted mt-2">
                <small>Резюме опубликовано</small>
            </div>
            
            <a :href="'https://hh.ru/resume/'+model.hh_resume_published_id.split('/').pop()" class="btn btn-primary w-100 btn-lg" target="_blank">Посмотреть резюме на hh.ru</a>

         </div>
        `,

        publish() {

            store.setStatus("publish", "loading")

            const requestData = JSON.parse(JSON.stringify(this.model));

            console.log(`Отправляем на публикацию ${JSON.stringify(requestData)}`)

            axios.post(PUBLISHURL, requestData )

            .then(response => {
                console.log("Отправляем"+ JSON.stringify(response))
                this.model.hh_resume_published_id = response.data.hh_id;
                store.setStatus("publish", "ready")
                this.model.errors = []
                this.reportPublished()  // Сообщаем серверу, что опубликовались

            })

            .catch(error => {
                const responseData = error.response
                console.log(`Ошибка при публикации ${error}`)
                console.log(responseData)

                store.setStatus("publish", "ready")

                this.model.errors = responseData.data.error
                window.scroll({top: 0, behavior: "smooth"});

                // alert(`Произошла ошибка при публикации: ${JSON.stringify(responseData)}`)

            })
        },

        reportPublished(){

            const requestData = {
                student_id: this.model.student_id,
                hh_resume_published_id: this.model.hh_resume_published_id,
                hh_access_token: this.model.hh_access_token,
                status: "PUBLISHED",
            }

            axios.post(UPDATEURL, {requestData})
                .then(response => { console.log("Обновлен статус" + JSON.stringify(response))})
                .catch(error => { console.log(`Ошибка обновлении статуса ${error}`) })

        },

        /**
         * Выполняет проверку корректности введенных данных в модели.
         * - education_from: Год начала образования в формате YYYY (например, 2024).
         * - education_to: Год окончания образования в формате YYYY (например, 2024).
         * - previous_job_from: Дата начала предыдущей работы в формате YYYY-MM-DD (например, 2024-10-01).
         * - previous_job_to: Дата окончания предыдущей работы в формате YYYY-MM-DD (например, 2024-10-01).
         *
         * Ошибки валидации функция собирает сообщения об ошибках в массив errors
         * и выводит их через alert. Если ошибок нет, выводится сообщение об успешной проверке.
         */
        validate() { // Проверяем поля

            function validateShortDate(value){
                return /^\d{4}$/.test(value);
            }

            function validateLongDate(value){
                return  /^\d{4}-\d{2}-\d{2}$/.test(value)
            }

            function validateNotEmpty(value){
                return value.length > 2
            }

            let errors = []

            if (this.model.about.length < 100) {errors.push("Слишком короткий текст 'О Себе' "); }

            if (!validateNotEmpty(this.model.education_faculty)) { errors.push("Проверьте поле Факультет в разделе Образование"); }

            if (!validateShortDate(this.model.education_from)) { errors.push("Проверьте даты в разделе Образование, укажите Год в формате 2024 "); }
            if (!validateShortDate(this.model.education_to)) { errors.push("Проверье даты в разделе Образование, укажите Год в формате 2024 "); }

            if (!validateLongDate(this.model.previous_job_from)) { errors.push("Проверьте даты в разделе Легенда, укажите дату начала работы в формате 2024-10-01"); }
            if (!validateLongDate(this.model.previous_job_to)) { errors.push("Проверьте даты в разделе Легенда, укажите дату завершения работы в формате 2024-10-01"); }

            if (!validateLongDate(this.model.previous_job_from)) { errors.push("Проверьте даты в разделе Прошлая работа, укажите дату начала работы в формате 2024-10-01"); }
            if (!validateLongDate(this.model.previous_job_to)) { errors.push("Проверьте даты в разделе  Прошлая работа, укажите дату завершения работы в формате 2024-10-01"); }



            if (errors.length === 0) {
                alert("Нет ошибок, можно отправлять")
            } else {
                alert(errors.join("\n\n"))
            }
        },

        /**
         * Сбрасывает коды и идентификаторы интеграции с HeadHunter.
         *
         * Данная функция выполняет сброс значений, связанных с интеграцией
         * с сервисом HeadHunter. Она очищает следующие параметры модели:
         * - hh_code: код аутентификации или авторизации
         * - hh_access_token: токен доступа для API запросов
         * - hh_resume_published_id: идентификатор опубликованного резюме
         * После успешного выполнения сброса выводится сообщение в консоль,
         * подтверждающее сброс интеграции.
         *
         * Пример использования:
         * this.reset_hh_codes(); // Сбрасывает все значения, связанные с интеграцией с HH
         */
        reset_hh_codes() {
            this.model.hh_code = ""
            this.model.hh_access_token = ""
            this.model.hh_resume_published_id = ""
            console.log("Интеграция с HeadHunter сброшена")
        },

        mounted(){


        },

    }

}