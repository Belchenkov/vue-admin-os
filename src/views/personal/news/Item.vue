<template>
    <v-container>
        <div class="d-flex">
            <h1 v-if="!this.id" class="flex justify-start">Новая новость</h1>
            <h1 v-if="this.id" class="flex justify-start">Редактировать новость</h1>

            <div class="justify-end">
                <v-btn v-if="!this.id" class="bth-shadow" @click="createItem" depressed color="primary">Создать</v-btn>
                <v-btn v-if="this.id" class="bth-shadow mr-2" @click="deleteItem" outlined depressed color="error">Удалить</v-btn>
                <v-btn class="bth-shadow mx-2" @click="selectFiles" depressed color="primary">
                    Загрузить файл
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
                <v-btn v-if="this.id" class="bth-shadow" @click="saveItem" depressed color="primary">Сохранить</v-btn>
            </div>
        </div>

        <v-row v-if="item != null">
            <v-col class="col-7" no-gutters>
                <v-card>
                    <v-container>
                        <v-text-field
                            v-model="item.title"
                            :counter="255"
                            label="Заголовок новости"
                            :error-messages="errors.title"
                            required
                        ></v-text-field>
                        <ckeditor :error-messages="errors.content" :editor="editor" v-model="item.content" :config="editorConfig"></ckeditor>
                        <v-switch v-model="item.publish" inset :label="'Опубликовать'"></v-switch>
                    </v-container>
                </v-card>
            </v-col>
            <v-col class="col-5" no-gutters>
                <file-uploader
                    ref="fileUploader"
                    :uploadUrl="'files/upload'"
                    :deleteUrl="'files/delete'"
                    :attachFiles="item.images"
                    :onUpload="onUpload"
                    :onDelete="onDelete"
                    :onError="onError"
                    :multiple="true"
                    :showui="false"
                    :fullscreen="true"
                ></file-uploader>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import FileUploader from "@/components/FileUploader";

  export default {
    components: { ClassicEditor, FileUploader },
    props: ['id'],
    data: () => {
      return {
        valid: false,
        loading: true,
        item: {
          title: '',
          content: '',
          publish: 0,
          images: [],
        },
        errors: {
          title: '',
          content: ''
        },
        editor: ClassicEditor,
        editorConfig: {
          toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
          }
        }
      }
    },
    mounted() {
      if (this.id) {
        this.loadItem()
      }
    },
    methods: {
      selectFiles() {
        this.$refs.fileUploader.selectFiles()
      },

      async loadItem() {
        this.loading = true

        let response = await this.$apiNews.getNews(this.id)

        if (response.result) {

          if (response.data) {
              this.item = response.data;
              this.item.publish = +response.data.publish;
          }

          this.$refs.fileUploader.setAttachments(this.item.images)
        } else {
          this.$root.$emit('showSnack', 'Ошибка загрузки новости', 'error')
          this.$router.push({name: 'news'})
        }

        this.loading = false
      },

      async deleteItem() {
        this.$root.$emit('showYesNoDefault', async () => {
          let response = await this.$apiNews.deleteNews(this.id)

          if (response.result) {
            this.$root.$emit('showSnack', 'Новость удалена', 'success')
            this.$router.push({name: 'news'})
          } else {
            this.$root.$emit('showSnack', 'Ошибка удаления новости', 'error')
          }
        })
      },

      async saveItem() {
        this.loading = true

        this.item.publish = this.item.publish ? 1 : 0
        this.item.files = this.$refs.fileUploader.getAttachmentsIds()
        let response = await this.$apiNews.updateNews(this.id, this.item)

        if (response.result) {
          this.$root.$emit('showSnack', 'Сохранено', 'success')
        } else {
          this.$root.$emit('showSnack', 'Ошибка при сохранении', 'error')
          this.errors = response.error
          this.$forceUpdate()
        }

        this.loading = false
      },

      async createItem() {
        this.loading = true

        this.item.publish = this.item.publish ? 1 : 0
        this.item.files = this.$refs.fileUploader.getAttachmentsIds()
        let response = await this.$apiNews.createNews(this.item)

        if (response.result) {
          this.$root.$emit('showSnack', 'Сохранено', 'success')
          this.$router.push({name: 'news'})
        } else {
          this.$root.$emit('showSnack', 'Ошибка при сохранении', 'error')
          this.errors = response.error
          this.$forceUpdate()
        }

        this.loading = false
      },

      async onUpload() {
        this.$root.$emit('showSnack', 'Файл загружен', 'success')
        //this.uploadError = false;
      },

      async onError() {
        this.$root.$emit('showSnack', 'Ошибка при загрузке файла', 'error')
        //this.uploadError = true;
      },

      async onDelete() {
        if (this.item.id) {
          //await this.updateItem()
        }
      },
    }
  }
</script>