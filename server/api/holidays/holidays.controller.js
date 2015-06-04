'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var config = require('./../../config/environment');
 var HolidaySchema = mongoose.Schema({
    DD:String,
    MM:String,
    YYYY:String
});
var HolidaysModel = mongoose.model('Holidays',HolidaySchema);

// Get list of holidayss
exports.index = function(req, res) {
    console.log(config.mongo.uri);

    var db = mongoose.connection;

    db.on('error', console.error);
    db.once('open', function() {
      HolidaysModel.find(function(err,holidays){
            res.json(holidays);
          mongoose.connection.close();
        })
    });

    mongoose.connect(config.mongo.uri);

};
exports.addHoliday = function(req,res){
    var dd =req.param('dd');
    var mm =req.param('mm');
    var yyyy =req.param('yyyy');
    if(dd.length > 0  && mm.length > 0 && yyyy)
    {
        var db = mongoose.connection;

        db.on('error', function(){
            res.json({isDeleted:false});
             mongoose.connection.close();
        });
        db.once('open', function() {
            var newholiday = new HolidaysModel({DD:dd,MM:mm,YYYY:yyyy});
            newholiday.save(function(err,holidayitem){
                if(err) res.json({isAdded:false});
                res.json({isAdded:true,Holiday:holidayitem});
                mongoose.connection.close();
            });
        });
        mongoose.connect(config.mongo.uri)

    }else{
        res.json({isAdded:false});
    }
};

exports.deleteHoliday = function(req,res){
    var db = mongoose.connection;

    db.on('error', function(){
        res.json({isDeleted:false});
         mongoose.connection.close();
    });
    db.once('open', function() {
        console.log(req.params.holidayid);
      HolidaysModel.findOneAndRemove({_id:req.params.holidayid},function(err,holiday){
        if(err) res.json({isDeleted:false});
        res.json({isDeleted:true});
        mongoose.connection.close();
      });
    });

    mongoose.connect(config.mongo.uri)

};
