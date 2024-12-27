function BuilderPage(store) {

    return {
      $template: `

      <div class="row" v-if="model.student_id">
 
        <main class="col-lg-8 col-xs-12 mb-5">
          <div class="card" >
            <div class="list-group list-group-flush">
                <section class="list-group-item p-4" v-scope="BioSection(store)"></section>
                <section class="list-group-item p-4 pb-1" v-scope="SkillsSection(store)"></section>
                <section class="list-group-item p-4 clearfix" v-scope="LegendSection(store)"></section>
                <section class="list-group-item p-4 pb-1" v-scope="PreviousJobSection(store)"></section>
                <section class="list-group-item p-4 pb-4" v-scope="EducationSection(store)"> </section>
                <section class="list-group-item p-4 pb-4" v-scope="AboutSection(store, app)"></section>
                <section class="list-group-item p-4 pb-4" v-scope="PhotoSection(store)"></section>
                <section class="list-group-item" v-scope="PreviewSection(store)" @vue:mounted="mounted()"></section>
            </div><!-- /list-group -->            
          </div><!-- /card -->
        </main>
    
        <aside class="col-lg-4 col-xs-12">
          <div class="card">
            <div class="list-group list-group-flush p-2">
                <section class="list-group-item" v-scope="ChecklistSection(store)"></section>
                <!-- <section class="list-group-item" v-scope="CoverSection(store)"></section> -->
                <section class="list-group-item" v-scope="PublishSection(store)" @vue:mounted="mounted()"></section>
            </div> <!-- /list-group -->
          </div> <!-- /card -->
        </aside>
        
      </div> <!-- /row -->

        `,
    }
}