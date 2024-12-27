function  EducationSection() {

    return {
        $template: `
        
        <h3>Образование</h3>

        <div class="row">
            <div class="col-12 pt-3">
                <small class="text-muted">Место учебы</small>
                <input type="text" class="form-control" v-model="model.education_organisation" placeholder="Место учебы">
            </div>
            
            <div class="col-6 pt-3">
                <small class="text-muted">Специальность</small>
                <input type="text" class="form-control" v-model="model.education_industry" placeholder="Специальность, напр 'Врач'">
            </div>
            
            <div class="col-6 pt-3">
                <small class="text-muted">Факультет</small>
                <input type="text" class="form-control" v-model="model.education_faculty" placeholder="Факультет, напр Психологический">
            </div>            
        
            <div class="col-3 pt-3">
                <input type="text" class="form-control" v-model="model.education_from" placeholder="2010">
            </div>

            <div class="col-3 pt-3">
                <input type="text" class="form-control" v-model="model.education_to"  placeholder="2015">
            </div>
            
            <div class="col-6 pt-3">
             
                <select v-model="model.education_level" class="form-select">
                
                    <option value="secondary">Среднее</option>
                    <option value="special_secondary">Среднее специальное</option>
                    <option value="unfinished_higher">Незаконченное высшее</option>
                    <option value="higher">Высшее: специалист</option>                    
                    <option value="bachelor">Высшее: бакалавр</option>                    
                    <option value="master">Высшее: магистр</option>                   
 
                </select>
                
            </div>   
            
            
        </div>
        
        `
    }
}





