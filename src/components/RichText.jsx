import React, { useRef, useEffect } from 'react'
import E from 'wangeditor'
import Cloud from 'leancloud-storage'
const getBase64 = (img, callback) => {//将本地图片资源转为base64编码
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
export default function RichText(props) {
    let editRef = useRef()
    // let editor;
    useEffect(() => {
        // console.log('富文本编辑器', props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const editor = new E(editRef.current)
        editor.config.zIndex = 5
        editor.config.onblur = function (newHtml) {
            // console.log('onblur', newHtml) // 获取最新的 html 内容
            props.onChange(newHtml)
        }
        editor.config.customUploadImg = function (resultFiles, insertImgFn) {//自定义图片上传
            // resultFiles 是 input 中选中的文件列表
            // insertImgFn 是获取图片 url 后，插入到编辑器的方法
            console.log(resultFiles);
            getBase64(resultFiles[0], (base64) => {
                const file = new Cloud.File('img.png', { base64 });//构建leancloud文件对象
                file.save().then(res => {//向leancloud提交并保存图片
                    let { url } = res.attributes
                    insertImgFn(url)
                })


            })
            // 上传图片，返回结果，将图片插入到编辑器中

        }

        editor.config.menus = [//自定义富文本菜单
            'head',
            'bold',
            'fontSize',
            'fontName',
            'italic',
            'underline',
            'strikeThrough',
            'indent',
            'lineHeight',
            'foreColor',
            'backColor',
            'link',
            'list',
            'todo',
            'justify',
            'quote',
            'emoticon',
            'image',
            'splitLine',
            'undo',
            'redo',
        ]
        editor.create()
        return () => {
            editor.destroy()//销毁富文本
        }
    }, [])

    return (
        <div ref={editRef}>RichText</div>
    )
}
