function StudentWarning(store){

    return {

        $template: `
            
            <div class="text-center m-5">
                <h3>Ой, мы вас не узнали. </h3>
                <p class="lead">Нажмите на кнопку, чтобы зайти под своей учетной записью Skypro</p>
                <a href="https://api.sky.pro/student-cabinet/api/redirect/v1/redirect-with-student-id?link=https%3A%2F%2Fskypro-resume-builder.onrender.com" class="btn btn-lg btn-primary">
                  Перезайти
                </a>
            </div>
            <!-- /.center -->
    
        `,

    }

}