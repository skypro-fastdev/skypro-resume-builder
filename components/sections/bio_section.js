function  BioSection(){

    return {
        $template: `
            <h1>{{model.student_full_name}} <small class="text-light">#{{model.student_id}}</small></h1>
            
            <div class="mt-3">
                <small class="text-muted">Название будущего резюме</small>
                <input type="text" class="form-control" v-model="model.profession_pretty">
            </div>
            
            
             <div class="row">
              <div class="col-md-8 col-xs-12 pt-3">
                  
                <small class="text-muted">Город, который вы указываете в качестве домашнего</small>
                <input type="text" class="form-control" v-model="model.student_location">
            
               </div>
              <div class="col-md-4 col-xs-12 pt-3">
                <small class="text-muted">Гендер</small>
                 <select v-model="model.student_gender" class="form-control">
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>
              </div>
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
            
            
            <div v-if="model.student_id && store.sections.bio !='loading' && model.hh_access_token==''"> 
               <div class="alert alert-info mt-3 clearfix">
                 Предоставьте нам доступ к HH чтобы продолжить
                 <a class="float-end btn btn-primary" :href="'https://hh.ru/oauth/authorize?response_type=code&client_id='+model.hh_client_id" class="btn btn-dark">🔐 Предоставить доступ</a> 
               </div>
            </div>
        `
    }
}