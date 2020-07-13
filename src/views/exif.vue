<template>
    <div class="uploadImage">
        <img src="../assets/exif/WechatIMG192.jpeg" alt="" srcset="" />

        <!-- <input @change="fileChange($event)" accept="image/*" type="file" id="upload_file" multiple style="display: none" />
        <div class="add" @click="chooseType">
            <div class="add-image" align="center">
                <div>
                    <div style="font-size: 12px;color: #666;margin-top: -8px;">上传照片</div>
                </div>
            </div>
        </div> -->

        <div style="margin-bottom:20px">
            exif旋转处理后：
            <el-upload
                ref="upload"
                class="upload-demo"
                action="https://api.zhugexuetang.com/v1/upload/upload2"
                :before-upload="file => handleBeforeUpload(file)"
                multiple
                :file-list="fileListImgs"
                list-type="picture-card"
                :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, 'fileListImgs')"
            >
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>

        <div>
            未处理：
            <el-upload
                ref="upload"
                class="upload-demo"
                action="https://api.zhugexuetang.com/v1/upload/upload2"
                :before-upload="file => handleBeforeUpload(file)"
                multiple
                :file-list="fileListImgs2"
                list-type="picture-card"
                :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, 'fileListImgs2')"
            >
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>

        <!-- <ul>
            <li v-for="(img, index) in imgList" :key="index">
                <img style="width:100px;height:100px" :src="img" alt="" srcset="" />
            </li>
        </ul> -->
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
            imgList: [],
            ImageExif,
            fileListImgs: []
        };
    },
    mounted() {},
    methods: {
        //图片上传前回调
        handleBeforeUpload(file, index) {
            var that = this;
            console.log('ooooooo');
            return new Promise(resolve => {
                that.ImageExif.getOrientation(file).then(orient => {
                    console.log('ppppp');
                    let reader = new FileReader();
                    let img = new Image();
                    reader.onload = e => {
                        img.src = e.target.result;
                        img.onload = function() {
                            const data = that.ImageExif.rotateImage(img, img.width, img.height, orient);
                            let newFile = that.ImageExif.dataURLtoFile(data, file.name);
                            // window.URL.createObjectURL(newFile)
                            // that.fileListImgs.push({
                            //     uid: file.uid,
                            //     url: window.URL.createObjectURL(newFile),
                            //     name: file.name,
                            //     loading: true,
                            //     videoUploadPercent: 0
                            // });

                            resolve(newFile);
                        };
                    };
                    reader.readAsDataURL(file);
                });
            });
        },
        //上传成功回调
        handleSuccess(response, file, fileList, index) {
            let pic = 'https://img.zhugexuetang.com/' + response.key;
            console.log(response, '111');
            console.log(file, '222');
            const {
                data: { url = '', name = '' }
            } = response;
            var img = {
                url,
                name
            };

            this[index].push(img);
        }
    }
};
</script>
<style lang="scss" scoped>
#qqq {
    width: 300px;
    height: 300px;
    background-image: url('../assets/wx777777777.jpeg');
    background-size: 100% 100%;

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
img {
    width: 300px;
    height: 300px;
}
</style>
