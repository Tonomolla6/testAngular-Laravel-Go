package Models

import (
	"5_go_mysql/Config"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

//GetAllEntradas Fetch all entrada data
func GetAllEntradas(entrada *[]Entrada) (err error) {
	if err = Config.DB.Find(entrada).Error; err != nil {
		return err
	}
	return nil
}

//CreateEntrada ... Insert New data
func CreateEntrada(entrada *Entrada) (err error) {
	if err = Config.DB.Create(entrada).Error; err != nil {
		return err
	}
	return nil
}

//GetEntradaByID ... Fetch only one entrada by Id
func GetEntradaByID(entrada *Entrada, id string) (err error) {
	if err = Config.DB.Where("id = ?", id).First(entrada).Error; err != nil {
		return err
	}
	return nil
}

//UpdateEntrada ... Update entrada
func UpdateEntrada(entrada *Entrada, id string) (err error) {
	fmt.Println(entrada)
	Config.DB.Save(entrada)
	return nil
}

//DeleteEntrada ... Delete entrada
func DeleteEntrada(entrada *Entrada, id string) (err error) {
	Config.DB.Where("id = ?", id).Delete(entrada)
	return nil
}
