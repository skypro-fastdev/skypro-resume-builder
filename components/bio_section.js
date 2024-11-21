function  BioSection(){

    return {
        $template: `
            <h1>{{model.student_full_name}} <small class="text-light">#{{model.student_id}}</small></h1>
            <p class="lead">{{model.profession}}, {{model.student_location}}</p>
            <div class="row">
              <div class="col-md-6 col-xs-12 pt-3">
                 <input type="text" class="form-control" v-model="model.student_mail" placeholder="Электронная почта">
               </div>
              <div class="col-md-6 col-xs-12 pt-3">
                <input type="text" class="form-control" v-model="model.student_phone" placeholder="Телефон">
              </div>
              <div class="col-md-6 col-xs-12 pt-3">
                <input type="text" class="form-control" v-model="model.student_tg" placeholder="Телеграм">
               </div>
              <div class="col-md-6 col-xs-12 pt-3">
                <input type="text" class="form-control" v-model="model.student_vk" placeholder="ВКонтакте">
              </div>
            </div>
        `
    }
}