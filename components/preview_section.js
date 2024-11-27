showdown = new showdown.Converter()

function PreviewSection(store){

    return {

        $template: `
        
            <img :src="model.hh_photo_medium" class="float-end w-25">
            <h3>Готовое резюме</h3>
            <article v-html="model.resume"></article>
            <button class="btn  btn-outline-dark mb-3" @click="reset()">Сбросить и начать с начала</button>
        
        `,

        mounted(){

            setInterval(this.buildResume, 2000)

        },

        reset() {

            localStorage.clear();
            document.location.reload()

        },

        buildResume() {

            let rawMarkdown = ``

            rawMarkdown += `##${this.model.student_full_name}\n`
            rawMarkdown += `\n`
            rawMarkdown += `**${this.model.profession_pretty}, ${this.model.student_location}** \n`
            rawMarkdown += `\n`
            rawMarkdown += `${this.model.student_phone ? ' Телефон: ' + this.model.student_phone : ''} \n`
            rawMarkdown += `\n`
            rawMarkdown += `${this.model.student_mail ? ' Почта: ' + this.model.student_mail : ''} \n`
            rawMarkdown += `\n`
            rawMarkdown += `${this.model.student_tg ? ' Telegram: ' + this.model.student_tg : ''} \n`
            rawMarkdown += `\n`
            rawMarkdown += `${this.model.student_vk ? ' VK: ' + this.model.student_vk : ''} \n`
            rawMarkdown += `\n`
            rawMarkdown += `---\n`
            rawMarkdown += `\n`
            rawMarkdown += `## Опыт работы\n`
            rawMarkdown += `\n`
            rawMarkdown += `\n`

            if (this.model.legend_on ) {

                rawMarkdown += `####${this.model.recent_job_organisation} \n`
                rawMarkdown += `\n`
                rawMarkdown += ` ${this.model.recent_job_position}\n`
                rawMarkdown += `\n`
                rawMarkdown += `${this.model.recent_job_from} – ${this.model.recent_job_to}\n`
                rawMarkdown += `\n`
                rawMarkdown += ` ${this.model.recent_job_experience}\n`
                rawMarkdown += `\n`

            }

            rawMarkdown += `####${this.model.previous_job_organisation} \n`
            rawMarkdown += `\n`
            rawMarkdown += `${this.model.previous_job_position} \n`
            rawMarkdown += `\n`
            rawMarkdown += `${this.model.previous_job_from} – ${this.model.previous_job_to}\n`
            rawMarkdown += `\n`
            rawMarkdown += ` ${this.model.previous_job_experience}\n`
            rawMarkdown += `\n`

            // Навыки

            rawMarkdown += `## Навыки\n`
            rawMarkdown += `\n`
            rawMarkdown += `${this.model.skill_set ? this.model.skill_set.join(", ") : "Навыки не указаны"}\n`
            rawMarkdown += `\n`
            rawMarkdown += `\n`

            // О себе

            rawMarkdown += `##О себе\n`
            rawMarkdown += `\n`
            rawMarkdown += `${this.model.about}\n`

            const composedResume = rawMarkdown.split('\n').map(line => line.trim()).join('\n').replace("```markdown", "").replace("```", "");
            this.model.resume_markdown = composedResume;
            this.model.resume = showdown.makeHtml(composedResume);

        }
    }
}