BASICURL = "https://fastapi-cors-proxy.onrender.com/api/exec?v=BASICINFO"

showdown = new showdown.Converter()
function  App(){

    return {



        model: {
            student_id: null,
            student_gender: "",
            student_first_name: "",
            student_last_name: "",
            student_full_name: "",
            student_birth_date: new Date(""),
            profession: "",
            profession_pretty: "",

            about: "",
            about_prompt: "",

            skill_set: [
                { id: 1, text: "JavaScript" },
                { id: 2, text: "HTML/CSS" },
                { id: 3, text: "React.js" }
            ],

            student_mail: "",
            student_phone: "",
            student_tg: "",
            student_vk: "",
            student_age: "23",
            student_location: "",
            student_motivation: "",

            legend_on: false,
            legend_type: "ITDEPARTMENT",

            recent_job_type: "real",
            recent_job_organisation: "",
            recent_job_position: "",
            recent_job_industry: "",
            recent_job_from: "",
            recent_job_to: "",
            recent_job_experience: "",
            recent_job_prompt: "",

            previous_job_type: "legend",
            previous_job_organisation: "",
            previous_job_position: "",
            previous_job_industry: "",
            previous_job_from: 2020,
            previous_job_to: 2022,
            previous_job_experience: "",
            previous_job_prompt: "",

            education_organisation: "",
            education_from: "",
            education_to: "",
            education_industry: "",

            resume_markdown: "",
            resume: "",
            resume_checklist: [],
            resume_cover: "",

            hh_vacancy_url: "https://hh.ru/vacancy/111420778",

        },

        getIdFromURL(){
            return new URLSearchParams(window.location.search).get('student_id')
        },


        load(){

            axios.post(BASICURL, { "student_id": this.model.student_id+""})
                .then(response => {
                    console.log("Выполнена загрузка"+ JSON.stringify(response))
                    const data = response.data
                    this.model.student_full_name = data.name;
                    this.model.student_gender = data.student_gender;
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

                    this.model.education_organisation  =data.education_organisation
                    this.model.education_industry = data.education_industry
                    this.model.skill_set = data.skills.map(skill => ({text: skill, id: 0}) )

                    this.buildResume()

                })

        },


        mounted() {
            this.model.student_id = this.getIdFromURL() ? this.getIdFromURL() : 13620001;
            setInterval(this.load, 2000)

        },

        saveToLocalStorage() {
            const model = { name: this.name };
            localStorage.setItem('model', JSON.stringify(model));
        },

        loadFromLocalStorage() {
            const savedModel = localStorage.getItem('model');
            if (savedModel) {
                const model = JSON.parse(savedModel);
                this.name = model.name;
            } else {
                console.log('No data found in local storage.');
            }
        },

        buildResume(){

            const rawMarkdown = `
            
            ##${this.model.student_full_name}
            
            **${this.model.profession_pretty}, ${this.model.student_location}**
            
            ${this.model.student_phone ? ' Телефон: '+this.model.student_phone : '' }
            
            ${this.model.student_mail ? ' Почта: '+this.model.student_mail : '' }
            
            ${this.model.student_tg ? ' Telegram: '+this.model.student_tg : '' }
            
            ${this.model.student_vk ? ' VK: '+this.model.student_vk : '' }

            ---
            
            ## Опыт работы
            
            ###${this.model.recent_job_organisation} 
            
            ${this.model.recent_job_position} 
            
            ${this.model.recent_job_from} – ${this.model.recent_job_to}
            
            ${this.model.recent_job_experience}
            
            ---
            
            ###${this.model.previous_job_organisation} 
            
            ${this.model.previous_job_position} 
            
            ${this.model.previous_job_from} – ${this.model.previous_job_to}
            
            ${this.model.previous_job_experience}
            
            ## Навыки
           
            ${this.model.skill_set ? this.model.skill_set.map(skill =>`${skill.text}`).join(", ") : "Навыки не указаны"}             
            
            ## О себе
            
            ${this.model.about}
            
            `;

            const composedResume = rawMarkdown.split('\n').map(line => line.trim()).join('\n').replace("```markdown", "").replace("```", "");
            this.model.resume_markdown = composedResume;
            this.model.resume = showdown.makeHtml(composedResume);

        }

    }
}