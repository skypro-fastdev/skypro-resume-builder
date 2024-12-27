function SenderPage(store) {

    return {
      $template: `

      <div class="row" v-if="model.student_id">
 
        <main class="col-lg-8 col-xs-12 mb-5">
          <div class="card p-4">
             
             <section v-scope="PickResumeStep(store)"></section>
             
             <section class="mt-3" v-scope="PickVacancyStep(store)"> </section>             
 
             <section class="mt-3" v-scope="CoverStep(store)"> </section>   
             
             <section class="mt-3">
                <h4><small>4️⃣</small>&nbsp; Отправьте отклик!</h4>                
                <button class="btn btn-lg btn-dark w-100">Отправить</button>
             </section>
                  
          </div><!-- /card -->
        </main>
    
        <aside class="col-lg-4 col-xs-12">
          <div class="card p-4">
            <p><strong>Вакансии для выбранного резюме</strong></p>
            
            <div class="card mb-3"><div class="card-body">
                <p>Skypro<br/><strong>Аналитик данных Power BI</strong></p>
                <p>🕑 &nbsp; Опыт работы: 3–6 лет &nbsp; <br/>📅 &nbsp; 5/2 Полная занятость <br/> 🏠  &nbsp;Удаленно</p>
            </div></div>
            
            <div class="card mb-3"><div class="card-body">
                <p>Skypro<br/><strong>Аналитик данных Power BI</strong></p>
                <p>🕑 &nbsp; Опыт работы: 3–6 лет &nbsp; <br/>📅 &nbsp; 5/2 Полная занятость <br/> 🏠  &nbsp;Удаленно</p>
            </div></div>            
            
            <div class="card mb-3"><div class="card-body">
                <p>Skypro<br/><strong>Аналитик данных Power BI</strong></p>
                <p>🕑 &nbsp; Опыт работы: 3–6 лет &nbsp; <br/>📅 &nbsp; 5/2 Полная занятость <br/> 🏠  &nbsp;Удаленно</p>
            </div></div>            
            
            <button class="btn btn-outline-dark mb-4" @click="openPage('builder')">Вернуться к созданию резюме</button> 
            
          </div> <!-- /card -->
        </aside>
        
      </div> <!-- /row -->

        `,
    }

}
