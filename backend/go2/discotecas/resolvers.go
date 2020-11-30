package discotecas

import (
	"fmt"
	"github.com/xema/testAngular-Laravel-Go/backend/go2/common"

)

//Create discoteca
func CreateDiscoteca(data interface{}) error{
	db:=common.GetDB();
	err:=db.Create(data).Error
	return err
}

//Get all Discotecas
func GetAllDiscotecas(data interface{}) error{
	fmt.Println(data);
	db:=common.GetDB();
	err:=db.Find(data).Error
	return err;
}
func DeleteDiscoteca(data, id interface{}) error {
	db := common.GetDB()
	err := db.Where("id = ?", id).Delete(data).Error
	return err
}