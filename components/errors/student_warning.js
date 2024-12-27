function StudentWarning(store){

    return {

        $template: `
            
            <div class="text-center m-5">
                <h3>Ваш id не указан</h3>
                <p>Возможно, вы перешли по неверной ссылке. <br>Попробуйте указать id ученика вручную</p>
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="input-group mb-3">
                            <input type="text" @ref="student_id_input" class="form-control" placeholder="Ваш ID" >
                            <button class="btn btn-dark" @click="" type="button">Продолжить</button>
                        </div>
                    </div>
                </div>
                <p class="mt-3">Если вы не знаете свой id ученика – напишите куратору или <a href="t.me/kushedow" target="_blank">Администратору сервиса</a></p>
            </div>
            <!-- /.center -->
    
        `,

    }

}