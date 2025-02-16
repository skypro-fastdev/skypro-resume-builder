function StatusSection(store) {

    return {

        $template: `

          <div class="alert alert-danger my-3" v-for="error in model.errors "> 
            {{error}}
         </div>

          <div v-if="!model.student_id">
            <section class="p-4" v-scope="NoIDWarning(store)"></section>
          </div>
        
          <div v-if="store.sections.bio=='error'">
            <section class=" p-4" v-scope="NoDataWarning(store)"></section>
          </div>
              
          <div v-if="store.sections.bio == 'loading'">      
                <div class="alert alert-info">
                Загружаем информацию из вашей анкеты ...
                </div>                    
          </div>    
          
           <div v-if="model.student_id && store.sections.bio =='ready' && model.hh_access_token==''">    
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
               
        `
    }

}