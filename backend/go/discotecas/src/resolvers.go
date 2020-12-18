package discotecas

import (
	"fmt"
	"goApp_discotecas/common"

)

//Create discoteca
func CreateDiscoteca(data interface{}) error{
	fmt.Println("CREATEEEEEEEE")
	fmt.Println(data)
	db:=common.GetDB();
	err:=db.Create(data).Error
	return err
}

//Get all Discotecas
func GetAllDiscotecas(data interface{}) error{
	db:=common.GetDB();
	err:=db.Find(data).Error
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

// func (model *ArticleModel) Update(data interface{}) error {
// 	db := common.GetDB()
// 	err := db.Model(model).Update(data).Error
// 	return err
// }

//DELETE
func DeleteDiscoteca(data, id interface{}) error {
	db := common.GetDB()
	err := db.Where("id = ?", id).Delete(data).Error
	return err
}