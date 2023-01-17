import { useState, useCallback } from 'react';

export default function  useSelectImg() {
    const [backgroundFileObject, setBackgroundFileObject] = useState(null);

    const selectImg = useCallback((url) => {
        const fileName = url.split("/")[4];
        const toDataURL = (url) =>
            fetch(url)
                .then((response) => response.blob())
                .then((blob) =>
                    new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    })
                );

        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }

        toDataURL(url)
            .then((dataUrl) => {
                const fileData = dataURLtoFile(dataUrl, fileName);
                setBackgroundFileObject(fileData);
            })
    }, []);

    return { selectImg, backgroundFileObject };
}