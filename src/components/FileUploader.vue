<template>
    <div class="file-uploader-wrapper">
        <div class="file-uploader-area" ref="fileform">
            <span v-if="!fullscreen"
                  :class="['file-uploader-drag-here', onDragStyle ? 'file-uploader-drag-on' : '' ]"></span>
            <div v-show="fullscreen && showDropZone" ref="dropZone" id="file-uploader-dropzone"
                 class="file-uploader-dropzone"></div>

            <ul class="file-uploader-list">
                <li class="file-uploader-item" v-for="attach in attachments">
                    <div class="file-uploader-item-wrapper">
                        <button v-on:click="deleteFile(attach)" class="file-uploader-item-del">
                            <v-icon small dark>delete</v-icon>
                        </button>
                        <a class="file-uploader-item-name" :href="attach.path" target="_blank">{{attach.name}}</a>
                        <img v-if="attach.type =='image/jpeg' || attach.type =='image/png' || attach.type =='image/svg'"
                             :src="attach.thumb"/>
                        <img v-else
                             src="data:image/png;base64,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iAAAAgAAACKACAAgAAAAIAKIAAACAAAAIoAIACAAAAAgAogAAAIAAAAiAAACAAAAIgAAAgAAACIAgAAAAAAiAIAAAACACCACAAgAAACIACIAgAAAAIAIIAIACAAAAIgAIgCAAAAAgAhwYgT4sKMBIAAAANB+BLimlHKtowEgAAAA0H4E+KAIACAAAAAgAgAIACYAAEAEABAAAABABAAQAAAAQAQAEAAAABABRAAAAQAAABFABAAQAAAAEAFEAAABAAAAEUAEADhVnV6vZwUgSTIxMXFfkmcP899hamrKgeQJOXToUA4dOmQI+n7NmZ2dNcQpuvvuu7N169bMzc0t5adxXa316qX8BJx/AwIAIAAs0EUcPBHdbjfdbtcQCAAigAAANMsjAAAADIzHAQAEAAAARAARAEAAAABABBABAAQAAABEABEAQAAAAEAEEAEAAQAAAJY4Atx2221Zs2aNCAAgAAAA0LJzzz03t99+uwgAIAAAANC6jRs3igAAAgAAACKACAAgAAAAIAKIAAACAAAAIoAIAAgAAAAgAogAgAAAAAAigAgACAAAACACAAgAAAAgAgAIAAAAIAIACAAAACACAAgAAACIACIAgAAAAIAIIAIACAAAAIgAIgAgAAAAgAggAgACAAAAiAAnRoBPlVI6jgggAAAAQNsR4IoknxEBAAEAAADajwDvEgEAAQAAAEQAAAEAAABEAAABAAAARAAAAQAAAEQAAAEAAAARQAQABAAAABABRABAAAAAABFgwSLAxMREp9PpZFC/AAQAAABEgCWKAO4EAAQAAAAQAQAEAAAAEAEABAAAABABAAQAAAAQAYDRNWYCoCXnn3++EXhCZmdnjQAjHAG2bNmSAwcOLGUESCnl3bXWnqMCLJZOr+c1BjhsYmLiviTPtgTAqZmamhKPGrF3796ljgBJ8rkkCx4BnO8DR3gEAACAkedxAEAAAACAEYoAMzMzWb9+vQgACAAAANCyDRs2ZPfu3SIAIAAAAEDrzjrrLBEAEAAAAEAEEAEAAQAAAEQAEQAQAAAAQAQQAQABAAAARAARABAAAABABBABAAEAAABEAAABAAAARABAAAAAAEQAQAAAAABEAEAAAAAAEUAEAAQAAAAQAUQAQAAAAAARQAQABAAAABABRABAAAAAABHgxAiwo5SywhEBBAAAAGg7Arw9yZdFAEAA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"/>
                    </div>
                </li>
            </ul>
        </div>

        <div v-show="showui" class="file-uploader-panel">
            <input v-if="multiple" ref="fileUploadInput" multiple type="file" name="name" :accept="accept"
                   style="display: none;" v-on:change="handleFilesUpload()"/>
            <input v-if="!multiple" ref="fileUploadInput" type="file" name="name" :accept="accept"
                   style="display: none;" v-on:change="handleFilesUpload()"/>
            <button class="file-uploader-button" @click="$refs.fileUploadInput.click()">Выбрать файл</button>
            <span class="file-uploader-help">или перетащить для загрузки</span>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
    props: {
      attachFiles: Array,
      deleteUrl: '',
      uploadUrl: '',
      onDelete: null,
      onUpload: null,
      onError: null,
      accept: '',
      multiple: true,
      showui: true,
      fullscreen: false
    },
    data() {
      return {
        attachments: [],
        files: [],
        dragAndDrop: false,
        onDragStyle: false,
        showDropZone: false
      }
    },

    mounted() {
      this.attachments = this.attachFiles;
      this.dragAndDrop = this.determineDragAndDrop();

      if (this.dragAndDrop) {
        if (!this.fullscreen) {
          ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {
            this.$refs.fileform.addEventListener(evt, function (e) {
              e.preventDefault();
              e.stopPropagation();
              if (e.type == 'dragover') {
                this.onDragStyle = true;
              } else {
                this.onDragStyle = false;
              }
            }.bind(this), false);
          }.bind(this));

          this.$refs.fileform.addEventListener('drop', this.handleDrop);
        } else {
          window.addEventListener('dragenter', (e) => {
            this.showDropZone = true;
          });

          this.$refs.dropZone.addEventListener('dragenter', this.allowDrag);
          this.$refs.dropZone.addEventListener('dragover', this.allowDrag);

          this.$refs.dropZone.addEventListener('dragleave', function (e) {
            this.showDropZone = false;
          });

          this.$refs.dropZone.addEventListener('drop', this.handleDrop);
        }
      }
    },

    created() {
    },

    methods: {
      allowDrag(e) {
        if (true) {
          e.dataTransfer.dropEffect = 'copy';
          e.preventDefault();
        }
      },

      handleDrop(e) {
        this.showDropZone = false

        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          this.files.push(e.dataTransfer.files[i]);
          this.submitFile(e.dataTransfer.files[i]);
        }

        e.preventDefault();
      },

      selectFiles() {
        this.$refs.fileUploadInput.click()
      },

      getFiles() {
        return this.files
      },

      getAttachments() {
        return this.attachments
      },

      setAttachments(attachments) {
        if (!attachments) {
          this.attachments = [];
          return;
        }

        if (this.multiple) {
          this.attachments = attachments;
        } else {
          this.attachments = [];
          this.attachments.push(attachments);
        }
      },

      getAttachmentsIds() {
        if (!this.multiple) {
          if (this.attachments.length > 0) {
            return this.attachments[0].id;
          } else {
            return false;
          }
        } else {
          var ids = [];
          for (let i = 0; i < this.attachments.length; i++) {
            ids.push(this.attachments[i].id);
          }
        }

        return ids;
      },

      determineDragAndDrop() {
        var div = document.createElement('div');

        return (('draggable' in div)
          || ('ondragstart' in div && 'ondrop' in div))
          && 'FormData' in window
          && 'FileReader' in window;
      },

      handleFilesUpload() {
        if (!this.multiple && this.attachments.length > 0) {
          return;
        }

        let uploadedFiles = this.$refs.fileUploadInput.files;

        for (var i = 0; i < uploadedFiles.length; i++) {
          this.submitFile(uploadedFiles[i]);
        }
      },

      submitFile(file) {
        if (!this.multiple && this.attachments.length > 0) {
          return;
        }

        let formData = new FormData();
        formData.append('file', file);

        axios.post(this.uploadUrl,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function (progressEvent) {
            }.bind(this)
          }
        ).then((result) => {
          if (this.onUpload) this.onUpload(result.data.data);
          this.attachments.push(result.data.data);
        })
          .catch((error) => {
            if (this.onError) this.onError(error);
          });
      },

      deleteFile(attach) {
        axios.delete(this.deleteUrl + '/' + attach.id).then((result) => {
          if (this.onDelete) this.onDelete(attach);
          this.attachments = this.attachments.filter(el => el !== attach);
        })
          .catch(() => {
          });
      }
    },

    computed: {}
  }
</script>

<style>
    .file-uploader-wrapper {
        width: 100%;
        text-indent: 99999px;
        transition: all .5s linear;
        position: relative;
        min-height: 100px;
        padding-bottom: 40px;
    }

    .file-uploader-dropzone {
        box-sizing: border-box;
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 99999;

        background: rgba(137, 143, 155, 0.8);
        border: 11px dashed rgba(137, 143, 155);
    }

    .file-uploader-drag-here {
        padding: 11px;
        width: 100%;
        height: 100%;
        text-align: center;
        display: block;
        font-size: 20px;
        text-indent: 0;
        color: #e4e4e4;
        position: absolute;
        border: 3px solid #ffffff00;
        pointer-events: none;
    }

    .file-uploader-drag-on {
        border: 3px dashed #b7b7b7;
        pointer-events: none;
    }

    .file-uploader-help {
        display: inline-block;
        float: left;
        text-indent: 0px;
        margin-left: 10px;
        font-size: 12px;
        padding-top: 4px;
        color: #989393;
    }

    .file-uploader-panel {
        padding: 10px;
        position: absolute;
        bottom: 0;
    }

    .file-uploader-panel:after {
        display: block;
        clear: both;
        content: ' ';
    }

    .file-uploader-area:after, .file-uploader-list:after {
        display: block;
        clear: both;
        content: ' ';
    }

    .file-uploader-list {
        margin: 0 !important;
        padding: 0 !important;
        list-style: none;
    }

    .file-uploader-item {
        display: inline-block;
        max-width: 220px;
        height: 220px;
        float: left;
        padding: 8px;
        margin: 10px;
        overflow: hidden;
        border-radius: 4px;
        background: #FFF;
        position: relative;
        box-sizing: border-box;
        box-shadow: 0px 5px 10px 0 #d0cbcb;
    }

    .file-uploader-item img {
        width: 100%;
        display: block;
        height: 100%;
        object-fit: cover;
    }

    .file-uploader-item-name:hover {
        text-decoration: underline;
        color: #FFF;
    }

    .file-uploader-item-name {
        position: absolute;
        width: 100%;
        font-size: 10px;
        color: #FFF;
        padding: 5px;
        text-shadow: 0px 0px 7px #000;
        z-index: 9990;
        left: 0;
        bottom: 0;
        text-indent: 0;
    }

    .file-uploader-item-del {
        position: absolute;
        right: 0;
        font-size: 11px;
        background: #f14d4d;
        color: #FFF;
        border: 0;
        padding: 3px;
    }

    .file-uploader-item-wrapper {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #dadada;
    }

    .file-uploader-button:hover {
        color: #000;
    }

    .file-uploader-button {
        display: inline-block;
        float: left;
        background: #eaeaea;
        border: 1px solid #a7a7a7;
        border-radius: 3px;
        font-size: 13px;
        box-shadow: 0px 1px 1px 1px #dedede;
        padding: 3px 11px;
        color: #949494;
    }
</style>