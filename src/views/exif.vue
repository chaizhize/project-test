<template>
    <div class="uploadImage">
        <img src="../assets/exif3.jpeg" alt="" srcset="" />
        <el-image style="width: 100px; height: 100px" :src="imgList[0]"></el-image>

        <input @change="fileChange($event)" accept="image/*" type="file" id="upload_file" multiple style="display: none" />
        <div class="add" @click="chooseType">
            <div class="add-image" align="center">
                <div>
                    <div style="font-size: 12px;color: #666;margin-top: -8px;">上传照片</div>
                </div>
            </div>
        </div>
        <ul>
            <li v-for="(img, index) in imgList" :key="index">
                <img style="width:100px;height:100px" :src="img" alt="" srcset="" />
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
import EXIF from 'exif-js';
import lrz from 'lrz';
import ImageExif from '@/utils/ImageExif.js';
export default {
    data() {
        return {
            imgList: []
        };
    },
    mounted() {
        console.log(EXIF);
    },
    methods: {
        chooseType() {
            document.getElementById('upload_file').click();
        },
        fileChange(el) {
            if (!el.target.files[0].size) return;

            this.fileList(el.target);
            el.target.value = '';
        },
        fileList(fileList) {
            let files = fileList.files;
            console.log(files, 'filesfiles');
            for (let i = 0; i < files.length; i++) {
                if (files[i].type != '') {
                    console.log(files[i], 'files[i]');
                    // this.fileAdd(files[i]);

                    lrz(files[i])
                        .then(rst => {
                            //成功时执行
                            this.fileAdd(rst);
                        })
                        .catch(function(error) {
                            //失败时执行
                        })
                        .always(function() {
                            //不管成功或失败，都会执行
                        });
                }
            }
        },
        fileAdd(file) {
            let _this = this;
            console.log(3123123);
            // if (this.limit !== undefined) this.limit--;
            // if (this.limit !== undefined && this.limit < 0) return;
            // this.size = this.size + file.size;
            if (file.origin.type.indexOf('image') == -1) {
                console.log(1);
            } else {
                console.log('44444444');
                return new Promise(resolve => {
                    ImageExif.getOrientation(file.origin).then(orient => {
                        let reader = new FileReader();
                        let img = new Image();
                        console.log(orient, 'ooooooooooooooooooooooooooooo');
                        reader.onload = e => {
                            img.src = file.base64;
                            // img.src = e.target.result
                            img.onload = function() {
                                let width = img.width;
                                let height = img.height;
                                file.width = width;
                                file.height = height;
                                const data = ImageExif.rotateImage(img, img.width, img.height, orient);

                                let newFile = ImageExif.dataURLtoFile(data, file.origin.name);
                                console.log(newFile, 'nnnnnnnnnnnfffffffffff');
                                var formData = new FormData();
                                console.log(file, 'fffffffffffffffffyyyyyyyyyy');
                                // formData.append('file', file.origin);
                                formData.append('file', newFile);
                                console.log(newFile, 'newFilenewFile');
                                axios({
                                    method: 'post',
                                    url: 'https://api.zhugexuetang.com/v1/upload/upload2',
                                    data: formData
                                }).then(res => {
                                    // let imgFile = sessionStorage.getItem('imgFile') ? JSON.parse(sessionStorage.getItem('imgFile')):[]
                                    // imgFile.push(res.data.data.url)
                                    // sessionStorage.setItem('imgFile',JSON.stringify(imgFile))
                                    // _this.$emit('global:imgFile', res.data.data.url);
                                    console.log(res.data.data.url);
                                    var img = res.data.data.url;
                                    _this.imgList.push(img);
                                });
                            };
                        };
                        reader.readAsDataURL(file.origin);
                    });
                });

                // let reader = new FileReader();
                // let image = new Image();
                // let _this = this;
                // reader.readAsDataURL(file);
                // reader.onload = function () {
                //     image.onload = function () {
                //         let width = image.width;
                //         let height = image.height;
                //         file.width = width;
                //         file.height = height;
                //     };
                //     var formData = new FormData();
                //     formData.append('file', file);
                //     _this.$vux.loading.show({
                //         text: '正在上传，请稍等...'
                //     })
                //     axios({
                //         method: "post",
                //         url: "https://api.zhugexuetang.com/v1/upload/upload2",
                //         data: formData,
                //     }).then(res=>{
                //         _this.$vux.toast.text('上传成功！', 'middle')
                //         _this.$vux.loading.hide()
                //         _this.$emit('global:imgFile',res.data.data.url)
                //     })
                // }
            }
        }
        // imageRotate() {
        //         getOrientation: file => {
        //             console.log('111111111111112');

        //             return new Promise(resolve => {
        //                 EXIF.getData(file, function() {
        //                     const orient = EXIF.getTag(this, 'Orientation');
        //                     console.log(orient, '00000000000000');
        //                     resolve(orient);
        //                 });
        //             });
        //         },

        //         dataURLtoFile: (dataurl, filename) => {
        //             const arr = dataurl.split(',');
        //             const mime = arr[0].match(/:(.*?);/)[1];
        //             const bstr = atob(arr[1]);
        //             let n = bstr.length;
        //             let u8arr = new Uint8Array(n);
        //             while (n--) {
        //                 u8arr[n] = bstr.charCodeAt(n);
        //             }
        //             return new File([u8arr], filename, { type: mime });
        //         },

        //         rotateImage: (image, width, height, orient) => {
        //             let canvas = document.createElement('canvas');
        //             let degree = (90 * Math.PI) / 180;
        //             let ctx = canvas.getContext('2d');
        //             if (orient) {
        //                 switch (orient) {
        //                     case 1:
        //                         canvas.width = width;
        //                         canvas.height = height;
        //                         ctx.drawImage(image, 0, 0, width, height);
        //                         break;
        //                     case 6:
        //                         canvas.width = height;
        //                         canvas.height = width;
        //                         ctx.rotate(degree);
        //                         ctx.drawImage(image, 0, -height, width, height);
        //                         break;
        //                     case 8:
        //                         canvas.width = height;
        //                         canvas.height = width;
        //                         ctx.rotate(degree * 3);
        //                         ctx.drawImage(image, -height, 0, height, width);
        //                         break;
        //                     case 3:
        //                         canvas.width = width;
        //                         canvas.height = height;
        //                         ctx.rotate(degree * 2);
        //                         ctx.drawImage(image, -width, -height, width, height);
        //                         break;
        //                     default:
        //                         canvas.width = width;
        //                         canvas.height = height;
        //                         ctx.drawImage(image, 0, 0, width, height);
        //                         break;
        //                 }
        //             } else {
        //                 canvas.width = width;
        //                 canvas.height = height;
        //                 ctx.drawImage(image, 0, 0, width, height);
        //             }
        //             ctx.restore();
        //             return canvas.toDataURL('image/jpeg');
        //         }
        // }
    }
};
</script>
<style lang="scss" scoped>
#qqq {
    width: 200px;
    height: 200px;
    background-image: url('../assets/wx777777777.jpeg');
    background-size: 100% 100%;
}
.uploadImage {
    .add-image {
        width: 70px;
        height: 70px;
        border-radius: 5px;
        border: 1px solid #d5d5d6;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
