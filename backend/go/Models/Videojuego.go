package Models

import (
	"5_go_mysql/Config"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

//GetAllVideojuegos Fetch all videojuego data
func GetAllVideojuegos(videojuego *[]Videojuego) (err error) {
	if err = Config.DB.Find(videojuego).Error; err != nil {
		return err
	}
	return nil
}

//CreateVideojuego ... Insert New data
func CreateVideojuego(videojuego *Videojuego) (err error) {
	fmt.Println("Dentro de create videojuego en models");
	fmt.Println("videojuego:");
	fmt.Println(videojuego);

	
	if err = Config.DB.Create(videojuego).Error; err != nil {
		return err
	}
	return nil
}

//GetVideojuegoByID ... Fetch only one videojuego by Id
func GetVideojuegoByID(videojuego *Videojuego, id string) (err error) {
	if err = Config.DB.Where("id = ?", id).First(videojuego).Error; err != nil {
		return err
	}
	return nil
}

//UpdateVideojuego ... Update videojuego
func UpdateVideojuego(videojuego *Videojuego, id string) (err error) {
	fmt.Println(videojuego)
	Config.DB.Save(videojuego)
	return nil
}

//DeleteVideojuego ... Delete videojuego
func DeleteVideojuego(videojuego *Videojuego, id string) (err error) {
	Config.DB.Where("id = ?", id).Delete(videojuego)
	return nil
}
