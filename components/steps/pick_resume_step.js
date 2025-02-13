function PickResumeStep(store) {

    return {
        $template: ` 
        
            <h4><small>1️⃣&nbsp; </small> Выберите резюме</h4>
            <div class="input-group mb-3">
                <select class="form-select">
                    <option value="113454333">Аналитик данных, Марк Альшевский [опубликовано]</option>
                </select>
                <button @click="addSkill()" class="btn  btn-outline-dark" > Выбрать </button>           
            </div>
            
            <div class="alert alert-info text-muted mt-3">
                <p><strong>Марк Альшевский</strong></p>
                <p>Excel, SQL, Tableau, Power BI, Обработка A/B тестов, Визуализация данных, Анализ бизнес показателей</p>
                <p>Ищу возможность применения своих аналитических навыков и опыта для решения сложных задач в международной ко...</p>
                <button class="btn btn-sm btn-outline-dark">Показать полностью</button>
            </div>
        
        `,
    }
}