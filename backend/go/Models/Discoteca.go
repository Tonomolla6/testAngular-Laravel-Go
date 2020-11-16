package Models

import (
	"5_go_mysql/Config"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

//GetAllDiscotecas Fetch all discoteca data
func GetAllDiscotecas(discoteca *[]Discoteca) (err error) {
	if err = Config.DB.Find(discoteca).Error; err != nil {
		return err
	}
	return nil
}

//CreateDiscoteca ... Insert New data
func CreateDiscoteca(discoteca *Discoteca) (err error) {
	if err = Config.DB.Create(discoteca).Error; err != nil {
		return err
	}
	return nil
}

//GetDiscotecaByID ... Fetch only one discoteca by Id
func GetDiscotecaByID(discoteca *Discoteca, id string) (err error) {
	if err = Config.DB.Where("id = ?", id).First(discoteca).Error; err != nil {
		return err
	}
	return nil
}

//UpdateDiscoteca ... Update discoteca
func UpdateDiscoteca(discoteca *Discoteca, id string) (err error) {
	fmt.Println(discoteca)
	Config.DB.Save(discoteca)
	return nil
}

//DeleteDiscoteca ... Delete discoteca
func DeleteDiscoteca(discoteca *Discoteca, id string) (err error) {
	Config.DB.Where("id = ?", id).Delete(discoteca)
	return nil
}
