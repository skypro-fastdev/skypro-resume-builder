function PickVacancyStep(store) {

    return {
        $template: `
        
            <h4><small>2️⃣</small>&nbsp; Выберите вакансию</h4>
                
            <div class="input-group mb-3">
                <input type="text" class="form-control" ref="new" placeholder="https://hh.ru/vacancy/112882416"> 
                <button @click="addSkill()" class="btn btn-outline-dark"> Загрузить </button>             
            </div>
            
            <div class="alert alert-info text-muted mt-3">
                 <p><strong>Аналитик данных Power BI (Удаленно)</strong></p>
                 <p>120 000Р &nbsp; &nbsp; РЕСО-Гарантия, САО</p>
                 <p>Опыт работы: 1–3 года <br/> Полная занятость <br/> График: 5/2 <br/> Рабочие часы: 8 и другие варианты </p>
                 <button class="btn btn-sm btn-outline-dark">Показать полностью</button>                     
            </div>
            
            <p>Важно для нанимателя</p>
            <div class="alert alert-info text-muted mt-3">
                <p>
                    <strong>Навыки:</strong> SQL, Power Bi<br/> 
                    <strong>Личные качества:</strong> Проактивность, самоходность<br/> 
                    <strong>Опыт работы:</strong>  2 года в вебкаме</p>
            </div>
        
        
        `,
    }
}