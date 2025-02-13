function SkillsSection(){

    return {
        $template: `
        
        <h3>Навыки</h3>
          <p>
            <span v-for="skill in model.skill_set" style="margin-right: 16px" >{{ skill }} 
                <span class="skills__remove-icon" @click="removeSkill(skill)" >✖</span>
            </span> 
            
            <div class="input-group mb-3">
                <input type="text" class="form-control " ref="new" placeholder="Новый навык"> 
                <button @click="addSkill()" class="btn  btn-outline-dark" > Добавить </button>             
            </div>
          </p>
        `,

        addSkill(){

            const skill = this.$refs.new.value
            if (skill.length < 2) {return }

            console.log(`Skill ${skill} to be added`)
            this.model.skill_set.push(skill)
            this.$refs.new.value = ""

        },

        removeSkill(skill){

            console.log(`Skill ${skill} to be removed`)
            this.model.skill_set = this.model.skill_set.filter(e => e !== skill)

        }
    }
}