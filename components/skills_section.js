function SkillsSection(){

    return {
        $template: `
        
        <h3>Навыки</h3>
          <p>
            <span v-for="skill in model.skill_set" style="margin-right: 16px" >{{ skill }}</span> 
            <span>&nbsp;&nbsp;</span>
          </p>
           
        `
    }

}