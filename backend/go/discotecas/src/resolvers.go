package discotecas

import (
	"fmt"
	"goApp/common"

)

//Create discoteca
func CreateDiscoteca(data interface{}) error{
	db:=common.GetDB();
	err:=db.Create(data).Error
	return err
}

//Get all Discotecas
func GetAllDiscotecas(data interface{}) error{
	db:=common.GetDB();
	err := db.Order("views desc").Find(data).Error
	return err;
}
//GET ONE discoteca by ID
func GetDiscotecaById(data, id interface{}) error {
	db := common.GetDB()
	err := db.Where("id = ?", id).First(data).Error
	return err
}

//UPDATE discoteca
func UpdateDiscoteca(data interface{}) error{
	fmt.Println("RESOLVER UPDATE");
	fmt.Println(data)
	db := common.GetDB()
	err := db.Save(data).Error
	return err
}

//DELETE
func DeleteDiscoteca(data, id interface{}) error {
	db := common.GetDB()
	err := db.Where("id = ?", id).Delete(data).Error
	return err
}

