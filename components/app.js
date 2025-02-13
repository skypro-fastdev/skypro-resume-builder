const url = window.location.href;
GATEBASEURL =  url.includes("dev") || url.includes("localhost")  ? "https://hhgate-dev.onrender.com" : "https://hhgate.onrender.com";

BASICURL = "https://fastapi-cors-proxy.onrender.com/api/exec?v=BASICINFO"
CHECKURL = "https://fastapi-cors-proxy.onrender.com/api/exec?v=CHECK_RESUME_BY_PROFESSION"
LEGENDURL = "https://fastapi-cors-proxy.onrender.com/api/exec?v=EXPERIENCE_LEGEND"
COVERURL = "https://fastapi-cors-proxy.onrender.com/api/exec?v=COVER"
PREVIOUSJOBURL = "https://fastapi-cors-proxy.onrender.com/api/exec?v=EXPERIENCE_REAL"
UPDATEURL = "https://fastapi-cors-proxy.onrender.com/api/exec?v=UPDATE"

AUTHURL = GATEBASEURL + "/auth/"
UPLOADBASEURL = GATEBASEURL + "/photo/"
PUBLISHURL = GATEBASEURL + "/resume/"
CLIENTIDURL = GATEBASEURL + "/client_id/"

console.log(`Base url is ${GATEBASEURL}`)

function App(store) {

    return {

        model: {

            page: "builder",
            errors: [],

            // Персональные данные

            student_id: null,
            student_gender: "male",
            student_full_name: "",
            student_birth_date: "1991-10-21",
            student_english_level: "A1",
            profession: "",
            profession_pretty: "",

            student_mail: "",
            student_phone: "",
            student_tg: "",
            student_vk: "",
            student_age: "23",
            student_location: "",

            // Блок "О Себе"

            about: "",
            about_prompt: "",

            // Блок "Навыки"

            skill_set: [],

            // Блок, описывающий легенду (или свежую работу)

            legend_on: false,
            legend_type: "ITDEPARTMENT",
            legend_prompt: "",

            recent_job_type: "real",
            recent_job_organisation: "",
            recent_job_position: "",
            recent_job_industry: "",
            recent_job_from: "",
            recent_job_to: "",
            recent_job_experience: "",
            recent_job_prompt: "",

            // Блок, описывающий реальную работу

            previous_job_type: "legend",
            previous_job_organisation: "",
            previous_job_position: "",
            previous_job_industry: "",
            previous_job_from: "2022-04-16",
            previous_job_to: "2024-08-03",
            previous_job_experience: "",
            previous_job_prompt: "",

            // Блок, описывающий реальную работу

            education_organisation: "",
            education_level: "higher",
            education_from: "",
            education_to: "",
            education_faculty: "",
            education_industry: "",

            // Сгенерированное резюме

            resume_markdown: "",
            resume: "",
            resume_checklist: [],

            // Поля для генерации ковра

            resume_cover_vacancy_url: "https://hh.ru/vacancy/111420778",   // Вакансия, для которой пишем сопроводительное
            student_motivation: "",     // Мотивация из таблички пользователя, используется для cover-letter
            resume_cover_prompt: "",    // Уточнение промпта от пользователя
            resume_cover: "",           // Готовое сгенерированное сопроводительное письмо  cover-letter

            // Сгенерированное резюме

            hh_client_id: "",
            hh_access_token: "",    // код, который отдает OAUTH чтобы по нему получить токен
            hh_resume_published_id: "",   //

            hh_portfolio_id: "",
            hh_code: "",            // код, который отдает HH чтобы по нему получить токен через OAUTH
            vacancy_link: "",

            // Фотография для отправки в резюме

            hh_photo_id: "",
            hh_photo_small: "",
            hh_photo_medium: "",

            get student_first_name() {
                return this.student_full_name.split(" ")[1]
            },
            get student_last_name() {
                return this.student_full_name.split(" ")[0]
            },

            get professional_roles() {
                // watch here for new professions https://api.hh.ru/professional_roles
                if (this.profession === "DA") {
                    return ["156", "10", "164"]
                } else if (this.profession === "PD") {
                    return ["96"]
                } else if (this.profession === "WD") {
                    return ["96"]
                } else if (this.profession === "JD") {
                    return ["96"]
                } else if (this.profession === "QA") {
                    return ["124"]
                } else if (this.profession === "IM") {
                    return ["68", "163"]
                } else if (this.profession === "GD") {
                    return ["34"]
                } else if (this.profession === "PM") {
                    return ["107"]
                } else if (this.profession === "HR") {
                    return ["69"]
                }
            },
        },

        getIdFromURL() {
            return new URLSearchParams(window.location.search).get('student_id')
        },

        getHHCodeFromURL() {
            const code = new URLSearchParams(window.location.search).get('code')
            if (code) {
                console.log(`Получен OAUTH код для HH ${code}`)
                return code
            }
        },

        load() {

            store.setStatus("bio", "loading")

            axios.post(BASICURL, {"student_id": this.model.student_id + ""})
                .then(response => {

                    console.log("Выполнена загрузка" + JSON.stringify(response))

                    const data = response.data

                    // Показываем страницу ошибки, если данные не загрузились
                    if (!data.student_id) {
                        store.setStatus("bio", "error")
                        return
                    }

                    this.model.student_full_name = data.name;

                    if (!["male", "female"].includes(data.student_gender)) {
                        this.model.student_gender = "male";
                    } else {
                        this.model.student_gender = data.student_gender;
                    }

                    this.model.student_location = data.location;

                    this.model.student_tg = data.student_tg;
                    this.model.student_vk = data.student_vk;
                    this.model.student_mail = data.student_mail;
                    this.model.student_phone = data.student_phone;

                    this.model.profession = data.profession;
                    this.model.profession_pretty = data.profession_pretty;
                    this.model.profession_pretty = data.profession_pretty;

                    this.model.previous_job_organisation = data.recent_organisation;
                    this.model.previous_job_position = data.recent_position;
                    this.model.previous_job_industry = data.recent_industry;
                    this.model.previous_job_from = data.recent_job_from.split("T")[0];
                    this.model.previous_job_to = data.recent_job_to.split("T")[0];

                    this.model.education_organisation = data.education_organisation
                    this.model.education_industry = data.education_industry
                    this.model.education_from = data.education_from.length > 4 ? data.education_from.slice(0,4) : data.education_from
                    this.model.education_to = data.education_to.length > 4 ? data.education_to.slice(0,4) : data.education_to

                    this.model.skill_set = data.skills.map(skill => skill.text)

                    store.setStatus("bio", "ready")

                })
        },

        mounted() {

            // Загружаем айдишник для
            this.getClientID()

            if (this.getIdFromURL()) {
                console.log("Указан в URL ID ученика, загружаем данные с сервера")
                this.model.student_id = this.getIdFromURL()
                this.load()

            } else {
                console.log("Не указан ID ученика, ищем данные локально")
                this.loadFromLocalStorage()

            }

            this.model.hh_code = this.getHHCodeFromURL() ? this.getHHCodeFromURL() : "";

            if (this.model.hh_code !== "" && this.model.hh_access_token === "") {
                console.log("Есть HH код, но нет токена, пора запускать авторизацию")
                this.auth()
            }

            this.saveToLocalStorage()

            setInterval(this.saveToLocalStorage, 5000)
        },

        getClientID(){

            axios.get(CLIENTIDURL)
                .then(response => {
                    this.model.hh_client_id = response.data.client_id;
                    console.log(`Client ID загружен с сервера ${JSON.stringify(response.data)}`)
                })
                .catch(error => {
                    alert("Не удалось получить Client Id для OAuth, обратитесь в поддержку")
                })
        },

        auth() {

            const requestData = {
                student_id: this.model.student_id,
                hh_code: this.model.hh_code
            }

            console.log(requestData)

            axios.post(AUTHURL, requestData)

                .then(response => {
                    console.log("Выполнена загрузка" + JSON.stringify(response))
                    this.model.hh_access_token = response.data.access_token;
                    console.log(`Получен hh_access_token ${this.model.hh_access_token}`)
                    this.reportAuthenticated()
                })
                .catch(error => {
                    console.log(`Произошла ошибка ${error} ${JSON.stringify(error.response)} `)
                    alert("Произошла ошибка при подключении. Токены сброшены")
                    this.model.hh_access_token = ""
                    this.model.hh_code = ""
                })

        },

        reportAuthenticated(){

            const requestData = {
                student_id: this.model.student_id,
                hh_access_token: this.model.hh_access_token,
                status: "AUTHENTICATED",
            }

            axios.post(UPDATEURL, {requestData})
                .then(response => { console.log("Обновлен статус" + JSON.stringify(response))})
                .catch(error => { console.log(`Ошибка обновлении статуса ${error}`) })

        },

        saveToLocalStorage() {
            // if (store.section.bio != 'ready'){
            //     console.log("Мы в процессе загрузки, автосохранение пропускаем")
            //     return
            // }
            localStorage.setItem("model", JSON.stringify(this.model));
            console.log("Данные сохранены в локальном хранилище")
        },

        loadFromLocalStorage() {

            store.setStatus("bio", "loading")

            const storedModel = localStorage.getItem("model")

            if (storedModel) {
                const modelData = JSON.parse(storedModel)
                for (let key of Object.keys(this.model)) {
                    if (modelData[key]) {
                        this.model[key] = modelData[key]
                    }
                }
            }

            if (this.model.student_id) {
                console.log(`В локальном хранилище указан student_id ${this.model.student_id}` )
            } else {
                console.log("В локальном хранилище не найден student_id")
            }

            console.log("Данные загружены из локального хранилища")

            store.setStatus("bio", "ready")

        },

        openPage(pageName){
            this.model.page = pageName;
        },

    }

}