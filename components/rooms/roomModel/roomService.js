const room = require("../../../server/model/room")
const bill = require("../../../server/model/bill")

exports.list = (pageNumber, nPerPage, option, roomType) =>{
    let result=room.find({archived:false});
    if(roomType!=0){
        result=room.find({ type: roomType})
    }
    if(option == 1){
        return result.sort({price: 1}).skip(pageNumber > 0 ? (pageNumber -1)*nPerPage : 0).limit(nPerPage);
    }
    if(option == -1){
        return result.sort({price: -1}).skip(pageNumber > 0 ? (pageNumber -1)*nPerPage : 0).limit(nPerPage);
    }
    return result.skip(pageNumber > 0 ? (pageNumber -1)*nPerPage : 0).limit(nPerPage);
}

exports.detail = (roomID) =>{
    if((room.findOne({id: roomID}))==null) throw error;
    return room.findOne({id: roomID});
}

exports.order = (cusEmail, room, datepicker,datepicker1,numAdults,numChilds,ammount) =>{

    return bill.create({ customerEmail: cusEmail, roomName: room.name, checkin: datepicker, checkout: datepicker1, numAdults: numAdults,numChilds: numChilds,totalPrice:ammount, solved: false});
}
