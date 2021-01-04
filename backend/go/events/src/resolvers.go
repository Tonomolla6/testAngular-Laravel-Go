package events

import (
	"fmt"
	"goApp_events/common"

)

//Create event
func CreateEvent(data interface{}) error{
	fmt.Println("CREATEEEEEEEE")
	fmt.Println(data)
	db:=common.GetDB();
	err:=db.Create(data).Error
	return err
}

//Get all Events
func GetAllEvents(data interface{}) error{ //Aqui no está pillando bien el name y la discoteca_id
	fmt.Println("Dentro de getAllEvents");
	db:=common.GetDB();
	fmt.Println("Despues de getDB");
	err:=db.Find(data).Error
	fmt.Println("Despues del find, err:");
	fmt.Println(err);
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
	fmt.Println("RESOLVER UPDATE");
	fmt.Println(data)
	db := common.GetDB()
	err := db.Save(data).Error
	return err
}

// func (model *ArticleModel) Update(data interface{}) error {
// 	db := common.GetDB()
// 	err := db.Model(model).Update(data).Error
// 	return err
// }

//DELETE
func DeleteEvent(data, id interface{}) error {
	db := common.GetDB()
	err := db.Where("id = ?", id).Delete(data).Error
	return err
}