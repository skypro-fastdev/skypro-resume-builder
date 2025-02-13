function NoDataWarning(store) {

    return {
        $template: `
      <div class="row">
        <main class="col-lg-8 col-xs-12 mb-5 mt-5 offset-lg-2 text-center">
            
                <h3>Ой, мы не смогли найти вас в базе </h3>
                <p class="lead">Нажмите на кнопку, чтобы заполнить анкету карьерного центра Skypro</p>
                <a href="https://api.sky.pro/student-cabinet/api/redirect/v1/redirect-with-student-id?link=https%3A%2F%2Fskyeng-school.typeform.com/to/wxMC1uSw" class="btn btn-lg btn-primary">
                  Перезайти
                </a>
            
            <!-- /.card -->
        </main>
      </div> 
      <!-- /row -->
      `,
    }
}