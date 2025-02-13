function StatusSection(store) {

    return {

        $template: `
              
          <div v-if="store.sections.bio == 'loading'">      
                <div class="alert alert-info">
                Загружаем информацию из вашей анкеты ...
                </div>                    
          </div>    
          
           <div v-if="store.sections.bio == 'ready' ">
                 
                <div class="alert alert-info clearfix">
                Данные загружены, анкета не подключена к HeadHunter             
                    <input type="text" v-model="model.hh_access_token"  class="form-control float-end w-25" placeholder="hh_access_code">         
                </div>                    
          </div> 
          
        `
    }

}