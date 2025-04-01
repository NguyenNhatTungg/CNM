const e = require('express');
const {dynamoDB} = require('../utils/aws.helper'); // import dynamoDB từ utils/dynamoDB.js
const tableName = 'cnm';
const SubjectModel ={

    createSubject: async (subjectData) => {
        const params = {
            TableName: tableName,
            Item: {
                id: subjectData.stt,
                stt: subjectData.stt,
                tenMonHoc: subjectData.tenMonHoc,
                loai:subjectData.loai,
                hocKy: subjectData.hocKy,
                khoa: subjectData.khoa,
                image: subjectData.image,

        }
    };
    try{
        await dynamoDB.put(params).promise();
        return params.Item;
    }catch (err) {
        throw new Error(`Error creating subject: ${err}`);
    }


    },

    getSubject: async () => {
        const params = {
            TableName: tableName,
        };
        try{
            const data = await dynamoDB.scan(params).promise();
            return data.Items;
        }catch (err) {
            throw new Error(`Error getting subject: ${err}`);
        }
    },
    updateSubject: async (stt,subjectData) => {
            const params = {
                TableName: tableName,
                Key: {
                    id: stt,
                },
                UpdateExpression: "set tenMonHoc = :tenMonHoc, loai = :loai, hocKy = :hocKy, khoa = :khoa, image = :image",
                ExpressionAttributeValues: {
    
                    ":tenMonHoc": subjectData.tenMonHoc,
                    ":loai": subjectData.loai,
                    ":hocKy": subjectData.hocKy,
                    ":khoa": subjectData.khoa,
                    ":image": subjectData.image,
                },
                ReturnValues: "ADD_NEW",
            };
        try {
            const updatedSubject = await dynamoDB.update(params).promise();
            return updatedSubject.Attributes;
        }
        catch (err) {
            throw new Error(`Error updating subject: ${err}`);
        }
    },   

    deleteSubject: async (stt,tenMonHoc) => {
        const params = {
            TableName: tableName,
            Key: {
                id: stt,
                tenMonHoc: tenMonHoc,
            },
        };
        try {
            await dynamoDB.delete(params).promise();
            return {id:stt}
        } catch (err) {
            throw new Error(`Error deleting subject111: ${err}`);
        }
    },

    getOneSubject: async (stt) => {
        const params = {
            TableName: tableName,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": stt,
            },
            
        };
        try {
            const result = await dynamoDB.query(params).promise();
            return result.Items.length > 0 ? result.Items[0] : null;
        } catch (err) {
            throw new Error(`Error fetching subject: ${err.message}`);
        }
    },


}

module.exports = SubjectModel;