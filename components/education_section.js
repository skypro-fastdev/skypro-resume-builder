function  EducationSection() {

    return {
        $template: `
        
        <h3>Образование</h3>

        <div class="row">
            <div class="col-12 pt-3">
                <input type="text" class="form-control" v-model="model.education_organisation" placeholder="Место учебы">
            </div>
            <div class="col-6 pt-3">
                <input type="text" class="form-control" v-model="model.education_industry" placeholder="Специальность, напр 'Врач'">
            </div>
            <div class="col-3 pt-3">
                <input type="text" class="form-control" v-model="model.education_from" placeholder="2010">
            </div>
            <div class="col-3 pt-3">
                <input type="text" class="form-control" v-model="model.education_to"  placeholder="2015">
            </div>
        </div>
        
        `
    }
}





