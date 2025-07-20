import { useState } from "react";
import { useUploadFilesMutation } from "../toolkit/apis/filesApi";
import usePostData from "./usePostData";

function useHandelQuestions(setLoading) {

    const [uploadedFilesList, setUploadedFilesList] = useState([])
    const [uploadData] = useUploadFilesMutation()
    const [uploadFiles] = usePostData(uploadData, setLoading)

    const saveFiles = async (values) => {
        try {
            let exam = JSON.parse(JSON.stringify(values));
            let images = [];

            //Insert images
            values.questions.forEach((question, i) => {
                if (question.image) {
                    if (question.image instanceof File) {
                        images.push(values.questions[i].image);
                        exam.questions[i].image = images.length - 1;
                    }
                    //May have Object
                } else {
                    delete exam.questions[i].image
                }
            });
            //upload images
            let savedFiles = uploadedFilesList || []
            if (uploadedFilesList.length !== images.length && images.length !== 0) {
                savedFiles = await uploadFiles({ files: [...images] }, true)
                setUploadedFilesList(savedFiles)
            }

            //modify questions with images
            exam.questions.forEach((question) => {
                if (typeof question.image === 'number' || (!isNaN(question.image) && question.image !== '')) {
                    const imageIndex = Number(question.image)
                    question.image = savedFiles[imageIndex];
                }
            });

            return exam
        } catch (error) {
            console.log('error ==>', error)
            setLoading(false)
            return error
        }
    }

    return [saveFiles]
}

export default useHandelQuestions
