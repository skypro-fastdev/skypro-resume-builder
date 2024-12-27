function CoverStep(store) {

    return {
        $template: `
        
        <h4><small>3️⃣️</small>&nbsp; Сгенерируйте сопроводительное письмо</h4>
        <div class="alert alert-info text-muted mt-3">
            <details >
            <summary>Тонкая настройка</summary>
            <textarea v-model="model.legend_prompt"  cols="30" rows="4" class="form-control"></textarea>
            </details>  
        </div>     
        <textarea class="form-control mt-3" cols="30" rows="4" placeholder="">
Здравствуйте!

Меня заинтересовала вакансия аналитика коммерческой деятельности в РИВ ГОШ. Имею более 2 лет опыта в анализе данных и создании BI отчетности. Ловко работаю с Excel и Power BI, программирую на Python. Хорошо понимаю коммерческие показатели и умею представлять результаты. Высшее образование в области телекоммуникаций и опыт в оптимизации процессов являются моими сильными сторонами.
        
Спасибо за внимание,
        
Анастасия
        </textarea>
        
        `,
    }

}