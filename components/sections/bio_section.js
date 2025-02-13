function  BioSection(){

    return {
        $template: `
            <h1>{{model.student_full_name}} <small class="text-light">#{{model.student_id}}</small></h1>
            
            
            <div class="mt-3">
                <small class="text-muted">Название будущего резюме</small>
                <input type="text" class="form-control" v-model="model.profession_pretty">
            </div>
            
            <div class="mt-3">
                <small class="text-muted">Город, который вы указываете в качестве домашнего</small>
                <input type="text" class="form-control" v-model="model.student_location">
            </div>
            
            <div class="row">
              <div class="col-md-6 col-xs-12 pt-3">
                 <small class="text-muted">E-mail</small>
                 <input type="text" class="form-control" v-model="model.student_mail" placeholder="Электронная почта">
               </div>
              <div class="col-md-6 col-xs-12 pt-3">
                <small class="text-muted">Телефон</small>
                <input type="text" class="form-control" v-model="model.student_phone" placeholder="Телефон">
              </div>

            </div>
        `
    }
}