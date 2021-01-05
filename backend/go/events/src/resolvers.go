package events

import (
	
	"goApp/common"

)
//"fmt"

//Create event
func CreateEvent(data interface{}) error{
	db:=common.GetDB();
	err:=db.Create(data).Error
	return err
}

//Get all Events
func GetAllEvents(data interface{}) error{ //Aqui no está pillando bien el name y la discoteca_id
	db:=common.GetDB();
	err:=db.Find(data).Error

	return err;
}
//GET ONE event by ID
func GetEventById(data, id interface{}) error {
	db := common.GetDB()
	err := db.Where("id = ?", id).First(data).Error
	return err
}

//UPDATE event
func UpdateEvent(data interface{}) error{

	db := common.GetDB()
	err := db.Save(data).Error
	return err
}

//DELETE
func DeleteEvent(data, id interface{}) error {
	db := common.GetDB()
	err := db.Where("id = ?", id).Delete(data).Error
	return err
}