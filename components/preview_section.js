function PreviewSection(store){

    return {

        $template: `
        
            <img :src="model.hh_photo_medium" class="float-end w-25">
            <h3>Готовое резюме</h3>
            <article v-html="model.resume"></article>
            <button class="btn  btn-outline-dark mb-3" @click="reset()">Сбросить и начать с начала</button>
        
        `,

        reset() {

            localStorage.clear();
            document.location.reload()

        }
    }
}