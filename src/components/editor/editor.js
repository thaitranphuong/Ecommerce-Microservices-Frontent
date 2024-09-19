import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './editor.module.scss';

function Editor({ label, content, onChange, name }) {
    const htmlContent = { __html: content };

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append('image', file);
                        fetch(`http://localhost:8080/product/image-fulldescription`, {
                            method: 'POST',
                            headers: {
                                // Authorization: !!getToken() ? 'Bearer ' + getToken() : '',
                            },
                            body: body,
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                resolve({
                                    default: `http://localhost:8080/getimage/ckeditor_images/${res.name}`,
                                });
                                console.log(res);
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });
                });
            },
        };
    }
    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    return (
        <>
            <div className={styles.label}>{label}</div>
            <div className={styles.wrapper} id="app">
                {/* Phần nội dung */}
                <div className={styles.textarea}>
                    <CKEditor
                        config={{
                            extraPlugins: [uploadPlugin],
                        }}
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                            const newContent = editor.getData();
                            onChange({
                                target: {
                                    name: name,
                                    value: newContent,
                                },
                            });
                        }}
                    />
                </div>
                {/* Phần hiển thị */}
                <div className={styles.display}>
                    <div dangerouslySetInnerHTML={htmlContent} />
                </div>
            </div>
        </>
    );
}

export default Editor;
