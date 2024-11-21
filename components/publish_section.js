

function PublishSection(store){

    return {

        $template: `
        
         <h4>Публикация на HH</h4>
         
         <div v-if="model.hh_code == ''">
            
            <div class="alert alert-info text-muted mt-3">
            <small>Предоставьте нам доступ к HH и мы сами опубликуем ваше резюме. Обещаем не шалить!</small>
            </div>
            <p><a :href="'https://hh.ru/oauth/authorize?response_type=code&client_id='+model.hh_client_id" class="btn btn-dark">🔐 Предоставить доступ</a></p>
      
        </div>
        
         <div class="alert alert-info text-muted mt-3">{{model.hh_code}}</div>
         
         <button class="btn btn-dark w-100 btn-lg"> Опубликовать на HH</button>

        `

    }

}