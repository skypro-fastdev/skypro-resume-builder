showdown = new showdown.Converter()
function  App(){

    return {

        model: {
            student_id: new URLSearchParams(window.location.search).get('student_id'),
            basic_info: {name: "Данные не загружены", profession_pretty: "–––", location: "–––", age: "99", skills: ["Навыки не загружены"]},

            legend: "",
            legend_type: "NO",

            experience_real: "Данные за загружены",

            personal: "Данные не загружены",
            cover: "",

            is_preview_mode_on: true,

            profession: "DA",
            isLoading: false,
            isLoaded: false,
            checklist: [],
            error: "",

            vacancy_link: "https://spb.hh.ru/vacancy/108609734",
            get vacancy_hh_id(){
                const regex = /\d{4,}/g;
                const matches = this.vacancy_link.match(regex);
                if (!matches) { return null;}
                return matches.reduce((longest, current) => {
                    return current.length > longest.length ? current : longest;
                }, "");

            },

            get resume(){

                let composedResume = `
                ##${this.basic_info.name}
                
                **${this.basic_info.profession_pretty}, ${this.basic_info.location}**
                
                **randommail@skyeng.ru** / **t.me/perfect.candidate**
                
                ---
                
                ## Опыт работы
                
                ${this.legend} 
                
                ---
                
                ${this.experience_real} 
                
                ## Навыки
               
                ${this.basic_info.skills ? this.basic_info.skills.join(", ") : "Навыки не указаны"}             
                
                ## О себе
                
                ${this.personal}
                `;
                composedResume = composedResume.split('\n').map(line => line.trim()).join('\n');
                composedResume = composedResume.replace("```markdown", "")
                composedResume = composedResume.replace("```", "")
                return composedResume
            },

            get resume_preview(){
                return showdown.makeHtml(this.resume)
            }

        },

    }
}