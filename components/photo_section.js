function PhotoSection(){

    return {

        $template: `
        
            <h3>Фото</h3>
            <div class="alert alert-info text-muted mt-3">
              <small>На фото резюме должно быть хорошо видно лицо. Снимок должен быть сдержанным, при этом легким и непринужденным. </small>
            </div>
            <input type="file" class="form-control" > <button class="btn btn-dark mt-3">📷 &nbsp; Загрузить</button>

        `

    }

}