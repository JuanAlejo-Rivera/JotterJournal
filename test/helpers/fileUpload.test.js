import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dfwnnd6mi',
    api_key: '844636425466446',
    api_secret: 'XY4shKXYbq_R_bMSMZSGP7G9Xsc',
    secure: true
});

describe('Pruebas en fileUpload', () => {
    test('Debe de subir el archivo correctamente a cloudinary', async () => {
        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7lo8w12bCNwt9FcIHAVBgJAwp6TDBibLo_A&s';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload(file)
        expect(typeof url).toBe('string');

        // console.log(url)
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '')

        const cloudResp = await cloudinary.api.delete_resources([imageId])
        // console.log(cloudResp)

        //Si se requiere ser mas especifico, la direccion se meustra en clg(url)
        // await cloudinary.api.delete_resources(['journal/'+imageId], {
        //     resource_type:'image'
        // });


    });

    test('Debe de retorna null', async () => {

        const file = new File([], 'foto.jpg')

        const url = await fileUpload(file)

        expect(url).toBe(null);

    });

});