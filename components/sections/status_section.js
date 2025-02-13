function StatusSection(store) {

    return {

        $template: `

          <div class="card" v-if="!model.student_id">
            <section class="list-group-item p-4" v-scope="NoIDWarning(store)"></section>
          </div>
        
          <div class="card" v-if="store.sections.bio=='error'">
            <section class="list-group-item p-4" v-scope="NoDataWarning(store)"></section>
          </div>
              
          <div v-if="store.sections.bio == 'loading'">      
                <div class="alert alert-info">
                Загружаем информацию из вашей анкеты ...
                </div>                    
          </div>    
          
           <div v-if="model.student_id && store.sections.bio !='loading' && model.hh_access_token==''">    
                <div class="alert alert-info clearfix">
                Данные загружены, анкета не подключена к HeadHunter             
                    <input type="text" v-model="model.hh_access_token"  class="form-control float-end w-25" placeholder="hh_access_code">         
                </div>                    
           </div>     
                 
           <div v-if="model.student_id && model.hh_access_token">    
                <div class="alert alert-success clearfix">
                Данные загружены, доступ к HeadHunter предоставлен            
                    <input type="text" v-model="model.hh_access_token"  class="form-control float-end w-25" placeholder="hh_access_code">         
                </div>                    
           </div> 
           
           <div v-if="model.student_id && store.sections.bio !='loading' && model.hh_access_token==''"> 
            <div class="alert alert-info text-muted mt-3 clearfix">
             <small>Предоставьте нам доступ к HH чтобы продолжить </small>
             <a class="float-end btn btn-primary" :href="'https://hh.ru/oauth/authorize?response_type=code&client_id='+model.hh_client_id" class="btn btn-dark">🔐 Предоставить доступ</a> 
            
            </div>
          </div>
           
           
           
        `
    }

}