function StatusSection(store) {

    return {

        $template: `
              
          <div v-if="store.sections.bio == 'loading'">      
                <div class="alert alert-info">
                Загружаем информацию из вашей анкеты ...
                </div>                    
          </div>    
          
           <div v-if="store.sections.bio !='loading' && model.hh_access_token==''">    
                <div class="alert alert-info clearfix">
                Данные загружены, анкета не подключена к HeadHunter             
                    <input type="text" v-model="model.hh_access_token"  class="form-control float-end w-25" placeholder="hh_access_code">         
                </div>                    
           </div>     
                 
           <div v-if="model.hh_access_token">    
                <div class="alert alert-success clearfix">
                Данные загружены, доступ к HeadHunter предоставлен            
                    <input type="text" v-model="model.hh_access_token"  class="form-control float-end w-25" placeholder="hh_access_code">         
                </div>                    
           </div> 
           
           <div v-if="store.sections.bio !='loading' && model.hh_access_token==''"> 
            <div class="alert alert-info text-muted mt-3 clearfix">
             <small>Предоставьте нам доступ к HH и мы сами опубликуем ваше резюме. </small>
             <a class="float-end btn btn-primary" :href="'https://hh.ru/oauth/authorize?response_type=code&client_id='+model.hh_client_id" class="btn btn-dark">🔐 Предоставить доступ</a> 
            
            </div>
          </div>
           
           
           
        `
    }

}